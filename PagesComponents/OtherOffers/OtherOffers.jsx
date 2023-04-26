import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Cart } from "@styled-icons/ionicons-sharp/Cart";
import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";
import "bootstrap/dist/css/bootstrap.min.css";

// gql
import { useQuery } from "@apollo/client";

import currencyFormat from "../../services/currencyFormat";
import notification from "../../services/notification";
import { GET_OFFERS } from "../../services/Querys";

function OtherOffersComponent({
  ssrData,
  imageUrl,
  api,
  apiUnlogged,
  location,
  setOpenLocationModal,
  locationModal,
  located,
  routeTranslations,
}) {
  const history = useRouter();
  const [loading, setLoading] = useState();

  const [varianteProdutoAtual, setVarianteProdutoAtual] = useState([]);

  const [shipping, setShipping] = useState([]);

  const {
    data: offerData,
    // eslint-disable-next-line no-unused-vars
    error: offerError,
    // eslint-disable-next-line no-unused-vars
    loading: offerLoading,
    refetch: refetchOffer,
  } = useQuery(GET_OFFERS, {
    variables: {
      lat: location.coordinates ? String(location.coordinates[0].lat) : "",
      lng: location.coordinates ? String(location.coordinates[0].lng) : "",
      id: parseInt(ssrData.product.id),
    },
  });

  function quantityCartAnonymous(obj) {
    const chaveObjAtual = Object.keys(obj.loja);

    if (sessionStorage.getItem("cart") !== null) {
      const objArray = JSON.parse(sessionStorage.getItem("cart"));

      // procuramos na array existente todos os lojistas

      const confirmarSeExisteLojista = objArray.find(
        (loja) => Object.keys(loja)[0] === chaveObjAtual[0]
      );

      // existe o lojista?
      if (confirmarSeExisteLojista !== undefined) {
        //existe esse produto no lojista?

        const filtroProduto = confirmarSeExisteLojista[chaveObjAtual[0]].filter(
          (produto, index) =>
            // validamos se o produto existe no lojista
            produto.product === obj.loja[chaveObjAtual[0]][0].product
        );

        if (filtroProduto.length > 0) {
          const newObjArray = {
            atributos: obj.loja[chaveObjAtual][0].atributos,
            product: obj.loja[chaveObjAtual][0].product,
            quantity:
              filtroProduto[0].quantity + obj.loja[chaveObjAtual][0].quantity,
            seller_info: obj.loja[chaveObjAtual][0].seller_info,
            valor: obj.loja[chaveObjAtual][0].valor,
          };

          const removerProduto = objArray.reduce(function (acc, value) {
            if (value[chaveObjAtual[0]]) {
              const verificador = value[chaveObjAtual[0]].filter(
                (filtrado) => filtrado.product === newObjArray.product
              );

              if (verificador.length > 0) {
                const filtroRemover = value[chaveObjAtual[0]].filter(
                  (filtrado) => filtrado.product !== newObjArray.product
                );

                const adicionar = {
                  [chaveObjAtual[0]]: [filtroRemover, newObjArray].flat(),
                };

                acc = [...acc, adicionar];
                return acc;
              } else {
                acc = [...acc, value];
                return acc;
              }
            } else {
              acc = [...acc, value];
              return acc;
            }
          }, []);

          sessionStorage.setItem("cart", JSON.stringify(removerProduto));
        } else {
          // caso não exista o produto no lojista vamos adicionar
          const removerProduto = objArray.reduce(function (acc, value) {
            if (Object.keys(value)[0] === chaveObjAtual[0]) {
              const adicionar = {
                [chaveObjAtual[0]]: [
                  value[chaveObjAtual[0]],
                  obj.loja[chaveObjAtual][0],
                ].flat(),
              };

              acc = [...acc, adicionar];
              return acc;
            } else {
              acc = [...acc, value];
              return acc;
            }
          }, []);
          sessionStorage.setItem("cart", JSON.stringify(removerProduto));
        }
      } else {
        // se não achar adiciona o lojista e o produto
        const novoObjArray = {
          [chaveObjAtual[0]]: [obj.loja[chaveObjAtual][0]],
        };

        let novoObjSession = JSON.parse(sessionStorage.getItem("cart"));
        novoObjSession.push(novoObjArray);

        sessionStorage.setItem("cart", JSON.stringify(novoObjSession));
      }
    } else {
      sessionStorage.setItem(
        "cart",
        JSON.stringify([{ [chaveObjAtual[0]]: [obj.loja[chaveObjAtual][0]] }])
      );
    }
  }

  async function handleCart(e) {
    const dataCart = [
      {
        product: parseInt(e.currentTarget.getAttribute("produto_id")),
        quantity: parseInt(e.currentTarget.getAttribute("qtd")),
        seller_info: {
          seller_id: parseInt(e.currentTarget.getAttribute("seller")),
          offer: parseInt(e.currentTarget.getAttribute("oferta")),
          store: e.currentTarget.getAttribute("loja"),
        },
      },
    ];

    const dataCart2 = [
      {
        loja: {
          [e.currentTarget.getAttribute("loja")]: [
            {
              product: parseInt(e.currentTarget.getAttribute("produto_id")),
              quantity: parseInt(e.currentTarget.getAttribute("qtd")),
              atributos: varianteProdutoAtual,
              valor: parseFloat(e.currentTarget.getAttribute("valor")),
              seller_info: {
                seller_id: parseInt(e.currentTarget.getAttribute("seller")),
                offer: parseInt(e.currentTarget.getAttribute("oferta")),
                store: e.currentTarget.getAttribute("loja"),
              },
            },
          ],
        },
      },
    ];

    const authenticated = await api.get("/customer/authenticated");

    if (authenticated.ssrData.authenticated) {
      try {
        const response = await api.post(
          "/customer/checkout/cart/add",
          dataCart
        );

        history.push("/cart");
      } catch (e) {
        notification(
          "Não foi possivel adicionar o produto desse lojista ao carrinho, tente novamente ou escolha outro lojista",
          "error"
        );
      }
    } else {
      quantityCartAnonymous(dataCart2[0]);
      history.push("/cart");
    }
  }

  async function getShipment(product, cart, location) {
    let carriers = [];
    try {
      await cart.map(async (deliver, index) => {
        const postData = {
          items: [{ product: product.id, offer: deliver.id, quantity: 1 }],
          seller_id: deliver.marketplace_seller_id,
          zipcode:
            location.zipcode !== undefined
              ? location.zipcode
              : location.postcode !== undefined
              ? location.postcode
              : location.postalcode,
        };

        const { data: response } = await apiUnlogged.post(
          "/shipping/calculate",
          postData,
          {
            headers: { Accept: "application/json" },
          }
        );

        carriers.push({
          deliveryOptions: response.map((shipping, index) => {
            return { ...shipping, index };
          }),
          sellerData: deliver,
        });

        if (carriers.length > 0 && carriers.length === cart.length) {
          setShipping(
            carriers.sort(
              (a, b) => a.sellerData.distance - b.sellerData.distance
            )
          );
          setLoading(false);
        }
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    } finally {
    }
  }

  useEffect(() => {
    if (history.isReady) {
      window.scrollTo(0, 0);
      setLoading(true);
      if (offerData) {
        if (!located) {
          setLoading(false);
        } else {
          const mapFiltroAtual = ssrData.product.attributes.filter(
            (atributos) => atributos.configurable === true
          );

          setVarianteProdutoAtual(mapFiltroAtual);

          const ofertasOrdenadas = [...offerData?.offers].sort(
            (a, b) => a.distance - b.distance
          );

          getShipment(ssrData.product, ofertasOrdenadas, location);
        }
      }
    }
  }, [history, location, offerData]);

  return (
    <>
      <S.buscando>
        <Container>
          <Row>
            <Col>
              <h4>Mais Ofertas:</h4>
            </Col>
          </Row>
        </Container>
      </S.buscando>
      <S.ofertas>
        <Container>
          <Row className="rowPrincipal">
            <Col xs={12} md={12} sm={8} className="colPrincipal">
              <Row className="rowImagemDescricao">
                <img
                  alt="RicardoEletro"
                  src={`${imageUrl}/${ssrData.product.images[0].path}`}
                  className="item"
                  width="125"
                />

                <S.product_title>
                  <div> {ssrData.product.name}</div>

                  {varianteProdutoAtual.length > 0 &&
                    varianteProdutoAtual.map((variante, i) => (
                      <div className="variante" key={i}>
                        {variante.value !== null && (
                          <>
                            {variante.attribute[0].admin_name
                              .charAt(0)
                              .toUpperCase() +
                              variante.attribute[0].admin_name.substr(1)}
                            :{" "}
                            {variante.value !== null
                              ? variante.value?.charAt(0)?.toUpperCase() +
                                variante?.value?.substr(1)
                              : "Padrão"}
                          </>
                        )}
                      </div>
                    ))}
                </S.product_title>
              </Row>

              {loading || offerLoading ? (
                <S.ContainerLoading>
                  <img src="/images/loadingIcon.svg" alt="Loading" />
                </S.ContainerLoading>
              ) : (
                <>
                  {located && offerData && shipping.length >= 1 ? (
                    <>
                      <Row className="RowContainerEntrega">
                        <div>Oferta Atual:</div>
                      </Row>
                      <Row className="RowContainer">
                        <Col
                          className="ColContainerLoja"
                          xs={6}
                          sm={6}
                          md={3}
                          lg={3}
                        >
                          Loja
                        </Col>{" "}
                        <Col
                          className="ColContainerLocation"
                          xs={6}
                          sm={2}
                          md={2}
                          lg={2}
                        >
                          <div className="containerSVG">
                            <p>teste</p>
                          </div>
                        </Col>
                        <Col
                          className="ColContainerLoja"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                        >
                          Frete
                        </Col>
                        <Col
                          className="ColContainerDinheiro"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                        >
                          R$
                        </Col>
                        <Col
                          className="ColContainerCart"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={3}
                        >
                          <div className="containerSVG">
                            <Cart />
                          </div>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <S.ContainerNoLocation>
                      <button
                        onClick={() =>
                          setOpenLocationModal(locationModal ? false : true)
                        }
                      >
                        ENCONTRE A LOJA MAIS PRÓXIMA
                      </button>
                    </S.ContainerNoLocation>
                  )}
                  <S.ContainerBoxOferta>
                    {shipping.length > 1 &&
                      shipping.slice(0, 1).map((oferta, index) => (
                        <S.BoxOferta key={index}>
                          <Row className="rowBoxOferta">
                            <Col
                              className="colContainerDados sellerNameMobile seller"
                              xs={12}
                              sm={12}
                              md={3}
                              lg={3}
                            >
                              <a
                                href={`/seller/${oferta.sellerData.marketplace_seller[0].url}`}
                              >
                                {
                                  oferta.sellerData.marketplace_seller[0]
                                    .shop_title
                                }
                              </a>
                            </Col>
                            <Col
                              xs={6}
                              sm={2}
                              md={2}
                              lg={2}
                              className="colContainerDados distanceDesk"
                            >
                              <p>
                                {location.postalcode === undefined ||
                                oferta.sellerData.distance == 0 ? (
                                  <S.alingLoader>
                                    <S.ErrorIcon />
                                  </S.alingLoader>
                                ) : (
                                  oferta.sellerData.distance + " KM de Você"
                                )}
                              </p>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={2}
                              lg={2}
                              className="colContainerDados distanceMobile"
                            >
                              <p>
                                {location.postalcode === undefined ||
                                oferta.sellerData.distance == 0 ? (
                                  <S.alingLoader>
                                    <S.ErrorIcon />
                                  </S.alingLoader>
                                ) : (
                                  oferta.sellerData.distance + " KM de Você"
                                )}
                              </p>
                            </Col>

                            <Col
                              xs={12}
                              sm={12}
                              md={2}
                              lg={2}
                              className="colContainerDados"
                            >
                              <>
                                <span style={{ fontWeight: "bold" }}></span>

                                {location.postalcode === undefined ? (
                                  <S.noShipment>
                                    <S.locationButton
                                      onClick={() =>
                                        setOpenLocationModal(
                                          locationModal ? false : true
                                        )
                                      }
                                    >
                                      ENCONTRE A LOJA MAIS PRÓXIMA, DIGITE SEU
                                      CEP
                                    </S.locationButton>{" "}
                                  </S.noShipment>
                                ) : oferta === undefined ||
                                  oferta.deliveryOptions.length === 0 ? (
                                  <S.noShipment>
                                    {" "}
                                    <p>FRETE INDISPONIVEL</p>
                                  </S.noShipment>
                                ) : oferta.deliveryOptions === [] ? (
                                  <S.noShipment>
                                    <img
                                      src="/images/loadingIcon.svg"
                                      alt="Loading"
                                    />
                                  </S.noShipment>
                                ) : (
                                  <S.shipment>
                                    <div className="shipContainerTitle">
                                      {" "}
                                      Frete
                                    </div>
                                    <div className="mainContainer">
                                      {oferta.deliveryOptions[0] !== {} &&
                                      oferta.deliveryOptions
                                        .sort((a, b) => a.price - b.price)
                                        .filter(
                                          (info) =>
                                            info.code !== "withdraw-in-store"
                                        )
                                        ?.slice(0, 1).length > 0 ? (
                                        oferta.deliveryOptions
                                          .sort((a, b) => a.price - b.price)
                                          .filter(
                                            (info) =>
                                              info.code !== "withdraw-in-store"
                                          )
                                          .slice(0, 1)
                                          .map((shipmentInfo, index) => {
                                            return (
                                              <section key={index}>
                                                <div>
                                                  <p>
                                                    {" "}
                                                    {shipmentInfo.carrier}{" "}
                                                  </p>
                                                  {shipmentInfo.price !== 0 &&
                                                  shipmentInfo.price !==
                                                    null ? (
                                                    <p>
                                                      R$
                                                      {shipmentInfo.price
                                                        .toFixed(2)
                                                        .split(".")
                                                        .join(",")}{" "}
                                                      -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  ) : (
                                                    <p>
                                                      {" "}
                                                      Grátis -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  )}
                                                </div>
                                              </section>
                                            );
                                          })
                                      ) : (
                                        <section key={index}>
                                          <div>
                                            <p> Transportadora </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}

                                      {oferta.deliveryOptions !== {} &&
                                      oferta.deliveryOptions
                                        .sort((a, b) => a.price - b.price)
                                        .filter(
                                          (info) =>
                                            info.code === "withdraw-in-store"
                                        )
                                        ?.slice(0, 1).length > 0 ? (
                                        oferta.deliveryOptions
                                          .sort((a, b) => a.price - b.price)
                                          .filter(
                                            (info) =>
                                              info.code === "withdraw-in-store"
                                          )
                                          .slice(0, 1)
                                          .map((shipmentInfo, index) => {
                                            return (
                                              <section key={index}>
                                                <div>
                                                  <p>
                                                    {" "}
                                                    {shipmentInfo.carrier}{" "}
                                                  </p>

                                                  {shipmentInfo.price !== 0 &&
                                                  shipmentInfo.price !==
                                                    null ? (
                                                    <p>
                                                      R$
                                                      {shipmentInfo.price
                                                        .toFixed(2)
                                                        .split(".")
                                                        .join(",")}{" "}
                                                      -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  ) : (
                                                    <p>
                                                      {" "}
                                                      Grátis -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  )}
                                                </div>
                                              </section>
                                            );
                                          })
                                      ) : (
                                        <section>
                                          <div>
                                            <p> Retirar na Loja </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}
                                    </div>
                                  </S.shipment>
                                )}
                              </>
                            </Col>
                            <Col
                              xs={6}
                              sm={6}
                              md={2}
                              lg={2}
                              className="colContainerDados priceMobile"
                            >
                              <h2>
                                <span style={{ fontWeight: "bold" }}>
                                  <span className="textPriceMobile">
                                    {" "}
                                    Preço:{" "}
                                  </span>
                                  {currencyFormat(oferta.sellerData.price)}
                                </span>
                              </h2>
                            </Col>

                            <Col
                              className="colContainerBt"
                              xs={6}
                              sm={6}
                              md={2}
                              lg={3}
                              onClick={handleCart}
                              qtd={1}
                              oferta={oferta.sellerData.id}
                              loja={
                                oferta.sellerData.marketplace_seller[0]
                                  .shop_title
                              }
                              seller={oferta.sellerData.marketplace_seller_id}
                              produto_id={ssrData.product.id}
                              valor={oferta.sellerData.price}
                            >
                              <S.bt className="positiveButton">
                                Adicionar ao Carrinho
                              </S.bt>
                            </Col>
                          </Row>
                        </S.BoxOferta>
                      ))}
                  </S.ContainerBoxOferta>
                  {located && shipping.length > 1 && (
                    <>
                      <Row className="RowContainerEntrega">
                        <div>Outras Ofertas:</div>
                      </Row>
                      <Row className="RowContainer">
                        <Col
                          className="ColContainerLoja"
                          xs={6}
                          sm={6}
                          md={3}
                          lg={3}
                        >
                          Loja
                        </Col>{" "}
                        <Col
                          className="ColContainerLocation"
                          xs={6}
                          sm={2}
                          md={2}
                          lg={2}
                        >
                          <div className="containerSVG">
                            <p>teste</p>
                          </div>
                        </Col>
                        <Col
                          className="ColContainerLoja"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                        >
                          Frete
                        </Col>
                        <Col
                          className="ColContainerDinheiro"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                        >
                          R$
                        </Col>
                        <Col
                          className="ColContainerCart"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={3}
                        >
                          <div className="containerSVG">
                            <Cart />
                          </div>
                        </Col>
                      </Row>{" "}
                    </>
                  )}
                  <S.ContainerBoxOferta>
                    {shipping.length > 1 &&
                      shipping.slice(1).map((oferta, index) => (
                        <S.BoxOferta key={index}>
                          <Row className="rowBoxOferta">
                            <Col
                              className="colContainerDados sellerNameMobile seller"
                              xs={12}
                              sm={12}
                              md={3}
                              lg={3}
                            >
                              <a
                                href={`/seller/${oferta.sellerData.marketplace_seller[0].url}`}
                              >
                                {
                                  oferta.sellerData.marketplace_seller[0]
                                    .shop_title
                                }
                              </a>
                            </Col>
                            <Col
                              xs={6}
                              sm={2}
                              md={2}
                              lg={2}
                              className="colContainerDados distanceDesk"
                            >
                              <p>
                                {location.postalcode === undefined ||
                                oferta.sellerData.distance == 0 ? (
                                  <S.alingLoader>
                                    <S.ErrorIcon />
                                  </S.alingLoader>
                                ) : (
                                  oferta.sellerData.distance + " KM de Você"
                                )}
                              </p>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={2}
                              lg={2}
                              className="colContainerDados distanceMobile"
                            >
                              <p>
                                {location.postalcode === undefined ||
                                oferta.sellerData.distance == 0 ? (
                                  <S.alingLoader>
                                    <S.ErrorIcon />
                                  </S.alingLoader>
                                ) : (
                                  oferta.sellerData.distance + " KM de Você"
                                )}
                              </p>
                            </Col>

                            <Col
                              xs={12}
                              sm={12}
                              md={2}
                              lg={2}
                              className="colContainerDados"
                            >
                              <>
                                <span style={{ fontWeight: "bold" }}></span>

                                {location.postalcode === undefined ? (
                                  <S.noShipment>
                                    <S.locationButton
                                      onClick={() =>
                                        setOpenLocationModal(
                                          locationModal ? false : true
                                        )
                                      }
                                    >
                                      ENCONTRE A LOJA MAIS PRÓXIMA, DIGITE SEU
                                      CEP
                                    </S.locationButton>{" "}
                                  </S.noShipment>
                                ) : oferta === undefined ||
                                  oferta.deliveryOptions.length === 0 ? (
                                  <S.noShipment>
                                    {" "}
                                    <p>FRETE INDISPONIVEL</p>
                                  </S.noShipment>
                                ) : oferta.deliveryOptions === [] ? (
                                  <S.noShipment>
                                    <img
                                      src="/images/loadingIcon.svg"
                                      alt="Loading"
                                    />
                                  </S.noShipment>
                                ) : (
                                  <S.shipment>
                                    <div className="shipContainerTitle">
                                      {" "}
                                      Frete
                                    </div>
                                    <div className="mainContainer">
                                      {oferta.deliveryOptions[0] !== {} &&
                                      oferta.deliveryOptions
                                        .sort((a, b) => a.price - b.price)
                                        .filter(
                                          (info) =>
                                            info.code !== "withdraw-in-store"
                                        )
                                        ?.slice(0, 1).length > 0 ? (
                                        oferta.deliveryOptions
                                          .sort((a, b) => a.price - b.price)
                                          .filter(
                                            (info) =>
                                              info.code !== "withdraw-in-store"
                                          )
                                          .slice(0, 1)
                                          .map((shipmentInfo, index) => {
                                            return (
                                              <section key={index}>
                                                <div>
                                                  <p>
                                                    {" "}
                                                    {shipmentInfo.carrier}{" "}
                                                  </p>
                                                  {shipmentInfo.price !== 0 &&
                                                  shipmentInfo.price !==
                                                    null ? (
                                                    <p>
                                                      R$
                                                      {shipmentInfo.price
                                                        .toFixed(2)
                                                        .split(".")
                                                        .join(",")}{" "}
                                                      -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  ) : (
                                                    <p>
                                                      {" "}
                                                      Grátis -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  )}
                                                </div>
                                              </section>
                                            );
                                          })
                                      ) : (
                                        <section key={index}>
                                          <div>
                                            <p> Transportadora </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}

                                      {oferta.deliveryOptions !== {} &&
                                      oferta.deliveryOptions
                                        .sort((a, b) => a.price - b.price)
                                        .filter(
                                          (info) =>
                                            info.code === "withdraw-in-store"
                                        )
                                        ?.slice(0, 1).length > 0 ? (
                                        oferta.deliveryOptions
                                          .sort((a, b) => a.price - b.price)
                                          .filter(
                                            (info) =>
                                              info.code === "withdraw-in-store"
                                          )
                                          .slice(0, 1)
                                          .map((shipmentInfo, index) => {
                                            return (
                                              <section key={index}>
                                                <div>
                                                  <p>
                                                    {" "}
                                                    {shipmentInfo.carrier}{" "}
                                                  </p>

                                                  {shipmentInfo.price !== 0 &&
                                                  shipmentInfo.price !==
                                                    null ? (
                                                    <p>
                                                      R$
                                                      {shipmentInfo.price
                                                        .toFixed(2)
                                                        .split(".")
                                                        .join(",")}{" "}
                                                      -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  ) : (
                                                    <p>
                                                      {" "}
                                                      Grátis -{" "}
                                                      {
                                                        shipmentInfo.delivery_time
                                                      }{" "}
                                                      dias
                                                    </p>
                                                  )}
                                                </div>
                                              </section>
                                            );
                                          })
                                      ) : (
                                        <section>
                                          <div>
                                            <p> Retirar na Loja </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}
                                    </div>
                                  </S.shipment>
                                )}
                              </>
                            </Col>
                            <Col
                              xs={6}
                              sm={6}
                              md={2}
                              lg={2}
                              className="colContainerDados priceMobile"
                            >
                              <h2>
                                <span style={{ fontWeight: "bold" }}>
                                  <span className="textPriceMobile">
                                    {" "}
                                    Preço:{" "}
                                  </span>
                                  {currencyFormat(oferta.sellerData.price)}
                                </span>
                              </h2>
                            </Col>

                            <Col
                              className="colContainerBt"
                              xs={6}
                              sm={6}
                              md={2}
                              lg={3}
                              onClick={handleCart}
                              qtd={1}
                              oferta={oferta.sellerData.id}
                              loja={
                                oferta.sellerData.marketplace_seller[0]
                                  .shop_title
                              }
                              seller={oferta.sellerData.marketplace_seller_id}
                              produto_id={ssrData.product.id}
                              valor={oferta.sellerData.price}
                            >
                              <S.bt className="positiveButton">
                                Adicionar ao Carrinho
                              </S.bt>
                            </Col>
                          </Row>
                        </S.BoxOferta>
                      ))}
                  </S.ContainerBoxOferta>
                </>
              )}
            </Col>
          </Row>
        </Container>{" "}
        <S.ButtonVoltar
          className="negativeButton"
          onClick={() => history.back()}
        >
          Voltar
        </S.ButtonVoltar>
      </S.ofertas>{" "}
    </>
  );
}

export default OtherOffersComponent;
