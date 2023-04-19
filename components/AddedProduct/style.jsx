import styled from "styled-components";
import { CartCheckFill } from "@styled-icons/bootstrap/CartCheckFill";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  netbook: "830px",
  tablet: "768px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const CheckIcon = styled(CartCheckFill)`
  color: #fff;
  height: 54px;
  width: 54px;
  margin-bottom: 20px;
`;

export const CorrectIcon = styled(CheckCircleFill)`
  color: green;
  height: 54px;
  width: 54px;
  display: block;
  margin: 15px auto;
`;

export const TituloProduto = styled.h2`
  color: #000;
  font-weight: 700;
  margin: 0px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  line-height: 18px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export const Atributos = styled.h2`
  color: #292728;
  font-weight: 500;
  margin: 0px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
`;

export const CaixaProduto = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  align-items: center;
  max-width: 300px;
  font-weight: 300;
  margin-top: 10px;

  ${customMedia.lessThan("desktop")` 
    
    max-height: 500px;
    overflow:auto;

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

    
    `}

  strong {
    font-weight: 700;
  }

  img {
    max-width: 300px;
    max-height: 300px;
    width: auto;
    height: auto;
    margin: 15px auto;
    ${customMedia.lessThan("desktop")` 
     max-width: 100%;
    max-height: 200px;
    
    `}
  }

  .circulo {
    margin: initial;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .color {
      width: 20px;
      height: 20px;
      border-radius: 15px;
      border: 2px solid #ce171f;
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        display: none;
        svg {
          color: black;
        }
      }
    }

    &:hover,
    &.active {
      .color {
        span {
          display: initial;
        }
      }
    }

    &.Branco {
      .color {
        background-color: #fff;
        svg {
          color: #333;
        }
      }
    }

    &.Prata {
      .color {
        background-color: #bec2cb;
        svg {
          color: #fff;
        }
      }
    }

    &.Preto {
      .color {
        background-color: #000;
        svg {
          color: #fff;
        }
      }
    }
  }
`;

export const modal1 = styled.div`
  .inativo {
    display: none;
  }
  .ativo {
    display: block;
  }
`;
export const local = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
`;

export const Transparente = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    .no-support {
      display: none;
    }
  }
  margin-top: 90px;
  width: 100%;
  height: 1000vh;
  z-index: 0;
  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  ${customMedia.lessThan("notebook")`
           margin-top: 62px;
        `}
`;

export const AvisoText = styled.span`
  width: 100%;
  justify-content: center;
  display: flex;
  background: var(--default-color);
  color: var(--title-modal-color);
  font-weight: 700;
  font-size: 16px;
  margin: 0px;
  height: 50px;
  padding: 10px;
  align-items: center;

  ${customMedia.lessThan("335px")`
         
         height: 60px;
     
     `}
`;

export const ButtonCarrinho = styled.button`
  display: flex;
  border: 0px;
  padding: 10px 20px;
  margin-bottom: 10px;
  width: 250px;
  background-color: var(--bt-purchase-color) !important;
  color: var(--bt-purchase-text-color) !important;

  font-weight: 600;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  margin-right: 0px !important;
  :hover {
    background-color: var(--bt-purchase-color-hover) !important;
    color: var(--bt-purchase-text-color-hover) !important;
  }
`;

export const ButtonContinuar = styled.button`
  display: flex;
  border: 0px;
  padding: 10px 20px;
  width: 250px;
  text-align: center;

  font-weight: 600;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
`;
