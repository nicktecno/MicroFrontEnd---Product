import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { Truck } from "@styled-icons/boxicons-solid/Truck";
import { Store } from "@styled-icons/fa-solid/Store";
import { ErrorOutline } from "@styled-icons/material-outlined/ErrorOutline";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const ErrorIcon = styled(ErrorOutline)`
  height: 30px;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  margin: 0;
  align-self: center;
  color: var(--default-color);
`;

export const StoreIcon = styled(Store)`
  height: 30px;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const TruckIcon = styled(Truck)`
  height: 30px;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const buscando = styled.div`
  width: 100%;
  height: 65px;
  position: relative;

  h4 {
    font-size: 13px;
    color: black;
    padding-top: 40px;

    span {
      font-weight: bold;
    }
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ContainerNoLocation = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;

  button {
    border: 0px;
    background-color: var(--bt-purchase-color);
    padding: 15px;
    font-weight: bold;
    color: var(--bt-purchase-text-color);
    transition: 0.3s;

    :hover {
      background-color: var(--bt-purchase-color-hover);
    }
  }
`;

export const ofertas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;

  .container {
    max-width: 90%;
  }

  ${customMedia.lessThan("tablet")`
   margin-bottom:50px;
   .container {
    max-width: 100%;
    padding: 5px;
    border-radius: 2px;
  }
    `}
  .rowPrincipal {
    ${customMedia.lessThan("tablet")`
    width:100%;
    margin:0px;
    
    `}
    .colPrincipal {
      ${customMedia.lessThan("tablet")`
    max-width:100% !important;
    flex:1;
    margin:0px;
   
    
    `}
    }
  }

  .RowContainerEntrega {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    justify-content: center;
    margin-top: 40px;
    padding: 20px 0;
    div {
      font-size: 25px;
    }
    border-bottom: solid 2px black;
    ${customMedia.lessThan("tablet")`
     border-bottom: solid 2px black;
       margin-top: 10px;
    margin-bottom: 20px;
    div{
     margin-bottom: 7px;
    }
    `}
  }

  .RowContainer {
    margin: 30px 0px;
    ${customMedia.lessThan("tablet")`
    display:none;
    `}
  }

  .rowImagemDescricao {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
    width: 100%;

    ${customMedia.lessThan("tablet")`
    flex-direction: row;
    flex-wrap: nowrap;
    background: rgb(249, 249, 249);
    padding: 20px;
    box-shadow: rgb(134 133 133 / 16%) 3px 3px 61px, rgb(92 91 91 / 23%) 0px 0px 4px;
padding: 5px;
    img {
      max-height: 120px;
      max-width: 120px;
      height: auto;
      width: auto;
    }
    `}
  }

  .ColContainerLoja {
    font-weight: bold;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 25px;

    .containerSVG {
      width: 35px;
    }
  }

  .ColContainerDinheiro {
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 25px;
    justify-content: center;

    .containerSVG {
      width: 35px;
    }
  }

  .ColContainerLocation {
    font-weight: bold;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 25px;

    ${customMedia.lessThan("tablet")`
   padding-left: 20px;
    
    `}
    .containerSVG {
      width: 35px;
    }
  }

  .ColContainerCart {
    font-weight: bold;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 25px;

    .containerSVG {
      width: 35px;
    }
  }
`;
export const ContainerBoxOferta = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0px;
  margin-right: -15px;
  margin-left: -15px;

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

  .OtherOffersTitle {
    font-size: 20px;
    font-weight: bold;
    align-self: center;
    margin: 15px 0px 30px 0px;
  }

  .rowBoxOferta {
    width: 100%;
    margin: 0;

    .nomeValor {
      display: hidden;
    }

    .locationCarrinho {
      display: hidden;
    }
  }
`;

export const BoxOferta = styled.div`
  width: 100%;
  background-color: #f4f4f5;
  bottom: 30px;
  padding: 10px 0px;
  margin-bottom: 20px;

  .distanceMobile {
    display: none !important;
  }

  .textPriceMobile {
    display: none;
  }
  .shipContainerTitle {
    display: none;
  }
  ${customMedia.lessThan("tablet")`
   margin-bottom:50px;
   border-radius: 2px;
   padding: 8px 0px;
    .distanceMobile {
      justify-content: center !important;
      display: flex !important;
      p{
        font-weight: 400 !important;
        }
    }
    .sellerNameMobile{
          margin:2px 0px 5px 0px;
      justify-content: center !important;
    }
    .shipContainerTitle{
    display:block;
    font-weight:bold;
    margin-top: 7px;
    margin-left:10px;
    }
    h2{
    width:100%;
        display: flex;
    justify-content: center;
    }
    .offerPrice{
    text-align:center;
    }
    .textPriceMobile{
       text-align:center;
      display:block;
      font-size: 14px;
    }
    .distanceDesk{
      display: none !important;
    }
    `}
  ${customMedia.lessThan("410px")`

    .colContainerDados {
      padding:0;
    }
    
     `}
  .colContainerDados {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 30px;

    &.seller {
      padding-left: 50px;
    }

    ${customMedia.lessThan("1100px")`
    padding-left:10px;
      &.seller{
      padding-left: 30px;
    }
    `}

    ${customMedia.lessThan("tablet")`
      justify-content: unset;
      
      `}
  }

  a {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-bottom: 0px;
    transition: 0.3s;
    margin-left: 5px;

    :hover {
      text-decoration: underline;
    }
  }

  h2 {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-bottom: 0px;

    margin-left: 5px;
  }

  span {
    color: black;
    font-size: 14px;
    font-weight: initial;
    ${customMedia.lessThan("tablet")`
    padding-top:5px;
    font-size:20px;
    `}
  }

  img {
    margin-right: 5px;
  }

  p {
    margin-left: 5px;
    margin-bottom: 0px;
    font-weight: bold;
  }

  .colContainerBt {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${customMedia.lessThan("tablet")`
  .colContainerBt{
   display: flex;
   justify-content:end;
  
  }
  `}
`;

export const bt = styled.div`
  width: 100%;
  max-width: 230px;
  min-width: 94px;
  font-size: 14px;
  text-align: center;
  transition: 0.3s;
  padding: 10px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  line-height: 20px;
  cursor: pointer;

  ${customMedia.lessThan("tablet")`
  max-width: 210px;
  margin-top: 10px;
  boder-radius: 2px;
  `}

  ${customMedia.lessThan("mobile")`
      width: 100%;
    margin-top: 16px;
    font-size: 12px;
    padding: 10px 5px;
  `}
  ${customMedia.lessThan("375px")` 
  padding:8px 2px;
  `}
`;

export const product_title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  line-height: 25px;
  font-weight: bold;
  align-items: center;
  margin-left: 15px;
  justify-content: center;

  .variante {
    font-weight: 500;
  }

  ${customMedia.lessThan("tablet")`
   text-align:center;
    
   `}
`;

export const bt_info = styled.div`
  width: 100%;
  max-width: 400px;
  transition: 0.3s;
  align-self: center;

  font-size: 14px;
  text-align: center;
  // border-radius: 50px;
  margin-top: 25px;
  margin-bottom: 50px;
  padding: 20px;
  ${customMedia.lessThan("370px")` 

  padding: 15px 10px;
`}
  cursor: pointer;
`;

export const bt_success = styled.div`
  width: 100%;
  /* background-color: #ce171f; */
  border: solid 1px #237a1e;
  color: #237a1e;
  font-size: 14px;
  text-align: center;
  // border-radius: 50px;
  margin-top: 25px;
  margin-bottom: 50px;

  height: 47px;
  display: inline-block;
  line-height: 45px;
  ${customMedia.lessThan("tablet")`
        margin-top: 60px;
        font-size: 8px;
    `}
`;

export const alingLoader = styled.div`
  img {
    width: 34px !important;
    left: 0px !important;
  }
`;

export const ButtonVoltar = styled.div`
  width: 300px;
  margin-top: 30px;
  text-align: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;
  font-weight: 600;

  :hover {
    // background: #ccc;
  }
`;

export const shipment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  section {
    justify-content: start;
    display: flex;
    padding: 0px 2px;
    max-height: 50%;
    min-height: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
  }

  .mainContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 7px;
  }

  .otherShipment {
    button {
      color: #595959;
      font-size: 12px;
      text-align: right;
    }
  }

  p {
    font-size: 12px;
    margin: 0;
    color: #000;
    font-weight: 600;
  }

  button {
    min-width: 90px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    background-color: unset;
    box-shadow: unset;
  }

  ${customMedia.lessThan("notebook")`
  flex-direction: column;
    // height: 170px;
    p {
    font-size: 13px;
    margin: 1px;
  }

;`}

  ${customMedia.lessThan("tablet")`
  
.mainContainer {
  flex-direction: row;
     margin: 0px 0px 0px 10px;
  }

  flex-direction: column;

  section{
    padding:0;
    justify-content: start;
    height:45px;
    max-height: 100%;
    min-height: 100%;
     width:100%;
div{
justify-content: space-evenly;
  }

 p {
  font-weight: 400;
}
  `}
`;

export const noShipment = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 50px;
  align-items: center;

  img {
    max-width: 45px;
    max-height: 45px;
    margin-left: 15px;
    align-self: start;
  }

  ${customMedia.lessThan("tablet")` 
  border-top: solid 1px #000;
  border-bottom: solid 1px #000;
`}
  p {
    height: 20px;
  }
`;

export const locationButton = styled.button`
  border: none;
  color: #ce171f;
  background-color: unset;
  font-weight: 500;
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #ce171f;
  text-align: left;
  max-width: 200px;
  ${customMedia.lessThan("tablet")` 
  max-width: unset;
  margin: 0 15px;
`}
`;
