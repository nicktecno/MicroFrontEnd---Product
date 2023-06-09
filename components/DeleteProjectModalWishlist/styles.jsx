import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

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

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;
  color: var(--title-color);
  font-weight: 700;
  position: absolute;
  top: 13px;
  right: 25px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("400px")`
        top: 12px;
        right:5px;
        padding:0 10px;  
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
      font-size: 17px;
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
      border: 1px solid black;
      min-height: 80px;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 10px;

      &.selecionado {
        background: #dbc79a;

        :hover {
          background: #cca8a8;
        }
      }

      // :hover {
      // 	background: #b9cb9657;
      // }

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

          // :hover {
          // 	color: #575f47;
          // }
          svg {
            width: 30px;
          }
        }
        .containerDeletar {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          // :hover {
          // 	color: #575f47;
          // }
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
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;

        :hover {
          border-bottom: solid 2px var(--input-border-color-hover);
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
          border-bottom: solid 2px var(--input-border-color-hover);
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

          background: url(${"/images/icon-errow-down.png"}) 95% center no-repeat !important;
        }

        :hover {
          border-bottom: solid 2px var(--input-border-color-hover);
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
            color: #fff;
            background-color: #292728;
            text-transform: uppercase;
            font-weight: 600;
            button {
              margin-left: 20px;
              border: 0px;
              padding: 5px 10px;
              transition: 0.3s;

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
          background: #b9cb96;
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
      padding: 10px 30px;
      border: 0px;
      font-weight: 600;

      &.adicionarBloqueado {
        transition: 0.3s;
        cursor: not-allowed;
      }
    }
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
    background-color: #cca8a8;
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
