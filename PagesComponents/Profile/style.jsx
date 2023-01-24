import styled from "styled-components";

import { PlusCircle } from "@styled-icons/boxicons-solid/";
import { AlertCircle } from "@styled-icons/evaicons-solid/";
import { generateMedia } from "styled-media-query";
import { LeftArrow } from "@styled-icons/boxicons-solid/LeftArrow";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { BoxOpen } from "@styled-icons/fa-solid/BoxOpen";
import { EditLocation } from "styled-icons/boxicons-solid";
import { CreditCard } from "@styled-icons/fa-regular/CreditCard";
import { LogOut } from "@styled-icons/evaicons-solid/LogOut";
import { LibraryBooks } from "@styled-icons/material/LibraryBooks";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import { Building4 } from "@styled-icons/remix-fill/Building4";
import { UserLock } from "@styled-icons/fa-solid/UserLock";
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

export const UserImage = styled(UserCircle)`
  width: 120px;
  height: 120px;
  color: var(--default-color-icons);
`;

export const BuildingIcon = styled(Building4)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;

export const UserLockIcon = styled(UserLock)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;

export const BookIcon = styled(LibraryBooks)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;

export const EditIcon = styled(Edit)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;
export const PackageIcon = styled(BoxOpen)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;
export const LocationIcon = styled(EditLocation)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;

export const CreditCardIcon = styled(CreditCard)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
`;

export const LogOutIcon = styled(LogOut)`
  height: 30px;
  width: 30px;
  margin-right: 0px;
  color: var(--bt-negative-color-hover);
  transform: rotateY(180deg);
`;

export const LeftProfileCards = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightProfileCards = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileCard = styled.div`
  width: 395px;
  height: 70px;
  margin: 13px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  box-shadow: 0px 3px 6px #00000029;
  background-color: var(--profile-card-color);
  border-radius: 10px;

  :hover {
    cursor: pointer;
    background-color: var(--profile-card-color-hover);
    color: var(--font-color-hover);
  }

  ${customMedia.lessThan("430px")`
    width:300px;
  `}

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    font-size: 18px;
    text-align: center;
    width: 250px;
    font-weight: 600;
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 50px;
  }
`;

export const LogOutButton = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 100px;
  font-size: 16px;
  font-weight: bold;
  width: 250px;
  height: 40px;
  cursor: pointer;
  p {
    margin: 0 20px 0 0;
    color: var(--bt-negative-color-hover);
  }

  ${customMedia.lessThan("notebook")`
    margin-top: 0;
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 50px;
  img {
    margin-top: 60px;
    width: 120px;
    border-radius: 50px;
    object-fit: cover;

    ${customMedia.lessThan("desktop")`
    margin-top:45px;
  `}
  }

  ${customMedia.lessThan("tablet")`
            margin-bottom:279px;
        `}
`;

export const UserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${customMedia.lessThan("notebook")`
            flex-direction:column;
        `}
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 30px;
    font-weight: 700;
    color: var(--font-color);
    margin-top: 15px;
  }
  p {
    font-size: 16px;
    font-weight: 500;
  }

  ${customMedia.lessThan("notebook")`
          align-items:center;
          text-align:center;
          line-height:25px;
        `}
`;

export const ProfileCardsContainer = styled.div`
  margin: 40px 20px 60px 20px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 700;

  ${customMedia.lessThan("notebook")`
  
  flex-direction: column;
  `}
`;

export const BackArrow = styled(LeftArrow)`
  height: 16px;
  width: 16px;
  margin-bottom: 4px;
  color: #292728;
`;

export const boxCartao = styled.div`
  background-color: #f4f4f5;
  display: flex;
  align-items: center;
  max-width: 500px;
  width: 100%;

  justify-content: space-between;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.31);
  box-shadow: 0px 1px 3px 3px rgb(0 0 0 / 11%);
  margin-bottom: 20px;

  ${customMedia.lessThan("mobile")`
  width:90%;
    
  `}

  .creditImg {
    margin-right: 20px;
    ${customMedia.lessThan("mobile")`
  margin-right:10px;
    
  `}
    svg {
      width: 37px;
    }
  }
`;

export const cartaoTitle = styled.h2`
  font-size: 21px;
  font-weight: bold;
  width: 150px;

  margin: 0px;
  padding: 0px 10px;
  color: #191919;
`;

export const cartaoNumber = styled.h4`
  font-size: 14px;
  margin: 10px 20px 10px 5px;
  padding: 0px;
`;

export const cadastrarCartao = styled.a`
  background-color: #2d9b01;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  display: block;
  padding: 10px 15px;
  border: 1px solid #2d9b01;
  margin: 5px 0px;
  text-align: center;
  position: fixed;
  bottom: 100px;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 99;
  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.9;
  }
`;

export const pagamentos = styled.div`
  min-height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${customMedia.lessThan("tablet")`
     margin-bottom: 150px;

  `}
  ${customMedia.lessThan("irico")`
     margin-bottom: 160px;

  `}
`;

export const ContainerDados = styled.div`
  width: 100%;
  min-height: 600px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerCards = styled.div`
  display: flex !important;
  gap: 15px;
  flex-direction: row;
  ${customMedia.lessThan("notebook")`
   display: none !important;
`}
`;

export const SmallerCardContainer = styled.div`
  display: none !important;
  ${customMedia.lessThan("notebook")`
   display: flex !important;
   align-items: center;
   justify-self: center;
     flex-direction: column;
    width: 100%;
   height: 100%;
`}
`;

export const editarCartao = styled.a`
  background-color: #beb1b8;
  border-radius: 20px;
  text-decoration: uppercase;
  color: #fff;
  font-size: 12px;
  display: block;
  padding: 5px 15px;
  border: 1px solid #beb1b8;
  margin: 5px 0px;
  text-align: center;

  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.9;
  }
`;

export const deletarCartao = styled.a`
  text-decoration: uppercase;
  color: #ffffff;
  font-size: 12px;
  display: block;
  padding: 5px 10px;

  margin: 5px 0px;
  text-align: center;

  img {
    color: #292728;
    height: 30px;
    width: 30px;
    margin-right: 0px;

    cursor: pointer;
    transition: 0.3s;

    ${customMedia.lessThan("tablet")`
  margin-left:0px;
  `}

    ${customMedia.lessThan("465px")`
  width:45px;
  height:45px;
  margin-left:20px;
  
  `}


${customMedia.lessThan("ipobre")`
margin-left:0px;

`}

${customMedia.lessThan("pobre")`
height: 35px;
  width: 35px;

`}
  }

  ${customMedia.lessThan("tablet")`
    display:none;
  `}
  &:hover {
    /* color: #b9cb96ab; */
  }
`;

export const alertaDeletar = styled.div`
  background-color: #ce171f;
  width: 100%;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
  display: none;
  padding: 15px;

  &.ativo {
    display: table;
  }
`;

export const centroAlerta = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #fff;

  p {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const addIcon = styled(PlusCircle)`
  color: #fff;
  height: 24px;
  width: 24px;
  display: inline-block;
  margin: 0px 5px;
  cursor: pointer;
`;

export const alertIcon = styled(AlertCircle)`
  color: #fff;
  height: 128px;
  width: 128px;
  display: inline-block;
  margin: 0px 5px 20px;
  cursor: pointer;
`;

export const ContainerBotoes = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  ${customMedia.lessThan("mobile")`
  width:100%;
flex-direction:column-reverse;
    
  `}

  .botaoVoltar {
    background-color: #292728;
    color: #ffffff;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    width: 240px;
    ${customMedia.lessThan("mobile")`
   
width:80%;
    
  `}

    padding: 10px 50px 10px 50px;

    cursor: pointer;
    transition: 0.3s;

    :hover {
      /* background: #cca8a8; */
    }
  }

  .botaoAdicionar {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    width: 240px;
    padding: 10px 50px 10px 50px;
    background: #dbc79a;
    cursor: pointer;
    transition: 0.3s;

    ${customMedia.lessThan("mobile")`
   
   width:80%;
       
     `}

    :hover {
      background: #cca8a8;
    }
  }
`;
export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const ModalAtualizarAdicionar = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000006c;
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
    color: #ffffff;
  }

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:80vh;
    position:fixed;
    margin-top:90px;
    
  `}

  @media (min-height: 900px) and  (max-height: 1024px) {
    height: 100vh;
  }
`;

export const centroAdicionarCartao = styled.div`
  display: flex;
  width: 700px;
  height: 400px;
  background: #ffffff;
  text-align: center;
  color: #292728;
  flex-direction: column;
  position: absolute;
  z-index: 99999;

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:100%;
    overflow:auto;
    
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #cccccc;
      transition: 0.3s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #cccccc;
    }
    
  `}

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: #dbc79a;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .title {
    width: 100%;
    padding: 40px;
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
  .botaoLocalizacao {
    width: 100%;
    padding: 10px 50px 10px 50px;
    background: #dbc79a;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      margin-right: 5px;
    }

    :hover {
      background: #cca8a8;
    }
  }

  .containerDuplo {
    display: flex;
    width: 100%;

    align-items: center;
    gap: 3%;
    ${customMedia.lessThan("tablet")`
    
  
    flex-direction:column;
  `}
  }

  input {
    height: 45px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    border: none;
    background-color: #f4f4f5;
    /* border-bottom: solid 1px #dddddd; */
    transition: 0.3s;
  }

  input::placeholder {
    font-size: 12px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${customMedia.lessThan("tablet")`
       padding: 40px;
       padding-top:10px;
       margin-bottom:20px;
  
    flex-direction:column-reverse;
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #292728;
      color: #ffffff;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;

      ${customMedia.lessThan("tablet")`
   width:100%;
  `}

      :hover {
        /* background: #b9cb96; */
      }
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
      ${customMedia.lessThan("tablet")`
   width:100%;
   `}

      :hover {
        background: #cca8a8;
      }
    }
  }
`;

export const centroAlertaDeletar = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  background: #ffffff;
  text-align: center;
  color: #292728;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("tablet")`
    width:300px;
    height:450px;
    
    
  `}

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: #dbc79a;
    align-items: center;
    justify-content: center;

    ${customMedia.lessThan("tablet")`
    padding:20px;
    
  `}
  }

  .title {
    width: 100%;
    padding: 40px;
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;

    ${customMedia.lessThan("tablet")`
    font-size: 18px;
    
  `}
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${customMedia.lessThan("tablet")`
    flex-direction:column;
    
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #292728;
      color: #ffffff;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        /* background: #b9cb96; */
      }
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background: #cca8a8;
      }
    }
  }
`;
export const ModalDeletar = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000006c;
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
    color: #ffffff;
  }
`;

export const ContainerSemCartao = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .botoesSemCartao {
    width: 80%;
  }
`;
