import notification from "../../services/notification";

import * as S from "./styles";

//Carrossel atributos

import wishListApi from "../../services/msWishList";
import { useCart } from "../../Context/CartLengthContext";
import { useState } from "react";

export function DeleteProjectModalWishList({
  getListWishList,
  setModalDelete,
  modalDelete,
  codeOfList,
  modalEdicaoMobile,
}) {
  const { setCartLength } = useCart();

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars

  async function deleteList() {
    setLoading(true);

    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );
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

      const { data: response } = await wishListApi.delete(
        `/wish-list/customer/delete/${codeOfList.code}`,

        {
          headers: {
            Type: "customer",
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
          },
        }
      );
      notification("Lista removida com sucesso", "success");
      if (modalEdicaoMobile === "inativo") {
        document.body.style.overflow = "auto";
      }
      setModalDelete("inativo");
      getListWishList();
      setLoading(false);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setLoading(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        notification("Erro ao remover lista", "error");
        setLoading(false);
      }
    }
  }
  return (
    <S.ModalWishList className={modalDelete}>
      <S.Transparente
        onClick={() => {
          if (modalEdicaoMobile === "inativo") {
            document.body.style.overflow = "auto";
          }
          setModalDelete("inativo");
        }}
      />

      <S.centroAlertaWishList>
        <div className="modalTitle">
          <span className="title">Remover Lista</span>
          <S.closeButton
            onClick={() => {
              if (modalEdicaoMobile === "inativo") {
                document.body.style.overflow = "auto";
              }
              setModalDelete("inativo");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaDelete">
          <div className="contentDelete">
            {" "}
            Deseja realmente remover a lista <strong>
              {codeOfList.name}
            </strong>{" "}
            ?
          </div>
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              if (modalEdicaoMobile === "inativo") {
                document.body.style.overflow = "auto";
              }
              setModalDelete("inativo");
            }}
            className="cancelar negativeButton"
          >
            VOLTAR
          </button>
          {loading ? (
            <img
              className="loading"
              src="/images/loadingIcon.svg"
              alt="Carregando"
            />
          ) : (
            <button
              onClick={() => deleteList()}
              className="adicionar positiveButton"
            >
              REMOVER
            </button>
          )}
        </div>
      </S.centroAlertaWishList>
    </S.ModalWishList>
  );
}
