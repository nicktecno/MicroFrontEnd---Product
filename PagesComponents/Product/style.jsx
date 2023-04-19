import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { Truck } from "@styled-icons/boxicons-solid/Truck";
import { Store } from "@styled-icons/fa-solid/Store";
import { ErrorWarning } from "@styled-icons/remix-line/ErrorWarning";
import { Marker } from "@styled-icons/foundation/Marker";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const MarkerIcon = styled(Marker)`
  width: 20px;
  min-width: 20px;
  height: 30px;
`;

export const warningIcon = styled(ErrorWarning)`
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin-right: 10px;
  color: #ce171f;
`;

export const StoreIcon = styled(Store)`
  height: 40px;
  width: 40px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const TruckIcon = styled(Truck)`
  height: 40px;
  width: 40px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const ModalAtributos = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalWishList = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalTerms = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const centroModalTerms = styled.div`
  display: flex;
  width: 500px;
  height: 450px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
  `}

  .modalTitle {
    width: 100%;
    position: relative;
    color: var(--title-color);
    background: var(--default-color);
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    text-align: center;

    .title {
      font-weight: bold;
      font-size: 16px;
    }
    ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
  }

  .caixaLista {
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;
    overflow: auto;
    text-align: initial;

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
  }

  .modalFooter {
    justify-content: center;
    display: flex;
    bottom: 0px;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      border: 0px;
      font-weight: 600;
      &.cancelar {
        transition: 0.3s;
      }
    }
  }
`;

export const centroAlertaAtributos = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
  `}

  .atributoTitle {
    padding: 20px 15px;
    background: var(--default-color);
    color: var(--title-color);
    display: flex;
    justify-content: center;
    font-weight: bold;
    flex-direction: row;
    height: auto;

    div {
      font-weight: bold;
      font-size: 17px;
      margin-left: 20px;
      width: 100%;
    }
    button {
      align-self: flex-end;
      justify-self: center;
      border: none;
      background-color: unset;
      font-size: 23px;
      font-weight: 600;
    }
  }
  .atributos {
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    height: auto;
  }
  .caixaProduto {
    padding: 0 20px;
    max-height: 200px;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #cccccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #cccccc;
    }
  }
`;

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;
  color: var(--title-color);
  font-weight: bold;
  position: absolute;
  top: 13px;
  right: 25px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("400px")`
      top: 12px;
      right:5px;
      padding:0px 10px; 
    `}
`;

export const centroAlertaWishList = styled.div`
  display: flex;
  width: 500px;
  height: 450px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
  `}

  .modalTitle {
    width: 100%;
    position: relative;
    color: var(--title-color);
    background: var(--default-color);
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    text-align: center;

    .title {
      font-weight: bold;
      font-size: 16px;
    }
    ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
  }

  .caixaDelete {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;

    .contentDelete {
      font-size: 16px;
    }
  }

  .caixaLista {
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;
    overflow: auto;

    .loading {
      width: 75px;
      margin-top: 20px;
    }

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .adicionarProjeto {
      display: flex;
      border: 1px solid var(--default-color);
      min-height: 80px;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 10px;

      &.selecionado {
        background: #dedede;
      }

      :hover {
        background: #f4f4f5;
      }

      .containerImage {
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;

        .imageList {
          width: 70px;
        }
        svg {
          width: 70px;
        }
      }
      .containerDados {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        overflow: auto;
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;

        ::-webkit-scrollbar {
          width: 7px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #f4f4f5;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 5px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }

        .titleCard {
          font-weight: bold;
          font-size: 14px;
        }
      }

      .containerEdicao {
        display: flex;
        width: 120px;

        .containerUpdate {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          :hover {
            color: var(--default-color);
          }
          svg {
            width: 30px;
          }
        }
        .containerDeletar {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          :hover {
            color: var(--default-color);
          }
          svg {
            width: 30px;
          }
        }
      }
    }

    .formCreate {
      width: 100%;
      .containerInput {
        width: 100%;
        height: 41px;

        margin-bottom: 10px;
        background: #f4f4f5;
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 10px;
          color: black;

          ::placeholder {
            color: black;
          }

          background: transparent;
          border: 0px;
        }
      }
      textarea {
        width: 100%;
        padding: 10px;
        background: #f4f4f5;
        border: 0px;
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;
        color: black;
        margin-bottom: 10px;

        ::placeholder {
          color: black;
        }
        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }
      select {
        width: 100%;

        border: none;
        border-bottom: 2px solid var(--input-border-color);
        margin-bottom: 10px;
        color: black;
        padding: 10px 10px;
        transition: 0.3s;
        cursor: pointer;
        &.selectMaiorMenor {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;

          background: url("/images/icon-errow-down.png") 95% center no-repeat !important;
        }

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }

      .dadosOpcionais {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 14px;
      }

      .containerImageUpload {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

        .upload__image-wrapper {
          display: flex;
          width: 100%;
        }
        .buttonAdicionarImagem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 0px;
          width: 100%;
          padding: 10px;
          transition: 0.3s;

          :hover {
            background: #ccc;
          }
          .containerImage {
            width: 50px;
            margin-top: 5px;
          }
        }
        .image-uploaded {
          display: flex;
          width: 100%;
          justify-content: center;

          .image-item__btn-wrapper {
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 5px;

            button {
              margin-left: 20px;
              border: 0px;
              padding: 5px 10px;
              transition: 0.3s;
              color: #fff;
              background-color: #dbc79a;

              text-transform: uppercase;
              font-weight: 600;
              :hover {
              }
            }
          }
        }
      }

      .botaoLocalizacao {
        width: 100%;
        padding: 10px 50px 10px 50px;
        background: #dbc79a;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 20px;
          margin-right: 5px;
        }

        :hover {
          background: #dbc79a;
        }
      }
    }
  }

  .modalFooter {
    justify-content: center;
    gap: 20px;
    display: flex;
    bottom: 0px;
    margin-top: 20px;

    .loading {
      width: 50px;
    }

    button {
      border: 0px;
      font-weight: 600;
      &.cancelar {
        padding: 10px 30px;
        transition: 0.3s;
      }

      &.adicionar {
        padding: 12px 30px;
        transition: 0.3s;
      }
      &.adicionarBloqueado {
        padding: 12px 30px;
        transition: 0.3s;
        cursor: not-allowed;
      }
    }
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  width: 100%;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  img {
    width: 50px;
  }

  .loading {
    font-size: 18px;
  }
`;

export const termos = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: black;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  .check-termos {
    all: unset;
    border: 1px solid black;

    width: 15px;
    height: 15px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
  }
  .check-termos:checked {
    width: 15px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 15px;

    &:before {
      content: "✔️";
      color: black;
      justify-content: center;
      align-items: center;
      display: flex;
      font-size: 12px;
    }
  }

  span {
    font-weight: bold;
    cursor: pointer;

    .termosEntrega {
      transition: 0.3s;
      border: 2px solid transparent;
      transition: 0.3s;

      :hover {
        border-bottom: 1px solid black;
      }
    }
  }
`;

export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const CheckIcon = styled(Check)`
  height: 15px;
  width: 15px;
  pointer-events: none !important;
`;

export const Semelhantes = styled.div`
  ${customMedia.lessThan("tablet")`
      padding-bottom: 180px;
    `}
`;

export const produtoInfo = styled.div`
  padding-top: 40px;

  .click {
    cursor: pointer;
  }

  h3.subtitle {
    color: #000;
    font-size: 1.75rem;
    margin-bottom: 10px;
    text-transform: capitalize;
    margin-left: -15px;
  }
  ${customMedia.lessThan("tablet")`
  margin-bottom: 50px;
  `}
`;

export const instalacao = styled.div`
  margin-bottom: 30px;

  span {
    color: var(--default-color);
  }

  ${customMedia.lessThan("tablet")`
      font-size: 11px;
      color: #707070;
      line-height: 15px;
    `}
`;

export const entregue = styled.div`
  margin-top: 10px;

  p {
    color: #595959;
    font-size: 14px !important;
    margin-bottom: 0;
  }
  a {
    max-height: 30px;
  }
  h4 {
    color: black;
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
    text-decoration: underline transparent;
    transition: 0.3s;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const OutrasOfertas = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px !important;
  background-color: #595959;
  color: #fff !important;
  font-weight: 600 !important;
  color: black;
  border-radius: 2px;

  transition: 0.3s;
  height: 100%;

  h3 {
    font-size: 12px;
    margin: 0px;
    padding: 10px;
    text-align: center;
  }
`;

export const tipo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  h2 {
    color: #505050;
    font-size: 16px;
    margin: 0 0 10px;
    padding: 0px;
    font-weight: bold;

    .containerAtributo {
      display: flex;
    }

    .selecione {
      font-size: 14px;
      font-weight: 400;
    }
    .atributo {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export const ContainerFiltro = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;

  .dataProduct {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerPrice = styled.div`
  display: flex;
  width: 50%;

  flex-direction: column;

  .containerAfterPrice {
    display: flex;
    align-items: flex-start;

    gap: 5px;
  }

  .percentagePrice {
    display: flex;
    width: 50px;
    font-size: 12px;
    padding: 5px 2px;
    font-weight: bold;
    border-radius: 2px;
    align-items: center;
    background-color: var(--default-color);
    justify-content: center;
  }
  .price {
    min-width: max-content;
  }

  ${customMedia.lessThan("tablet")`
  width:100%;
     margin-bottom:10px;
    `}

  .containerPortions {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
  }

  .portions {
    display: flex;
    font-size: 14px;

    flex: 1;
    align-items: center;
    text-align: flex-start;
    flex-wrap: wrap;
    margin-bottom: 5px;

    ${customMedia.lessThan("mobile")`
     justify-content:start;
     margin-left:0px;
     
     text-align:start;
     margin-bottom:10px;
      
    `}

    span {
      &.green {
        color: var(--bt-purchase-color);
      }
    }
  }

  .modalPortions {
    display: flex;
    font-size: 14px;
    text-decoration: underline;

    span {
      cursor: pointer;
    }

    ${customMedia.lessThan("mobile")`
     justify-content:start;
    margin-bottom:15px;      
    `}
  }
`;

export const ContainerSlider = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 15px;
  justify-content: center;

  .slick-slider {
    width: 90%;
  }
  .slick-list {
    padding: 0px;
  }

  .slick-slide {
    width: 60px !important;
    height: 50px;
    margin: 10px 0px;
    display: flex !important;
  }
  .slick-next {
    display: ${(props) =>
      props.quantidade >= 3 ? "flex !important" : "none !important"};
    right: -15px;
    width: 20px;
    height: 20px;
    z-index: 1;
    top: 40%;

    ${customMedia.lessThan("desktop")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
    ${customMedia.lessThan("notebook")`
      display: ${(props) =>
        props.quantidade >= 5 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("tablet")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
       ${customMedia.lessThan("mobile")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("415px")`
      display: ${(props) =>
        props.quantidade >= 2 ? "flex !important" : "none !important"};
    `}
  }
  .slick-prev {
    display: ${(props) =>
      props.quantidade >= 3 ? "flex !important" : "none !important"};
    width: 20px;
    height: 20px;
    left: -15px;
    z-index: 1;
    top: 40%;
    ${customMedia.lessThan("desktop")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
    ${customMedia.lessThan("notebook")`
      display: ${(props) =>
        props.quantidade >= 5 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("tablet")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
       ${customMedia.lessThan("mobile")`
      display: ${(props) =>
        props.quantidade >= 3 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("415px")`
      display: ${(props) =>
        props.quantidade >= 2 ? "flex !important" : "none !important"};
    `}
  }
  &.semSlider {
    justify-content: flex-start;
    padding: 0px 15px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
  }
`;
export const ContainerRelacionados = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 30px;
  width: 100%;
  margin-bottom: 20px;

  ${customMedia.lessThan("400px")`
    gap: 15px;
    width: 94vw;
    overflow-x: scroll;
  `}
`;

export const BoxCor = styled.div`
  color: #292728;

  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 55px !important;
  height: 55px;
  border: 1px solid transparent;
  background-color: white;
  cursor: pointer;
  border: ${(props) =>
    props.active ? "1px solid var(--default-color)" : "1px solid transparent"};

  :hover {
    border: 1px solid var(--default-color);
  }

  span {
    width: 35px;
    height: 35px;
    border: 1px solid black;
    background-color: ${(props) => props.cores};
  }
  &.semSlider {
    justify-content: flex-start;

    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const ContainerSliderImages = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 15px;
  justify-content: center;

  ${customMedia.lessThan("notebook")`
      max-width: 56%;
    `}

  ${customMedia.lessThan("tablet")`
		max-width: 77%;
  `}

	${customMedia.lessThan("mobile")`
    max-width: 100%;
  `}

  .slick-slider {
    width: 90%;
  }

  .slick-list {
    padding: 0px;
  }

  .slick-slide {
    height: 100px;
    display: flex !important;
  }
  .slick-next {
    display: ${(props) =>
      props.quantidade > 4 ? "flex !important" : "none !important"};
    right: -15px;
    width: 20px;
    height: 20px;
    z-index: 1;
    top: 40%;

    ${customMedia.lessThan("desktop")`
      display: ${(props) =>
        props.quantidade > 3 ? "flex !important" : "none !important"};
    `}
    ${customMedia.lessThan("notebook")`
      display: ${(props) =>
        props.quantidade > 5 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("tablet")`
      display: ${(props) =>
        props.quantidade > 3 ? "flex !important" : "none !important"};
    `}
       ${customMedia.lessThan("mobile")`
      display: ${(props) =>
        props.quantidade > 4 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("415px")`
      display: ${(props) =>
        props.quantidade > 4 ? "flex !important" : "none !important"};
    `}
  }
  .slick-prev {
    display: ${(props) =>
      props.quantidade > 4 ? "flex !important" : "none !important"};
    width: 20px;
    height: 20px;
    left: -15px;
    z-index: 1;
    top: 40%;
    ${customMedia.lessThan("desktop")`
      display: ${(props) =>
        props.quantidade > 3 ? "flex !important" : "none !important"};
    `}
    ${customMedia.lessThan("notebook")`
      display: ${(props) =>
        props.quantidade > 5 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("tablet")`
      display: ${(props) =>
        props.quantidade > 3 ? "flex !important" : "none !important"};
    `}
       ${customMedia.lessThan("mobile")`
      display: ${(props) =>
        props.quantidade > 4 ? "flex !important" : "none !important"};
    `}
      ${customMedia.lessThan("415px")`
      display: ${(props) =>
        props.quantidade > 4 ? "flex !important" : "none !important"};
    `}
  }

  &.semSlider {
    justify-content: flex-start;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    ${customMedia.lessThan("mobile")`
      gap: 5px;
    `}
  }
`;
export const BoxInfo = styled.div`
  display: flex !important;
  width: 70px !important;
  justify-content: center !important;
  align-items: center !important;
  height: 70px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0px 2px;
  color: ${(props) =>
    props.active
      ? "var(--configurable-attributes-color-hover)"
      : "var(--configurable-attributes-color)"};
  font-weight: bold;
  border: 1px solid transparent;
  cursor: pointer;
  border: ${(props) =>
    props.active ? "solid 1px var(--default-color)" : "solid 1px transparent"};
  background-color: ${(props) =>
    props.active
      ? "var(--configurable-attributes-bgcolor-hover) "
      : "var(--configurable-attributes-bgcolor) "};

  :hover {
    border: solid 1px var(--configurable-attributes-bgcolor-hover);
  }
  &.semSlider {
    justify-content: flex-start;

    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 5px;
  }
`;

export const BoxImage = styled.div`
  display: flex !important;
  width: 70px !important;
  height: auto;
  cursor: pointer;
  outline: 1px solid transparent;

  border: ${(props) =>
    props.active ? "1px solid var(--default-color)" : "1px solid transparent"};

  :hover {
    border: 1px solid var(--default-color);
  }

  img {
    max-width: 100%;
    width: auto;
  }
  &.semSlider {
    justify-content: flex-start;

    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 5px;
  }
`;

export const img = styled.div`
  margin-right: 5px;
  margin-bottom: 10px;
  text-align: center;
  padding: 5px;

  img {
    width: 72px;
    height: 72px;
    display: inline-block;
  }

  :hover,
  &.active {
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0px 3px 3px #00000029;
    cursor: pointer;
    border: 1px solid var(--default-color);
  }
`;

export const titulo = styled.div`
  text-align: left;
  margin-bottom: 0px;
  h1 {
    color: #000;
    font-size: 24px;
    font-weight: 500;
  }
  h2 {
    color: #000;
    font-size: 30px;
    font-weight: 600;
  }
  .noShip {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .beforePrice {
    color: #9f9f9fcc;
    text-decoration: line-through;
  }

  .price {
    color: #000;
    font-size: 24px;
    font-weight: bold;
  }

  p {
    color: #595959;
    font-size: 16px;
    line-height: 20px;
  }

  p span {
    font-size: 16px;
    color: #595959;
  }

  .stamp1 {
    text-align: center;

    font-weight: bold;
    width: max-content;
    padding: 2px 10px;
    margin: 10px 0px;
    ${customMedia.lessThan("tablet")`
    font-size: 16px;
  `}
  }
  ${customMedia.lessThan("notebook")`
    margin-top:20px;
  `}
`;

export const shipment = styled.div`
  display: flex;
  margin: 5px 0px;
  flex-direction: column;
  width: 100%;

  &.calculate {
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 0px;

    ${customMedia.lessThan("tablet")`
      justify-content:flex-start;
    `}

    button {
      font-weight: 500;
      margin-left: 5px;
      padding: 0px;
      border-bottom: 1px solid black;
    }
  }

  &.noShipment {
    height: auto;
    margin-top: 10px;
  }

  section {
    width: 100%;
    border: solid 2px var(--default-color-hover);
    display: flex;
    padding: 5px 2px;

    &.noShipment {
      color: #bbbbbb;
    }
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .noShipmentOption {
    display: flex;
    flex-direction: row;
    color: #ce171f;

    span {
      font-weight: 550;
      font-size: 16px;
    }
    button {
      padding: 0;
      font-weight: 550;
      font-size: 16px;
      color: #ce171f;
      text-decoration: underline;
    }
  }
  .mainContainer {
    display: flex;
    flex-direction: row;
  }
  .otherShipment {
    button {
      color: #595959;
      font-size: 12px;
      text-align: right;
    }
  }
  p {
    font-size: 14px;
    margin: 1px 6px;
  }
  button {
    min-width: 90px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    background-color: unset;
    box-shadow: unset;
    margin-left: 3px;
  }

  ${customMedia.lessThan("notebook")`
    flex-direction: column;
    height: 100px;
      p {
        font-size: 14px;
        margin: 1px 20px;
      }
      .noShipmentOption {
        justify-content: start;
      align-items: center;
      }
  `}

  ${customMedia.lessThan("mobile")`
    flex-direction: column;
    height: 170px;
      .mainContainer {
        flex-direction: column;
      }
      section{
        height:65px;
      }
      .noShipmentOption {
        span {
        font-size: 15px;
        }
        button {
          font-size: 15px;
        }
      }
  `}
`;

export const banner = styled.div`
  height: 75%;
  width: 100%;

  .image-gallery-play-button {
    display: none;
  }

  .image-gallery-using-mouse {
    display: flex;
    flex-direction: column;
  }

  button {
    box-shadow: unset;
  }

  .image-gallery-thumbnails .image-gallery-thumbnails-container {
    display: flex;
    ${customMedia.lessThan("510px")`
        ::-webkit-scrollbar {
          width: 7px;
        }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #b9cb96;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #c7c7c7;
        border-radius: 5px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #b9cb96;
      }
    `}
  }
`;

export const Localizado = styled.div`
  background-color: #e0e0e0;
  border: #c0c0c0;
  padding: 5px;
  width: 100%;
  display: block;
  font-size: 13px;
`;

export const Cliqueaqui = styled.a`
  a {
    font-weight: bold;
    color: black;
  }
`;

export const HideElement = styled.div`
  display: none;
`;
export const ContainerFooter = styled.div`
  display: flex;
  ${customMedia.lessThan("tablet")`
    display: flex;
    flex-direction: column;
    margin-bottom: 150px;
  `}
`;

export const GeneralContainer = styled.div`
  height: 100%;
  min-height: 100vh;

  .bt-gray-rinnai {
    display: flex !important;
    justify-content: center;
    align-items: center;
    max-width: 350px;

    svg {
      width: 40px;
      margin-right: 5px;
    }
  }
`;

export const InstalationHandle = styled.div`
  width: 100%;
  text-align: end;
  margin-bottom: 5px;

  button.instalationItems {
    background: #595959;
    border: none;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    padding: 5px 55px;

    :hover {
      cursor: pointer;
    }
  }
`;

export const ContainerStamps = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
`;

export const Stamp2 = styled.div`
  background-color: var(--default-color);
  text-align: center;
  color: #000000;

  font-weight: bold;
  width: max-content;
  padding: 2px 10px;
`;

export const Stamp3 = styled.div`
  background-color: #000000;
  text-align: center;
  color: #ffff;

  font-weight: bold;
  width: max-content;
  padding: 2px 10px;
`;

export const productsContainer = styled.div`
  padding: 0 20px;
  .slick-list {
    padding: 0;
  }
`;
