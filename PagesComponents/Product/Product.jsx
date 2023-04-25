import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-toastify/dist/ReactToastify.css";
import * as S from "./style";

import { ToastContainer } from "react-toastify";
import notification from "../../services/notification";

import ImageGallery from "react-image-gallery";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";

import AddedProduct from "../../components/AddedProduct";
import AttributesSelectionModal from "../../components/AttributesSelectionModal";
import { AddProjectModalWishList } from "../../components/AddProjectModalWishList";
import { WishListTermsModal } from "../../components/WishListTermsModal";
import { DeleteProjectModalWishList } from "../../components/DeleteProjectModalWishlist";
import { UpdateProjectModalWishList } from "../../components/UpdateProjectModalWishList";
import ProductDetails from "../../components/ProductDetails";
import AddCart from "../../components/AddCart";
import ProductListApiGql from "../../components/ProductListApiGql";
import ProductLoader from "../../components/Loaders/ProductLoader";

import { BookAdd } from "@styled-icons/boxicons-regular/BookAdd";
import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";
import { Trash } from "@styled-icons/bootstrap/Trash";
import { PencilSquare } from "@styled-icons/bootstrap/PencilSquare";

import useWindowDimensions from "../../services/windowSizeHook";
import currencyFormat from "../../services/currencyFormat";

import {
  GET_OFFERS,
  GET_OFFERS_SELLER,
  GET_PRODUCT_RELATED,
  GET_VARIANTS,
} from "../../services/Querys";
import { ModalProductPortionsList } from "../../components/ModalProductPortionsList";
import ModalProductShareProduct from "../../components/ModalProductShareProduct";

function ProductComponent({
  routeTranslations,
  setCartLength,
  api,
  mktName,
  wishListApi,
  wishListMenuOpened,
  setOpenLocationModal,
  located,
  location,
  openWishList,
  setOpenWishList,
  ssrData,
  imageUrl,
  headerUrl,
  appUrl,
  msLocation,
  msLocationEnv,
}) {
  const history = useRouter();
  const { slug } = history.query;

  const [mapProductFilter, setMapProductFilter] = useState([]);
  const [modalAtivar, setModalAtivar] = useState("inativo");
  const [modalDelete, setModalDelete] = useState("inativo");
  const [modalUpdate, setModalUpdate] = useState("inativo");
  const [modalAtributosRepetidos, setModalAtributosRepetidos] = useState("");
  const { width } = useWindowDimensions();
  const [shipmentLoading, setShipmentLoading] = useState(false);

  const [shipment, setShipment] = useState([]);
  const [portions, setPortions] = useState(false);
  const [modalPortionsActive, setModalPortionsActive] = useState("inactive");
  const [shareModal, setShareModal] = useState("inactive");

  const [quantidade, setQuantidade] = useState(1);

  const [idOfferWishList, setIdOfferWishList] = useState("");

  const [addCart, setAddCart] = useState();

  const [terms, setTerms] = useState({});
  const [modalTerms, setModalTerms] = useState("inativo");
  const [getList, setGetList] = useState({});

  const [loadingAddList, setLoadingAddList] = useState(false);
  const [loading, setLoading] = useState(true);

  const [addProjetoModal, setAddProjetoModal] = useState("inativo");
  const [codeOfList, setCodeOfList] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState(false);
  const [short_description, setShortDescription] = useState(false);

  const [varianteProdutoAtual, setVarianteProdutoAtual] = useState(false);
  const [produtosConfigurable, setProdutosConfigurable] = useState(false);

  const {
    data: varianteData,
    // eslint-disable-next-line no-unused-vars
    error: varianteError,
    // eslint-disable-next-line no-unused-vars
    loading: varianteLoading,
    refetch: refetchVariante,
  } = useQuery(GET_VARIANTS, {
    variables: {
      id: parseInt(ssrData?.id),
    },
  });

  const {
    data: relatedData,
    // eslint-disable-next-line no-unused-vars
    error: relatedError,
    // eslint-disable-next-line no-unused-vars
    loading: relatedLoading,
    refetch: refetchRelated,
  } = useQuery(GET_PRODUCT_RELATED, {
    variables: {
      id: parseInt(ssrData?.product?.id),
    },
  });

  const filterQuery = ssrData.resolvedUrl.includes("/sellerproduct")
    ? GET_OFFERS_SELLER
    : GET_OFFERS;

  const filterVariablesQuery = ssrData.resolvedUrl.includes("/sellerproduct")
    ? {
        lat: location.coordinates ? String(location.coordinates[0].lat) : "",
        lng: location.coordinates ? String(location.coordinates[0].lng) : "",
        id: parseInt(ssrData.product.id),
        sellerId: parseInt(slug[0]),
      }
    : {
        lat: location.coordinates ? String(location.coordinates[0].lat) : "",
        lng: location.coordinates ? String(location.coordinates[0].lng) : "",
        id: parseInt(ssrData.product.id),
      };

  const {
    data: offerData,
    // eslint-disable-next-line no-unused-vars
    error: offerError,
    // eslint-disable-next-line no-unused-vars
    loading: offerLoading,
    refetch: refetchOffer,
  } = useQuery(filterQuery, {
    variables: filterVariablesQuery,
  });

  const [
    maiorQuantidadeParametrosComparador,
    setMaiorQuantidadeParametrosComparador,
  ] = useState(0);

  async function addProductToList() {
    setLoadingAddList(true);

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        wishListApi.defaults.headers.Authorization = token;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);

        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const dataProduct = {
        product_id: Number(ssrData?.product.id),
        offer_id: Number(idOfferWishList),
      };

      const { data: response } = await wishListApi.post(
        `/wish-list/customer/${codeOfList.code}/item/create`,
        dataProduct,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      notification("Produto adicionado à lista com sucesso", "success");
      document.body.style.overflow = "auto";
      setAddProjetoModal("inativo");
      setOpenWishList("inativo");
      setCodeOfList(false);
      setLoadingAddList(false);
    } catch (e) {
      if (e.response?.ssrData?.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setLoadingAddList(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        notification("Erro ao adicionar produto à lista", "error");
        setLoadingAddList(false);
      }
    }
  }

  //settings para o carrossel de atributos
  const settingsProducts = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 1500,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 4,
          slidesToScroll: 4,
          draggable: true,
        },
      },
      {
        breakpoint: 415,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: true,
        },
      },
    ],
  };

  const settingsProducts3 = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 1500,
    autoplay: false,
    variableWidth: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,

          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 415,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 2,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  };

  const settingsProducts2 = {
    dots: false,

    arrows: true,
    speed: 1500,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow:
      ssrData?.lengthRelacionados > 4 ? 4 : ssrData?.lengthRelacionados,
    slidesToScroll: 1,
    draggable: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow:
            ssrData?.lengthRelacionados > 3 ? 3 : ssrData?.lengthRelacionados,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow:
            ssrData?.lengthRelacionados > 2 ? 2 : ssrData?.lengthRelacionados,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow:
            ssrData?.lengthRelacionados > 2 ? 2 : ssrData?.lengthRelacionados,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 485,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 1.6,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 395,
        settings: {
          dots: false,
          infinite: false,
          arrows: true,
          speed: 1500,
          autoplay: false,
          autoplaySpeed: 4000,
          slidesToShow: 1.35,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  };

  const getShipmentData = async () => {
    setShipmentLoading(true);
    if (offerData !== undefined) {
      const postData = {
        product: ssrData?.product?.id,
        seller_id: offerData.offers[0]?.marketplace_seller_id.toString(),
        offer: offerData.offers[0]?.id.toString(),
        zipcode: location?.postalcode,
      };

      try {
        if (location.postalcode && offerData.offers[0]) {
          const { data: response } = await api.post(
            "/shipping/calculate",
            postData,
            { headers: { Accept: "application/json" } }
          );

          setShipment(response);
        }
      } catch (e) {
        setShipment(false);
        console.log(e.message);
      } finally {
        setShipmentLoading(false);
      }
    }
  };

  async function getTerm() {
    const { data: responseTerm } = await wishListApi.get(
      "/wish-list/customer/term",
      {
        headers: {
          Type: "customer",
          "Url-Store": headerUrl,
        },
      }
    );
    setTerms(responseTerm);
  }

  async function getListWishList() {
    try {
      const { data: responseList } = await wishListApi.get(
        "/wish-list/customer/my-list",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      setGetList(responseList);
    } catch {
      notification("Erro ao carregar as listas", "error");
    }
  }

  //Buscamos o produto
  useEffect(() => {
    setLoading(true);
    if (
      ssrData?.product.related === undefined &&
      ssrData?.product.related !== null &&
      ssrData?.product.related?.length > 0
    ) {
      const DadosProdutos = ssrData?.product.related.map((produto, i) => ({
        name: produto.name,
        id: String(produto.id),
        price:
          produto.offers !== undefined &&
          produto.offers !== null &&
          produto.offers.length > 0
            ? produto?.offers[0].price.toFixed(2).toString()
            : "Indisponível",
        position: i + 1,
      }));

      window?.dataLayer?.push({
        event: "impressions",
        userId:
          localStorage.getItem(`${mktName}_userId`) !== undefined &&
          localStorage.getItem(`${mktName}_userId`) !== null
            ? parseInt(localStorage.getItem(`${mktName}_userId`))
            : "Sem Login",
        pageCategory: "product",
        pageTitle: ssrData.resolvedUrl.includes("/sellerproduct")
          ? "seller product"
          : "product",
        ecommerce: {
          currencyCode: "BRL",
          impressions: DadosProdutos,
        },
      });
    }

    if (typeof window !== "undefined" && history.isReady) {
      if (varianteData !== null && varianteData !== undefined) {
        const arrayProdutosConfigurableVerify =
          ssrData?.product.attributes.filter(
            (produto) => produto.configurable === true
          );

        if (arrayProdutosConfigurableVerify.length > 0) {
          const filtros = [
            "General",
            "Description",
            "Meta Description",
            "Shipping",
          ];

          const productVariacao = ssrData?.product?.attribute_group.filter(
            (produtoVariacao) => !filtros.includes(produtoVariacao.name)
          );

          if (productVariacao.length === 0) {
            const attributeInGeneral = ssrData?.product?.attribute_group.filter(
              (filter) => filter.name === "General"
            );

            const searchConfigurableAttributesGeneral =
              attributeInGeneral[0].attributes.filter(
                (attributes) =>
                  attributes.options_exist !== undefined &&
                  attributes.options_exist.length > 0 &&
                  attributes.code !== "stamp1" &&
                  attributes.code !== "stamp2" &&
                  attributes.code !== "stamp3"
              );
            if (searchConfigurableAttributesGeneral.length > 0) {
              setProdutosConfigurable(searchConfigurableAttributesGeneral);
              if (varianteData?.variants.length > 0) {
                const compararGql = varianteData.variants.filter(
                  (variante) => variante.id === ssrData?.product.id
                );

                const mapFiltroAtual = compararGql[0].attributes.filter(
                  (atributos) => atributos.configurable === true
                );
                setVarianteProdutoAtual(mapFiltroAtual);
                const produtosConfigurableFiltered = mapFiltroAtual
                  .map((variation) => {
                    const mapFiltroAtualFilter =
                      searchConfigurableAttributesGeneral.filter(
                        (variationCompare) =>
                          variationCompare.code === variation.attribute[0].code
                      );
                    if (mapFiltroAtualFilter.length > 0) {
                      return mapFiltroAtualFilter[0];
                    } else {
                      return false;
                    }
                  })
                  .filter((result) => result !== false);

                setProdutosConfigurable(produtosConfigurableFiltered);
              }
            } else {
              setProdutosConfigurable([]);
            }
          } else {
            const variacoesArray = productVariacao
              .map((attributeGroup) =>
                attributeGroup.attributes.filter(
                  (attr) => attr.options_exist.length > 0
                )
              )
              .flat();

            //Condicional para estabelecer a conexao do produto com a variante
            if (varianteData !== undefined) {
              if (varianteData.variants.length > 0) {
                const compararGql = varianteData.variants.filter(
                  (variante) => variante.id === ssrData?.product.id
                );

                if (compararGql.length === 0) {
                  refetchProduct();
                  refetchVariante();
                } else {
                  const mapFiltroAtual = compararGql[0].attributes.filter(
                    (atributos) => atributos.configurable === true
                  );
                  setVarianteProdutoAtual(mapFiltroAtual);
                  const produtosConfigurableFiltered = mapFiltroAtual
                    .map((variation) => {
                      const mapFiltroAtualFilter = variacoesArray.filter(
                        (variationCompare) =>
                          variationCompare.code === variation.attribute[0].code
                      );
                      if (mapFiltroAtualFilter.length > 0) {
                        return mapFiltroAtualFilter[0];
                      } else {
                        return false;
                      }
                    })
                    .filter((result) => result !== false);

                  setProdutosConfigurable(produtosConfigurableFiltered);
                }
              }
            }
          }
        }
      }

      const valueShort = ssrData?.product.attributes.find(
        (attr) => attr.attribute[0].code === "short_description"
      );

      if (valueShort && valueShort.text_value) {
        setShortDescription(valueShort.text_value);
      } else {
        setShortDescription(false);
      }

      const valueAdditonal = ssrData?.product.attributes.find(
        (attr) => attr.attribute[0].code === "additional_Information"
      );

      if (valueAdditonal && valueAdditonal.text_value) {
        setAdditionalInformation(valueAdditonal.text_value);
      } else {
        setAdditionalInformation(false);
      }

      if (
        showValueText(ssrData?.product.attributes, "descriptive_video") &&
        ssrData?.images.filter((image) => image.embedUrl !== undefined)
          .length === 0
      ) {
        const url = showValueText(
          ssrData?.product.attributes,
          "descriptive_video"
        );

        const img = imageUrl + "/" + ssrData?.product.images[0].path;
        ssrData?.images.push({
          original: imageUrl + "/" + ssrData?.product.images[0].path,
          thumbnail: "/images/playbutton.png",

          embedUrl: url,
          renderItem: (videoState) => renderVideo(url, img, videoState),
        });
      }

      if (
        localStorage.getItem(mktName) &&
        offerData !== undefined &&
        offerData !== null
      ) {
        getListWishList();
        getTerm();
        getIdOffer(offerData.offers);
      }

      if (offerData !== undefined && offerData !== null) {
        getShipmentData(offerData.offers[0]?.marketplace_seller_id);
        getPortions();
      }
    }
    setLoading(false);
  }, [slug, varianteData, offerData, ssrData]);

  async function getPortions() {
    try {
      const response = await api.post("/getinstallment", {
        value: offerData.offers[0].of_to_view
          ? offerData.offers[0].promotional_price
          : offerData.offers[0].price,
      });

      const filteredPortions = Object.values(response.data).filter(
        (portion) => portion.interest === false
      );

      setPortions({
        filteredPortions,
        portionsTotal: Object.values(response.data),
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setShipment([]);
  }, [located]);

  function getIdOffer(offer) {
    if (offer !== false) {
      if (localStorage.getItem(mktName)) {
        setIdOfferWishList(offer[0]?.id);
      }
    }
  }

  function validarVariante([valorEnviado]) {
    //reduce para limitar produtos do atributo clicado

    const reduceDoClique = varianteData.variants
      .reduce((acc, valor, i) => {
        const redutorGql = valor.attributes
          .map((varianteInterna) => varianteInterna)
          .filter((filtrado) => filtrado.configurable === true)
          .map((filterType) => ({
            code: filterType.attribute[0].code,
            value: filterType.value,
          }));

        const verificarClicado = redutorGql.filter(
          (redutorClicado) => redutorClicado.value === valorEnviado
        );

        if (verificarClicado.length > 0) {
          acc = [...acc, { url: valor.url_key, valor: valor }];
          return acc;
        } else {
          acc = [...acc, false];
          return acc;
        }
      }, [])
      .filter((removerFalse) => removerFalse !== false);

    if (reduceDoClique.length > 1) {
      const mapReduceClique = reduceDoClique.map(
        (valor) => valor.valor.attributes
      );

      //pegando os dados apenas configuraveis do produto filtrado pelo parametro clicado
      const filtragemAtributosAdicionaisConfigurable = mapReduceClique.map(
        (atributoProdutoAtual) => {
          const filterConfigurable = atributoProdutoAtual.filter(
            (filtrado) => filtrado.configurable === true
          );

          return filterConfigurable;
        }
      );

      //valor reduzido dos produtos que vem do gql filtrados pelo clique
      const reduzirParaUmArray =
        filtragemAtributosAdicionaisConfigurable.reduce((acc, valor, i) => {
          const filtroValor = valor.map((valueChave) => valueChave.value);
          acc = [...acc, filtroValor];
          return acc;
        }, []);
      //valor para ser comparado com os parametros que temos selecionados
      const pegarAtributosProdutoAtual = varianteProdutoAtual.map(
        (variante) => variante.value
      );
      //Funcao mostra o comprimento da array da quantidade de parametros iguais
      const comparadorArrays = reduzirParaUmArray.reduce((acc, valor, i) => {
        const comparadorFilter = valor.filter((valorReduzido, ireduzido) => {
          return valor[ireduzido] === pegarAtributosProdutoAtual[ireduzido];
        });
        acc = [...acc, comparadorFilter.length];
        return acc;
      }, []);

      //Funcao para analisar quem tem mais parametros
      const maiorQuantidadeParametros = comparadorArrays.reduce(function (
        acc,
        valor
      ) {
        return acc > valor ? acc : valor;
      });

      setMaiorQuantidadeParametrosComparador(maiorQuantidadeParametros);
      //Funcao que devolve a posicao da array com maior valor

      const posicaoArray = comparadorArrays.reduce((acc, valor, i) => {
        if (valor === maiorQuantidadeParametros) {
          acc = [...acc, i];
          return acc;
        } else {
          return acc;
        }
      }, []);

      if (posicaoArray.length > 1) {
        const redutorDeIds = posicaoArray.reduce((acc, valor, i) => {
          const filtro = reduceDoClique.filter(
            (opcao, index) => index === valor
          );

          if (filtro.length > 0) {
            acc = [...acc, filtro[0]];
            return acc;
          } else {
            acc = [...acc];
            return acc;
          }
        }, []);
        const atributosRepetidos = redutorDeIds[0].valor.attributes.filter(
          (atributo) => atributo.configurable === true
        );
        setModalAtributosRepetidos(atributosRepetidos);
        document.body.style.overflow = "hidden";
        setModalAtivar("ativo");
        setMapProductFilter(redutorDeIds);
      } else {
        if (ssrData.resolvedUrl.includes("/sellerproduct")) {
          history.push(
            `/sellerproduct/${parseInt(slug[0])}/${
              reduceDoClique[posicaoArray[0]].url
            }`,
            undefined,
            {
              shallow: false,
            }
          );
        } else {
          history.push(
            `/product/${reduceDoClique[posicaoArray[0]].url}`,
            undefined,
            {
              shallow: false,
            }
          );
        }
      }
    } else {
      if (ssrData.resolvedUrl.includes("/sellerproduct")) {
        history.push(
          `/sellerproduct/${parseInt(slug[0])}/${reduceDoClique[0].url}`,
          undefined,
          {
            shallow: false,
          }
        );
      } else {
        history.push(`/product/${reduceDoClique[0].url}`, undefined, {
          shallow: false,
        });
      }
    }
  }

  function showValue(produto, atributo, manual = false) {
    const value = produto?.find((attr) => attr.attribute[0].code === atributo);

    if (!manual && atributo === "installation_manual") {
      return false;
    }

    if (value) {
      return value.text_value ? value.text_value : value.value;
    } else {
      return false;
    }
  }

  function showValueStamp(produto, atributo, manual = false) {
    const value = produto?.find((attr) => attr.attribute[0].code === atributo);

    if (value) {
      return (
        value.value && {
          value: value.value,
          color: value.attribute[0].options.filter(
            (filt) => filt.admin_name === value.value
          )[0].swatch_value,
        }
      );
    } else {
      return false;
    }
  }

  function showValueText(produto, atributo, manual = false) {
    const value = produto?.find((attr) => attr.attribute[0].code === atributo);

    if (!manual && atributo === "installation_manual") {
      return false;
    }

    if (value && value.text_value) {
      return value.text_value;
    } else {
      return false;
    }
  }

  function showCaracteristicas(produto, atributo, manual = false) {
    const value = produto?.find((attr) => attr.attribute[0].code === atributo);
    if (value && value.text_value) {
      return value.text_value.split(",");
    } else {
      return false;
    }
  }

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
        quantity: quantidade,
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
              quantity: quantidade,
              product_url: ssrData.resolvedUrl.includes("/sellerproduct")
                ? slug[1]
                : slug[0],
              atributos: varianteProdutoAtual,
              valor: parseFloat(e.currentTarget.getAttribute("valor")),
              seller_info: {
                seller_id: parseInt(e.currentTarget.getAttribute("seller")),
                offer: parseInt(e.currentTarget.getAttribute("oferta")),
                store: e.currentTarget.getAttribute("loja"),
                store_url: offerData.offers[0].marketplace_seller[0].url,
              },
            },
          ],
        },
      },
    ];

    const productDataLayer = {
      quantity: quantidade,
      name: ssrData?.product.name,
      id: e.currentTarget.getAttribute("produto_id"),
      price: String(e.currentTarget.getAttribute("valor")),
      brand: showValueText(ssrData?.product.attributes, "brand"),
      variant: offerData.offers[0].sku_vendor,
    };

    window?.dataLayer?.push({
      event: "addToCart",
      ecommerce: {
        currencyCode: "BRL",
        add: {
          products: [productDataLayer],
        },
      },
    });

    if (!localStorage.getItem(mktName)) {
      quantityCartAnonymous(dataCart2[0]);

      setAddCart({
        img: ssrData?.images[0].original,
        qtd: quantidade,
        title: ssrData?.product.name,
        atributos: varianteProdutoAtual,
        destino: "/tcart",
      });

      let countItensCart = sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [];

      let count = 0;
      let valorTotal = 0;
      // eslint-disable-next-line array-callback-return
      countItensCart.map((item) => {
        // eslint-disable-next-line array-callback-return
        Object.values(item).map((p, i) => {
          // eslint-disable-next-line array-callback-return
          p.map((pq, iq) => {
            count = count + pq.quantity;
            valorTotal = valorTotal + pq.valor * pq.quantity;
          });
        });
      });

      setCartLength(count);

      return true;
    } else {
      try {
        const response = await api.post(
          "/customer/checkout/cart/add",
          dataCart
        );

        if (
          response?.ssrData?.message === "Products added to cart successfully."
        ) {
          setAddCart({
            img: ssrData?.images[0].original,
            qtd: quantidade,
            title: ssrData?.product.name,
            atributos: varianteProdutoAtual,
            destino: "/cart",
          });

          if (localStorage.getItem(mktName)) {
            const { data: responseCustomer } = await api.get(
              "/customer/checkout/cart"
            );
            if (responseCustomer.data !== null) {
              setCartLength(responseCustomer.ssrData?.items_qty);
            }
          }
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const renderVideo = (url) =>
    url && <iframe width="100%" height="100%" src={url} frameBorder="0" />;

  function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
  }

  return (
    <>
      {loading ? (
        <S.ContainerLoading>
          <img src="/images/loadingIcon.svg" alt="loading" />
        </S.ContainerLoading>
      ) : (
        <>
          {shareModal === "active" && (
            <ModalProductShareProduct
              shareModal={shareModal}
              setShareModal={setShareModal}
              slug={
                ssrData.resolvedUrl.includes("/sellerproduct") ? slug[1] : slug
              }
              page={
                ssrData.resolvedUrl.includes("/sellerproduct")
                  ? `sellerproduct/${slug[0]}`
                  : "product"
              }
              appUrl={appUrl}
              mktName={mktName}
            />
          )}
          {modalPortionsActive &&
            portions !== false &&
            portions.portionsTotal.length > 0 && (
              <ModalProductPortionsList
                setModalPortionsActive={setModalPortionsActive}
                modalPortionsActive={modalPortionsActive}
                portions={portions}
              />
            )}
          {mapProductFilter.length > 0 && (
            <S.ModalAtributos className={modalAtivar}>
              <S.Transparente />
              <S.centroAlertaAtributos>
                <div className="atributoTitle">
                  Selecione um dos produtos disponíveis
                </div>
                <div className="atributos">
                  {maiorQuantidadeParametrosComparador > 0 && (
                    <>
                      {modalAtributosRepetidos.map(
                        (atributo, index) =>
                          atributo.value !== null && (
                            <div key={index}>
                              {atributo.attribute[0].admin_name
                                .charAt(0)
                                .toUpperCase() +
                                atributo.attribute[0].admin_name.substr(1)}
                              :
                              {atributo.value.charAt(0).toUpperCase() +
                                atributo.value.substr(1)}
                            </div>
                          )
                      )}
                    </>
                  )}
                </div>
                <div
                  className="caixaProduto"
                  onClick={() => {
                    document.body.style.overflow = "auto";
                    setModalAtivar("inativo");
                  }}
                >
                  {mapProductFilter.map((produto, index) => (
                    <AttributesSelectionModal
                      key={index}
                      page={
                        ssrData.resolvedUrl.includes("/sellerproduct")
                          ? "sellerProduct"
                          : "product"
                      }
                      sellerId={
                        ssrData.resolvedUrl.includes("/sellerproduct")
                          ? slug[0] !== undefined && parseInt(slug[0])
                          : undefined
                      }
                      produto={produto}
                      imageUrl={imageUrl}
                    />
                  ))}
                </div>
              </S.centroAlertaAtributos>
            </S.ModalAtributos>
          )}
          {!wishListMenuOpened &&
            openWishList &&
            addProjetoModal !== "ativo" &&
            modalTerms !== "ativo" &&
            modalDelete !== "ativo" &&
            modalUpdate !== "ativo" && (
              <S.ModalWishList className={openWishList}>
                <S.Transparente
                  onClick={() => {
                    document.body.style.overflow = "auto";
                    setOpenWishList("inativo");
                    setCodeOfList(false);
                  }}
                />

                <S.centroAlertaWishList>
                  <div className="modalTitle">
                    <span className="title">Adicionar produto à lista</span>
                    <S.closeButton
                      onClick={() => {
                        document.body.style.overflow = "auto";
                        setOpenWishList("inativo");
                        setCodeOfList(false);
                      }}
                    >
                      x
                    </S.closeButton>
                  </div>
                  <div className="caixaLista">
                    <div
                      className="adicionarProjeto"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setAddProjetoModal("ativo");
                      }}
                    >
                      <div className="containerImage">
                        <BookAdd />
                      </div>
                      <div className="containerDados">
                        <div className="titleCard">
                          Adicionar uma lista nova
                        </div>
                        <div className="subtitle">
                          Clique aqui para adicionar uma lista novinha
                        </div>
                      </div>
                    </div>

                    {getList.data !== undefined &&
                      getList.ssrData?.map((list) => (
                        <div
                          key={list.code}
                          className={
                            codeOfList.code === list.code
                              ? "adicionarProjeto selecionado"
                              : "adicionarProjeto"
                          }
                          onClick={() => setCodeOfList(list)}
                        >
                          <div className="containerImage">
                            {list.cover !== null ? (
                              <img
                                className="imageList"
                                src={list.cover}
                                alt={list.name}
                              />
                            ) : (
                              <BookHeart />
                            )}
                          </div>
                          <div className="containerDados">
                            <div className="titleCard">{list.name}</div>
                            <div className="subtitle">
                              {list.type === "private"
                                ? "Particular"
                                : " Pública"}
                            </div>
                            <div className="subtitle">{list.description}</div>
                          </div>
                          <div className="containerEdicao">
                            <div
                              className="containerUpdate"
                              onClick={() => {
                                document.body.style.overflow = "hidden";
                                setCodeOfList(list);
                                setModalUpdate("ativo");
                              }}
                            >
                              <PencilSquare />
                            </div>
                            <div
                              className="containerDeletar"
                              onClick={() => {
                                document.body.style.overflow = "hidden";
                                setCodeOfList(list);
                                setModalDelete("ativo");
                              }}
                            >
                              <Trash />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="modalFooter">
                    <button
                      onClick={() => {
                        document.body.style.overflow = "auto";
                        setOpenWishList("inativo");
                        setCodeOfList(false);
                      }}
                      className="cancelar negativeButton"
                    >
                      CANCELAR
                    </button>

                    {loadingAddList ? (
                      <img
                        className="loading"
                        src="/images/loadingIcon.svg"
                        alt="Carregando"
                      />
                    ) : (
                      <button
                        onClick={
                          codeOfList !== false
                            ? () => addProductToList()
                            : () =>
                                notification(
                                  "Selecione uma lista para adicionar o produto",
                                  "error"
                                )
                        }
                        className={
                          codeOfList !== false
                            ? "adicionar positiveButton"
                            : "adicionarBloqueado positiveButton"
                        }
                      >
                        ADICIONAR
                      </button>
                    )}
                  </div>
                </S.centroAlertaWishList>
              </S.ModalWishList>
            )}

          {!wishListMenuOpened &&
            modalUpdate === "ativo" &&
            modalTerms !== "ativo" && (
              <UpdateProjectModalWishList
                getListWishList={getListWishList}
                setModalUpdate={setModalUpdate}
                modalUpdate={modalUpdate}
                terms={terms}
                setModalTerms={setModalTerms}
                codeOfList={codeOfList}
                api={api}
                wishListApi={wishListApi}
                setCartLength={setCartLength}
                msLocation={msLocation}
                msLocationEnv={msLocationEnv}
                headerUrl={headerUrl}
              />
            )}

          {!wishListMenuOpened && modalDelete === "ativo" && (
            <DeleteProjectModalWishList
              codeOfList={codeOfList}
              setModalDelete={setModalDelete}
              modalDelete={modalDelete}
              getListWishList={getListWishList}
              mktName={mktName}
              headerUrl={headerUrl}
              wishListApi={wishListApi}
            />
          )}
          {!wishListMenuOpened && modalTerms === "ativo" && (
            <WishListTermsModal
              modalTerms={modalTerms}
              setModalTerms={setModalTerms}
              terms={terms}
            />
          )}

          {!wishListMenuOpened &&
            addProjetoModal !== "inativo" &&
            modalTerms !== "ativo" && (
              <AddProjectModalWishList
                getListWishList={getListWishList}
                addProjetoModal={addProjetoModal}
                setAddProjetoModal={setAddProjetoModal}
                terms={terms}
                modalTerms={modalTerms}
                setModalTerms={setModalTerms}
                mktName={mktName}
                headerUrl={headerUrl}
                setCartLength={setCartLength}
                api={api}
                msLocation={msLocation}
                wishListApi={wishListApi}
              />
            )}
          <S.GeneralContainer>
            {ssrData === undefined || ssrData.product === undefined ? (
              <Row>
                <Col>
                  <ProductLoader />
                </Col>
              </Row>
            ) : (
              <>
                <S.produtoInfo
                  className={ssrData?.location === "null" && "naoLocalizado"}
                >
                  <Container>
                    <Row>
                      <Col xs={12} lg={6}>
                        <S.banner>
                          {ssrData?.images.length > 0 && (
                            <ImageGallery
                              items={ssrData?.images}
                              thumbnailPosition="bottom"
                              showPlayButton={false}
                            />
                          )}
                        </S.banner>
                      </Col>
                      <Col xs={12} lg={6}>
                        <S.titulo>
                          <S.Flex>
                            <div className="dataProduct">
                              <h1 className="productName">
                                {ssrData?.product.name}
                              </h1>
                              <p>
                                Marca:{" "}
                                <span>
                                  {" "}
                                  {showValueText(
                                    ssrData?.product.attributes,
                                    "brand"
                                  )}{" "}
                                </span>
                              </p>
                              {showValue(
                                ssrData?.product.attributes,
                                "stamp1"
                              ) && (
                                <div
                                  className="stamp1"
                                  style={{
                                    color:
                                      showValueStamp(
                                        ssrData?.product.attributes,
                                        "stamp1"
                                      ).color !== ""
                                        ? invertColor(
                                            showValueStamp(
                                              ssrData?.product.attributes,
                                              "stamp1"
                                            ).color,
                                            true
                                          )
                                        : invertColor("#690000", true),
                                    backgroundColor:
                                      showValueStamp(
                                        ssrData?.product.attributes,
                                        "stamp1"
                                      ).color !== ""
                                        ? showValueStamp(
                                            ssrData?.product.attributes,
                                            "stamp1"
                                          ).color
                                        : "#690000",
                                  }}
                                >
                                  {showValue(
                                    ssrData?.product.attributes,
                                    "stamp1"
                                  )}
                                </div>
                              )}
                              <S.titulo>
                                <S.Flex>
                                  {offerLoading ? (
                                    <S.ContainerLoading>
                                      <img
                                        src="/images/loadingIcon.svg"
                                        alt="loading"
                                      />
                                      <div className="loading">
                                        Carregando variações
                                      </div>
                                    </S.ContainerLoading>
                                  ) : offerData && offerData.offers[0] ? (
                                    <S.ContainerPrice>
                                      <div className="beforePrice">
                                        {offerData.offers[0].of_to_view &&
                                          `
                                        ${currencyFormat(
                                          offerData.offers[0].price
                                        )}`}
                                      </div>
                                      <div className="containerAfterPrice">
                                        <h2 className="price">
                                          {offerData.offers[0].of_to_view
                                            ? currencyFormat(
                                                offerData.offers[0]
                                                  .promotional_price
                                              )
                                            : currencyFormat(
                                                offerData.offers[0].price
                                              )}
                                        </h2>
                                        {offerData.offers[0].of_to_view && (
                                          <div className="percentagePrice">
                                            -{" "}
                                            {
                                              offerData.offers[0]
                                                .promotional_percentage
                                            }{" "}
                                            %
                                          </div>
                                        )}
                                      </div>
                                      {portions !== false &&
                                        portions.portionsTotal.length > 0 && (
                                          <div className="containerPortions">
                                            <div className="portions">
                                              <span>
                                                {portions.filteredPortions
                                                  .length > 0 ? (
                                                  <span className="green">
                                                    Em até{" "}
                                                    {
                                                      portions.filteredPortions
                                                        .length
                                                    }
                                                    x{" "}
                                                  </span>
                                                ) : (
                                                  <span>
                                                    Em até{" "}
                                                    {
                                                      portions.portionsTotal
                                                        .length
                                                    }
                                                    x{" "}
                                                  </span>
                                                )}

                                                {portions.filteredPortions
                                                  .length > 0 ? (
                                                  <span className="green">
                                                    {currencyFormat(
                                                      portions.filteredPortions.at(
                                                        -1
                                                      ).value
                                                    )}{" "}
                                                    sem juros
                                                  </span>
                                                ) : (
                                                  <span>
                                                    {currencyFormat(
                                                      portions.portionsTotal.at(
                                                        -1
                                                      ).value
                                                    )}{" "}
                                                    com juros
                                                  </span>
                                                )}
                                              </span>
                                            </div>
                                            <div className="modalPortions">
                                              <span
                                                onClick={() =>
                                                  setModalPortionsActive(
                                                    "active"
                                                  )
                                                }
                                              >
                                                Ver Parcelas
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                    </S.ContainerPrice>
                                  ) : (
                                    <div className="noShip">
                                      Produto indisponível
                                    </div>
                                  )}

                                  {offerData && offerData.offers[0] && (
                                    <AddCart
                                      qtd={quantidade}
                                      mktName={mktName}
                                      setQtd={setQuantidade}
                                      oferta={offerData.offers[0].id}
                                      loja={
                                        offerData.offers[0]
                                          .marketplace_seller[0].shop_title
                                      }
                                      seller={
                                        offerData.offers[0]
                                          .marketplace_seller_id
                                      }
                                      valor={
                                        offerData.offers[0].of_to_view
                                          ? offerData.offers[0]
                                              .promotional_price
                                          : offerData.offers[0].price
                                      }
                                      produto_id={ssrData?.product.id}
                                      onClick={handleCart}
                                      productAttr={ssrData?.product.attributes}
                                      showValueText={showValueText}
                                      location={ssrData?.location}
                                      setShareModal={setShareModal}
                                      setOpenWishList={setOpenWishList}
                                    />
                                  )}
                                </S.Flex>
                              </S.titulo>
                              <S.ContainerStamps>
                                {showValue(
                                  ssrData?.product.attributes,
                                  "stamp2"
                                ) && (
                                  <S.Stamp2
                                    style={{
                                      color:
                                        showValueStamp(
                                          ssrData?.product.attributes,
                                          "stamp2"
                                        ).color !== ""
                                          ? invertColor(
                                              showValueStamp(
                                                ssrData?.product.attributes,
                                                "stamp2"
                                              ).color,
                                              true
                                            )
                                          : invertColor("#690000", true),
                                      background:
                                        showValueStamp(
                                          ssrData?.product.attributes,
                                          "stamp2"
                                        ).color !== ""
                                          ? showValueStamp(
                                              ssrData?.product.attributes,
                                              "stamp2"
                                            ).color
                                          : "#690000",
                                    }}
                                  >
                                    {showValue(
                                      ssrData?.product.attributes,
                                      "stamp2"
                                    )}
                                  </S.Stamp2>
                                )}
                                {showValue(
                                  ssrData?.product.attributes,
                                  "stamp3"
                                ) && (
                                  <S.Stamp3
                                    style={{
                                      color:
                                        showValueStamp(
                                          ssrData?.product.attributes,
                                          "stamp3"
                                        ).color !== ""
                                          ? invertColor(
                                              showValueStamp(
                                                ssrData?.product.attributes,
                                                "stamp3"
                                              ).color,
                                              true
                                            )
                                          : invertColor("#690000", true),
                                      background:
                                        showValueStamp(
                                          ssrData?.product.attributes,
                                          "stamp3"
                                        ).color !== ""
                                          ? showValueStamp(
                                              ssrData?.product.attributes,
                                              "stamp3"
                                            ).color
                                          : "#690000",
                                    }}
                                  >
                                    {showValue(
                                      ssrData?.product.attributes,
                                      "stamp3"
                                    )}
                                  </S.Stamp3>
                                )}
                              </S.ContainerStamps>

                              {!shipmentLoading && !offerLoading ? (
                                shipment[0] &&
                                shipment[0].delivery_time &&
                                shipment !== false ? (
                                  <S.shipment>
                                    <div className="mainContainer">
                                      {shipment
                                        .filter(
                                          (carrier) =>
                                            carrier.code !== "withdraw-in-store"
                                        )
                                        .sort((a, b) => a.price - b.price)
                                        .slice(0, 1).length > 0 ? (
                                        <>
                                          {shipment
                                            .filter(
                                              (carrier) =>
                                                carrier.code !==
                                                "withdraw-in-store"
                                            )
                                            .sort((a, b) => a.price - b.price)
                                            .slice(0, 1)
                                            .map((shipmentInfo, index) => {
                                              return (
                                                <section key={index}>
                                                  <>
                                                    {" "}
                                                    <S.TruckIcon />
                                                  </>
                                                  <div>
                                                    <p>
                                                      {" "}
                                                      {
                                                        shipmentInfo.carrier
                                                      }{" "}
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
                                                        Entrega Grátis -{" "}
                                                        {
                                                          shipmentInfo.delivery_time
                                                        }{" "}
                                                        dias
                                                      </p>
                                                    )}
                                                  </div>
                                                </section>
                                              );
                                            })}
                                        </>
                                      ) : (
                                        <section className="noShipment">
                                          <>
                                            <S.TruckIcon />
                                          </>
                                          <div>
                                            <p> Retirar na loja </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}

                                      {shipment.filter(
                                        (carrier) =>
                                          carrier.code === "withdraw-in-store"
                                      ).length > 0 ? (
                                        <>
                                          {shipment
                                            .filter(
                                              (carrier) =>
                                                carrier.code ===
                                                "withdraw-in-store"
                                            )
                                            .map((shipmentInfo, index) => {
                                              return (
                                                <section key={index}>
                                                  <>
                                                    <S.StoreIcon />
                                                  </>
                                                  <div>
                                                    <p>
                                                      {" "}
                                                      {
                                                        shipmentInfo.carrier
                                                      }{" "}
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
                                            })}
                                        </>
                                      ) : (
                                        <section className="noShipment">
                                          <>
                                            <S.StoreIcon />
                                          </>
                                          <div>
                                            <p> Retirar na loja </p>
                                            <p>Opção Indisponivel</p>
                                          </div>
                                        </section>
                                      )}
                                    </div>

                                    <div className="otherShipment">
                                      <button
                                        onClick={() =>
                                          setOpenLocationModal(true)
                                        }
                                      >
                                        Calcular outro CEP{" "}
                                      </button>
                                    </div>
                                  </S.shipment>
                                ) : located ? (
                                  <S.shipment className="noShipment">
                                    <div className="noShipmentOption">
                                      <S.warningIcon />
                                      <span>
                                        Desculpa, esse lojista não faz entregas
                                        nesse endereço.
                                        <button
                                          onClick={() =>
                                            setOpenLocationModal(true)
                                          }
                                        >
                                          Alterar Localização.
                                        </button>
                                      </span>
                                    </div>
                                  </S.shipment>
                                ) : (
                                  <S.shipment className="calculate">
                                    <S.MarkerIcon />

                                    <button
                                      onClick={() => setOpenLocationModal(true)}
                                    >
                                      Calcular o frete
                                    </button>
                                  </S.shipment>
                                )
                              ) : (
                                <S.ContainerLoading>
                                  <img
                                    src="/images/loadingIcon.svg"
                                    alt="loading"
                                  />
                                  <div className="loading">
                                    Carregando Frete
                                  </div>
                                </S.ContainerLoading>
                              )}
                              <S.entregue>
                                <>
                                  {offerData && offerData.offers[0] && (
                                    <Row>
                                      <Col xs={6} md={6}>
                                        {offerData.offers[0] && (
                                          <>
                                            <p>Vendido e entregue por:</p>
                                            <a
                                              className="linkLojista"
                                              href={`/seller/${offerData.offers[0].marketplace_seller[0].url}`}
                                            >
                                              <h4>
                                                {
                                                  offerData.offers[0]
                                                    .marketplace_seller[0]
                                                    .shop_title
                                                }
                                              </h4>
                                            </a>
                                          </>
                                        )}
                                      </Col>

                                      {offerData.offers.length >= 2 && (
                                        <Col
                                          className="containerEscolherOutra"
                                          xs={6}
                                          md={6}
                                        >
                                          <a
                                            href={`/product/offers/${
                                              slug !== undefined && slug[0]
                                            }/${ssrData?.id}`}
                                          >
                                            <S.OutrasOfertas>
                                              <h3>ESCOLHER OUTRA LOJA</h3>
                                            </S.OutrasOfertas>
                                          </a>
                                        </Col>
                                      )}
                                    </Row>
                                  )}
                                </>
                              </S.entregue>

                              <S.tipo>
                                {varianteLoading ? (
                                  <S.ContainerLoading>
                                    <img
                                      src="/images/loadingIcon.svg"
                                      alt="loading"
                                    />
                                    <div className="loading">
                                      Carregando variações
                                    </div>
                                  </S.ContainerLoading>
                                ) : (
                                  <>
                                    {produtosConfigurable.length > 0 &&
                                      varianteProdutoAtual.length > 0 && (
                                        <>
                                          {produtosConfigurable.map(
                                            (produto, index) => (
                                              <S.ContainerFiltro key={index}>
                                                {varianteProdutoAtual.filter(
                                                  (variante) =>
                                                    variante.attribute[0]
                                                      .code === produto.code
                                                )[0]?.value && (
                                                  <h2>
                                                    {produto.swatch_type ===
                                                    "color" ? (
                                                      <div className="containerAtributo">
                                                        <div className="selecione">
                                                          Selecione a cor:&nbsp;
                                                        </div>{" "}
                                                        <div className="atributo">
                                                          {varianteProdutoAtual
                                                            .filter(
                                                              (variante) =>
                                                                variante
                                                                  .attribute[0]
                                                                  .code ===
                                                                produto.code
                                                            )[0]
                                                            .value.charAt(0)
                                                            .toUpperCase() +
                                                            varianteProdutoAtual
                                                              .filter(
                                                                (variante) =>
                                                                  variante
                                                                    .attribute[0]
                                                                    .code ===
                                                                  produto.code
                                                              )[0]
                                                              .value.substr(1)}
                                                        </div>
                                                      </div>
                                                    ) : produto.swatch_type ===
                                                      "text" ? (
                                                      <div className="containerAtributo">
                                                        <div className="selecione">
                                                          Selecione a opção de{" "}
                                                          {produto.admin_name}
                                                          :&nbsp;
                                                        </div>
                                                        <div className="atributo">
                                                          {varianteProdutoAtual
                                                            .filter(
                                                              (variante) =>
                                                                variante
                                                                  .attribute[0]
                                                                  .code ===
                                                                produto.code
                                                            )[0]
                                                            .value.charAt(0)
                                                            .toUpperCase() +
                                                            varianteProdutoAtual
                                                              .filter(
                                                                (variante) =>
                                                                  variante
                                                                    .attribute[0]
                                                                    .code ===
                                                                  produto.code
                                                              )[0]
                                                              .value.substr(1)}
                                                        </div>
                                                      </div>
                                                    ) : produto.swatch_type ===
                                                      null ? (
                                                      <div className="containerAtributo">
                                                        <div className="selecione">
                                                          Selecione a opção de{" "}
                                                          {produto.admin_name}
                                                          :&nbsp;
                                                        </div>
                                                        <div className="atributo">
                                                          {varianteProdutoAtual
                                                            .filter(
                                                              (variante) =>
                                                                variante
                                                                  .attribute[0]
                                                                  .code ===
                                                                produto.code
                                                            )[0]
                                                            .value.charAt(0)
                                                            .toUpperCase() +
                                                            varianteProdutoAtual
                                                              .filter(
                                                                (variante) =>
                                                                  variante
                                                                    .attribute[0]
                                                                    .code ===
                                                                  produto.code
                                                              )[0]
                                                              .value.substr(1)}
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <div className="containerAtributo">
                                                        <div className="selecione">
                                                          Selecione a opção de{" "}
                                                          {produto.admin_name}
                                                          :&nbsp;
                                                        </div>
                                                        <div className="atributo">
                                                          {varianteProdutoAtual
                                                            .filter(
                                                              (variante) =>
                                                                variante
                                                                  .attribute[0]
                                                                  .code ===
                                                                produto.code
                                                            )[0]
                                                            .value.charAt(0)
                                                            .toUpperCase() +
                                                            varianteProdutoAtual
                                                              .filter(
                                                                (variante) =>
                                                                  variante
                                                                    .attribute[0]
                                                                    .code ===
                                                                  produto.code
                                                              )[0]
                                                              .value.substr(1)}
                                                        </div>
                                                      </div>
                                                    )}
                                                  </h2>
                                                )}
                                                {produto.options_exist.length >
                                                  0 && (
                                                  <S.Flex>
                                                    {produto.swatch_type ===
                                                      "color" && (
                                                      <>
                                                        {produto.options_exist
                                                          .length > 4 ? (
                                                          <S.ContainerSlider
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            <Slider
                                                              {...settingsProducts}
                                                            >
                                                              {produto.options_exist.map(
                                                                (cores) => (
                                                                  <S.BoxCor
                                                                    key={
                                                                      cores.admin_name
                                                                    }
                                                                    onClick={() =>
                                                                      validarVariante(
                                                                        [
                                                                          cores.admin_name,
                                                                        ]
                                                                      )
                                                                    }
                                                                    cores={
                                                                      cores.swatch_value
                                                                    }
                                                                    active={
                                                                      varianteProdutoAtual.filter(
                                                                        (
                                                                          variante
                                                                        ) =>
                                                                          variante.value ===
                                                                          cores.admin_name
                                                                      ).length >
                                                                      0
                                                                    }
                                                                  >
                                                                    <span />
                                                                  </S.BoxCor>
                                                                )
                                                              )}
                                                            </Slider>
                                                          </S.ContainerSlider>
                                                        ) : (
                                                          <S.ContainerSlider
                                                            className="semSlider"
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            {produto.options_exist.map(
                                                              (cores) => (
                                                                <S.BoxCor
                                                                  key={
                                                                    cores.admin_name
                                                                  }
                                                                  className="semSlider"
                                                                  onClick={() =>
                                                                    validarVariante(
                                                                      [
                                                                        cores.admin_name,
                                                                      ]
                                                                    )
                                                                  }
                                                                  cores={
                                                                    cores.swatch_value
                                                                  }
                                                                  active={
                                                                    varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        cores.admin_name
                                                                    ).length > 0
                                                                  }
                                                                >
                                                                  <span />
                                                                </S.BoxCor>
                                                              )
                                                            )}
                                                          </S.ContainerSlider>
                                                        )}
                                                      </>
                                                    )}
                                                    {produto.swatch_type ===
                                                      "text" && (
                                                      <>
                                                        {produto.options_exist
                                                          .length > 4 ? (
                                                          <S.ContainerSliderImages
                                                            id="text"
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            <Slider
                                                              {...settingsProducts3}
                                                            >
                                                              {produto.options_exist.map(
                                                                (infos) => (
                                                                  <S.BoxInfo
                                                                    key={
                                                                      infos.admin_name
                                                                    }
                                                                    varianteAtual={varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        infos.admin_name
                                                                    )}
                                                                    onClick={() =>
                                                                      validarVariante(
                                                                        [
                                                                          infos.admin_name,
                                                                        ]
                                                                      )
                                                                    }
                                                                    active={
                                                                      varianteProdutoAtual.filter(
                                                                        (
                                                                          variante
                                                                        ) =>
                                                                          variante.value ===
                                                                          infos.admin_name
                                                                      ).length >
                                                                      0
                                                                    }
                                                                  >
                                                                    {
                                                                      infos.admin_name
                                                                    }
                                                                  </S.BoxInfo>
                                                                )
                                                              )}
                                                            </Slider>
                                                          </S.ContainerSliderImages>
                                                        ) : (
                                                          <S.ContainerSliderImages
                                                            className="semSlider"
                                                            id="text"
                                                          >
                                                            {produto.options_exist.map(
                                                              (infos) => (
                                                                <S.BoxInfo
                                                                  key={
                                                                    infos.admin_name
                                                                  }
                                                                  className="semSlider"
                                                                  varianteAtual={varianteProdutoAtual.filter(
                                                                    (
                                                                      variante
                                                                    ) =>
                                                                      variante.value ===
                                                                      infos.admin_name
                                                                  )}
                                                                  onClick={() =>
                                                                    validarVariante(
                                                                      [
                                                                        infos.admin_name,
                                                                      ]
                                                                    )
                                                                  }
                                                                  active={
                                                                    varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        infos.admin_name
                                                                    ).length > 0
                                                                  }
                                                                >
                                                                  {
                                                                    infos.admin_name
                                                                  }
                                                                </S.BoxInfo>
                                                              )
                                                            )}
                                                          </S.ContainerSliderImages>
                                                        )}
                                                      </>
                                                    )}
                                                    {produto.swatch_type ===
                                                      null && (
                                                      <>
                                                        {produto.options_exist
                                                          .length > 4 ? (
                                                          <S.ContainerSliderImages
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            <Slider
                                                              {...settingsProducts3}
                                                            >
                                                              {produto.options_exist.map(
                                                                (infos) => (
                                                                  <S.BoxInfo
                                                                    key={
                                                                      infos.admin_name
                                                                    }
                                                                    varianteAtual={varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        infos.admin_name
                                                                    )}
                                                                    onClick={() =>
                                                                      validarVariante(
                                                                        [
                                                                          infos.admin_name,
                                                                        ]
                                                                      )
                                                                    }
                                                                    active={
                                                                      varianteProdutoAtual.filter(
                                                                        (
                                                                          variante
                                                                        ) =>
                                                                          variante.value ===
                                                                          infos.admin_name
                                                                      ).length >
                                                                      0
                                                                    }
                                                                  >
                                                                    {
                                                                      infos.admin_name
                                                                    }
                                                                  </S.BoxInfo>
                                                                )
                                                              )}
                                                            </Slider>
                                                          </S.ContainerSliderImages>
                                                        ) : (
                                                          <S.ContainerSliderImages className="semSlider">
                                                            {produto.options_exist.map(
                                                              (infos) => (
                                                                <S.BoxInfo
                                                                  key={
                                                                    infos.admin_name
                                                                  }
                                                                  className="semSlider"
                                                                  varianteAtual={varianteProdutoAtual.filter(
                                                                    (
                                                                      variante
                                                                    ) =>
                                                                      variante.value ===
                                                                      infos.admin_name
                                                                  )}
                                                                  onClick={() =>
                                                                    validarVariante(
                                                                      [
                                                                        infos.admin_name,
                                                                      ]
                                                                    )
                                                                  }
                                                                  active={
                                                                    varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        infos.admin_name
                                                                    ).length > 0
                                                                  }
                                                                >
                                                                  {
                                                                    infos.admin_name
                                                                  }
                                                                </S.BoxInfo>
                                                              )
                                                            )}
                                                          </S.ContainerSliderImages>
                                                        )}
                                                      </>
                                                    )}
                                                    {produto.swatch_type ===
                                                      "image" && (
                                                      <>
                                                        {produto.options_exist
                                                          .length > 4 ? (
                                                          <S.ContainerSliderImages
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            <Slider
                                                              {...settingsProducts3}
                                                            >
                                                              {produto.options_exist.map(
                                                                (imagens) => (
                                                                  <S.BoxImage
                                                                    key={
                                                                      imagens.admin_name
                                                                    }
                                                                    active={
                                                                      varianteProdutoAtual.filter(
                                                                        (
                                                                          variante
                                                                        ) =>
                                                                          variante.value ===
                                                                          imagens.admin_name
                                                                      ).length >
                                                                      0
                                                                    }
                                                                    varianteAtual={varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        imagens.admin_name
                                                                    )}
                                                                    onClick={() =>
                                                                      validarVariante(
                                                                        [
                                                                          imagens.admin_name,
                                                                        ]
                                                                      )
                                                                    }
                                                                  >
                                                                    <img
                                                                      src={
                                                                        imagens.swatch_value
                                                                      }
                                                                      alt="Attribute icon"
                                                                    />
                                                                  </S.BoxImage>
                                                                )
                                                              )}
                                                            </Slider>
                                                          </S.ContainerSliderImages>
                                                        ) : width < 550 &&
                                                          produto.options_exist
                                                            .length > 4 ? (
                                                          <S.ContainerSliderImages
                                                            quantidade={
                                                              produto
                                                                .options_exist
                                                                .length
                                                            }
                                                          >
                                                            <Slider
                                                              {...settingsProducts3}
                                                            >
                                                              {produto.options_exist.map(
                                                                (imagens) => (
                                                                  <S.BoxImage
                                                                    key={
                                                                      imagens.admin_name
                                                                    }
                                                                    active={
                                                                      varianteProdutoAtual.filter(
                                                                        (
                                                                          variante
                                                                        ) =>
                                                                          variante.value ===
                                                                          imagens.admin_name
                                                                      ).length >
                                                                      0
                                                                    }
                                                                    varianteAtual={varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        imagens.admin_name
                                                                    )}
                                                                    onClick={() =>
                                                                      validarVariante(
                                                                        [
                                                                          imagens.admin_name,
                                                                        ]
                                                                      )
                                                                    }
                                                                  >
                                                                    <img
                                                                      src={
                                                                        imagens.swatch_value
                                                                      }
                                                                      alt="Attribute icon"
                                                                    />
                                                                  </S.BoxImage>
                                                                )
                                                              )}
                                                            </Slider>
                                                          </S.ContainerSliderImages>
                                                        ) : (
                                                          <S.ContainerSliderImages className="semSlider">
                                                            {produto.options_exist.map(
                                                              (imagens) => (
                                                                <S.BoxImage
                                                                  key={
                                                                    imagens.admin_name
                                                                  }
                                                                  className="semSlider"
                                                                  active={
                                                                    varianteProdutoAtual.filter(
                                                                      (
                                                                        variante
                                                                      ) =>
                                                                        variante.value ===
                                                                        imagens.admin_name
                                                                    ).length > 0
                                                                  }
                                                                  varianteAtual={varianteProdutoAtual.filter(
                                                                    (
                                                                      variante
                                                                    ) =>
                                                                      variante.value ===
                                                                      imagens.admin_name
                                                                  )}
                                                                  onClick={() =>
                                                                    validarVariante(
                                                                      [
                                                                        imagens.admin_name,
                                                                      ]
                                                                    )
                                                                  }
                                                                >
                                                                  <img
                                                                    src={
                                                                      imagens.swatch_value
                                                                    }
                                                                    alt="Attribute icon"
                                                                  />
                                                                </S.BoxImage>
                                                              )
                                                            )}
                                                          </S.ContainerSliderImages>
                                                        )}
                                                      </>
                                                    )}
                                                  </S.Flex>
                                                )}
                                              </S.ContainerFiltro>
                                            )
                                          )}
                                        </>
                                      )}
                                  </>
                                )}
                              </S.tipo>

                              {short_description !== false && (
                                <div>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: short_description,
                                    }}
                                  ></p>
                                </div>
                              )}
                              {additionalInformation !== false && (
                                <div>
                                  <h3>Características</h3>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: additionalInformation,
                                    }}
                                  ></p>{" "}
                                </div>
                              )}
                            </div>
                          </S.Flex>
                        </S.titulo>
                      </Col>
                    </Row>
                  </Container>

                  <Container>
                    <ProductDetails
                      produto={ssrData?.product}
                      showValue={showValue}
                      tecnicos={showCaracteristicas(
                        ssrData?.product.attributes,
                        "products_specifications"
                      )}
                    />

                    {relatedData !== undefined &&
                      relatedData.related.length > 0 && (
                        <S.productsContainer>
                          <h3 className="subtitle">
                            Outros modelos semelhantes
                          </h3>

                          <ProductListApiGql
                            hits={relatedData.related}
                            page={"product"}
                            slider="slider"
                            mktName={mktName}
                          />
                        </S.productsContainer>
                      )}
                  </Container>
                </S.produtoInfo>
              </>
            )}

            {addCart && !wishListMenuOpened && (
              <AddedProduct addCart={addCart} setAddCart={setAddCart} />
            )}
          </S.GeneralContainer>
          {located &&
          offerData !== undefined &&
          offerData.offers !== null &&
          offerData.offers.length > 0 ? (
            <S.ContainerFooter></S.ContainerFooter>
          ) : (
            <></>
          )}
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default ProductComponent;
