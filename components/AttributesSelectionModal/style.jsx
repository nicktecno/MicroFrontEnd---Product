import styled from "styled-components";
import { generateMedia } from "styled-media-query";

// Refatorar esta merda de nomenclatura seguindo padrão de %
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

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  img {
    width: 50px;
  }
`;

export const ContainerGeral = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  border: 1px solid #868686;
  padding: 5px;
  transition: 0.3s;

  :hover {
    background: var(--default-color-hover);
  }
`;

export const ContainerImage = styled.div`
  width: 70px;
  height: 70px;
  margin-right: 20px;

  ${customMedia.lessThan("mobile")`
     
     margin-right: 10px;
    `}

  img {
    width: 70px;
    height: 70px;
  }
`;

export const ContainerDados = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${customMedia.lessThan("mobile")`
     
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
`;
