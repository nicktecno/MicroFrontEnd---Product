import React, { useState } from "react";
import { useRouter } from "next/router";

import { Modal } from "react-bootstrap";

import * as S from "./style";

function AddedProduct({ addCart, setAddCart }) {
  const [modalShow, setModalShow] = useState(addCart ? true : false);
  const history = useRouter();

  function abreMenu() {
    setModalShow(modalShow ? false : true);
    setAddCart(false);
  }

  return (
    <S.modal1>
      <S.local className={modalShow ? "ativo" : "inativo"}>
        <S.Transparente
          onClick={() => {
            setModalShow(false);
            setAddCart(false);
          }}
        />

        <Modal
          show={modalShow}
          onHide={() => abreMenu()}
          size="sm modal-aviso"
          dialogClassName="addedCartModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Footer className="modal-adicionar">
            <S.AvisoText>
              Produto adicionado com sucesso ao carrinho
            </S.AvisoText>
            <S.CaixaProduto>
              <S.TituloProduto>{addCart.title}</S.TituloProduto>
              {addCart.atributos !== false &&
                addCart.atributos.map((atributo, index) => (
                  <S.Atributos key={index}>
                    {`${
                      atributo.attribute[0].admin_name.charAt(0).toUpperCase() +
                      atributo.attribute[0].admin_name.substr(1)
                    }: ${
                    atributo.value !== undefined && atributo.value !== null ? atributo.value.charAt(0).toUpperCase() +  atributo.value.substr(1) : "Padrão"

                    }`}
                  </S.Atributos>
                ))}
              <img alt="weBrasil" src={addCart.img} />

              <S.ButtonCarrinho
                className="positiveButton"
                onClick={() => {
                  setModalShow(false);
                  history.push(addCart.destino);
                }}
              >
                VER CARRINHO
              </S.ButtonCarrinho>

              <S.ButtonContinuar
                className="negativeButton"
                onClick={() => {
                  setAddCart(false);
                  setModalShow(false);
                }}
              >
                CONTINUAR COMPRANDO
              </S.ButtonContinuar>
            </S.CaixaProduto>
          </Modal.Footer>
        </Modal>
      </S.local>
    </S.modal1>
  );
}

export default AddedProduct;
