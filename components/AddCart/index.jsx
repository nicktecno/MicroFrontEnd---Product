import React, { useEffect, useState } from "react";

// componentes boostrap
import { Row } from "react-bootstrap";

import { Heart } from "@styled-icons/bootstrap/Heart";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";

// Css do componente
import * as S from "./style";
import { useMenu } from "../../Context/Menu";
import notification from "../../services/notification";
import { useRouter } from "next/router";

function AddCart({
  qtd,
  setQtd,
  onClick,
  oferta,
  loja,
  seller,
  valor,
  produto_id,
  productAttr,
  showValueText,
  location,
  setShareModal,
}) {
  const router = useRouter();
  const { setOpenWishList } = useMenu();

  const [loggedState, setLoggedState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.NEXT_PUBLIC_REACT_APP_NAME)) {
      setLoggedState(true);
    }
  }, []);

  const handleUnloggedUser = () => {
    const productInformation = {
      urlKey: showValueText(productAttr, "url_key"),
      location: location,
    };
    sessionStorage.setItem("productInfo", JSON.stringify(productInformation));

    notification("Ops, faça seu login primeiro.", "info");
    setTimeout(() => router.push("/login"), 2500);
  };

  return (
    <S.box>
      <Row className="rowGeral">
        <div className="containerFunctions">
          <div className="colWishList mobile">
            <S.WishList
              onClick={() => {
                sessionStorage.setItem("urlantiga", window.location.href);
                document.body.style.overflow = "hidden";
                loggedState ? setOpenWishList("ativo") : handleUnloggedUser();
              }}
            >
              <Heart />
            </S.WishList>
            <S.WishList onClick={() => setShareModal("active")}>
              <ShareAlt />
            </S.WishList>
          </div>
          <S.quantidade>
            {/* <h5>Quantidade</h5> */}
            <p>
              <button
                className="buttonQuantity positiveButton"
                onClick={() => setQtd(qtd <= 1 ? 1 : qtd - 1)}
              >
                -
              </button>
              <span>{qtd}</span>{" "}
              <button
                className="buttonQuantity positiveButton"
                onClick={() => setQtd(qtd + 1)}
              >
                +
              </button>
            </p>
          </S.quantidade>
          <div className="colWishList desktop">
            <S.WishList
              onClick={() => {
                sessionStorage.setItem("urlantiga", window.location.href);
                document.body.style.overflow = "hidden";
                loggedState ? setOpenWishList("ativo") : handleUnloggedUser();
              }}
            >
              <Heart />
            </S.WishList>
            <S.WishList onClick={() => setShareModal("active")}>
              <ShareAlt />
            </S.WishList>
          </div>
        </div>

        <div className={"colButton"} xs={7} md={7}>
          <button
            className="generalButton positiveButton"
            onClick={onClick}
            oferta={oferta}
            loja={loja}
            seller={seller}
            produto_id={produto_id}
            valor={valor}
          >
            <S.CartIcon /> Comprar
          </button>
        </div>
      </Row>
    </S.box>
  );
}

export default AddCart;
