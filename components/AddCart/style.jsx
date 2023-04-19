import { generateMedia } from "styled-media-query";
import styled from "styled-components";
import { Cart } from "@styled-icons/ionicons-sharp/Cart";

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
export const CartIcon = styled(Cart)`
  height: 25px;
  width: 25px;
  min-width: 25px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;
export const box = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;

  ${customMedia.lessThan("tablet")`
  background:white;
      width: 100%;
      max-width: 100%;
      margin-top: 0px;
      margin-bottom: 0px;
      height: 80px;
      
      display: flex;
      left:0%;
      position: fixed;
      bottom: 80px;
      z-index: 999;

    `}

  .rowGeral {
    display: flex;
    width: 100%;
    margin: 0px;
    justify-content: flex-end;
    ${customMedia.lessThan("tablet")`
  justify-content:center;

    `}

    .containerFunctions {
      display: flex;
      margin-bottom: 10px;
      justify-content: flex-start;
      ${customMedia.lessThan("notebook")`

width:330px;  

    `}
      ${customMedia.lessThan("tablet")`

width:50%;
justify-content:space-between;  

    `}
    }
    ${customMedia.lessThan("470px")`
 justify-content:space-between;
 
 `}
  }
  .colquantidade {
    display: flex;
    justify-content: flex-start;

    p {
      justify-content: flex-start;
    }

    ${customMedia.lessThan("desktop")`
    
   padding:0px;
    `}

    ${customMedia.lessThan("tablet")`
    
  display:flex;
  justify-content:center;
  
  align-items:center;
 width:45%;
  flex:none;
  
  `}

    ${customMedia.lessThan("470px")`

   
  `}
  }

  .colquantidadeunlogged {
    display: flex;
    justify-content: flex-start;
    ${customMedia.lessThan("tablet")`
    
  display:flex;
  justify-content:center;
  width:50%;
  align-items:center;
  max-width:50%;
  flex:none;
  
  `}

    ${customMedia.lessThan("470px")`
    
    
    width:20%;
    
    max-width:20%;
    
    
    `}
  }
  .colWishList {
    display: flex;
    align-items: center;

    &.desktop {
      ${customMedia.lessThan("tablet")`
  display:none;
  
`}
    }
    &.mobile {
      ${customMedia.greaterThan("tablet")`
  display:none;
  
`}
    }

    ${customMedia.lessThan("notebook")`
    
    flex:1;
    justify-content:flex-end;
    
    
    `}

    ${customMedia.lessThan("tablet")`
    
    display:flex;
    justify-content:flex-start;
    width:37%;
    max-width:37%;
    align-items:center;
    flex:none;
    
    
    `}

    ${customMedia.lessThan("470px")`
    
    
    width:28%;
    
    max-width:28%;
    margin-right:30px;
    
    `}
  }

  .colbuttonunlogged {
    display: flex;

    justify-content: flex-end;
    ${customMedia.lessThan("tablet")`
justify-content:center;
align-items:center;
width: 50%;
max-width:50%;

`}
    ${customMedia.lessThan("irico")`
justify-content:center;
`}
  }

  .colButton {
    display: flex;
    padding: 0px;
    justify-content: flex-end;
    ${customMedia.lessThan("tablet")`
    justify-content:flex-end;
    align-items:center;
    width: 35%;
    max-width:35%;
    
    `}
    ${customMedia.lessThan("470px")`
   width:45%;
   max-width:45%;
   justify-content:flex-start;
    
  `}
  }

  .generalButton {
    padding: 13px 67px;
    background-color: var(--bt-purchase-color) !important;
    color: var(--bt-purchase-text-color) !important;
    border-radius: 2px;
    border: 0px;
    height: 100%;

    transition: 0.3s;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    :hover {
      background-color: var(--bt-purchase-color-hover) !important;
      color: var(--bt-purchase-text-color-hover) !important;
    }

    ${customMedia.lessThan("desktop")`
    padding:11px 49px;
  `}
    ${customMedia.lessThan("notebook")`
    padding:12px 109px;
  `}
${customMedia.lessThan("tablet")`{
     width:200px ;
    height:50px;
    margin-left:10px;
    padding:15px 10px;
  `}

${customMedia.lessThan("470px")`
   margin-left:0px;
    width:95%;
    font-size:12px;
  `}
  }
`;
export const bt = styled.div`
  width: 200px;
  height: 45px;

  margin: 0 auto;
  padding-top: 13px;

  h3 {
    font-size: 14px;
    text-align: center;
  }

  ${customMedia.lessThan("tablet")`
    width: 180px;
  `}
`;

export const WishList = styled.div`
  display: flex;
  width: 40px;
  cursor: pointer;
  justify-content: flex-end;
  align-items: flex-end;
  transition: 0.3s;

  :hover {
    color: var(--default-color);
  }

  ${customMedia.lessThan("tablet")`
  
    margin-left:10px;
  
  
`}
  ${customMedia.lessThan("470px")`
  margin-left:10px;
  width:25px;
  
  
`}

  svg {
    width: 30px;
  }
`;

export const quantidade = styled.div`
  width: 165px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 14px;
  position: relative;

  ${customMedia.lessThan("desktop")`
  
  width:130px;
      
  `}

  ${customMedia.lessThan("tablet")`
  display:flex;
  flex-direction:column;
   justify-content:center;
   align-items:center;
   height:100%;
  width:150px;
      
  `}
  ${customMedia.lessThan("470px")`
  margin-left:0px;
      
  `}
  ${customMedia.lessThan("420px")`

      
  `}

  
  h5 {
    font-size: 13px;
    font-weight: 600;
  }

  p {
    font-weight: 600;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .buttonQuantity {
    font-size: 20px;
    border-radius: 2px;
    font-weight: 500;
    justify-content: center;
    width: 25px;
    height: 25px;
    border: 0px;
    align-items: center;

    display: flex;

    cursor: pointer;
    transition: 0.3s;
    ${customMedia.lessThan("470px")`
  width: 25px;
    height: 25px;
    font-size:20px;
      
  `}
  }

  span {
    margin-left: 30px;
    margin-right: 30px;

    ${customMedia.lessThan("500px")`
    margin-left: 15px;
    margin-right: 15px;

`}
  }
`;
