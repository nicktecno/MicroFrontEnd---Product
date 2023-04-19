import styled from "styled-components";

import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const tableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 0;
  justify-content: space-evenly;
  background-color: rgb(255, 255, 255);

  p {
    width: 100%;
    min-width: 150px;
    font-size: 15px;
    font-weight: 550;
    margin: 0;
  }

  table {
    width: 100%;
    padding: 0;
    height: 35px;
  }
  table tbody tr td {
    height: 38px;
    padding: 5px;
    font-size: 14px;
  }

  thead th {
    font-weight: 500;
    line-height: 1.2;
    font-size: 21px !important;
    padding-bottom: 15px;
  }

  table tr td:first-child {
    width: 30%;
  }
  table tr td:nth-child(2n) {
    text-align: start;
  }
  table tr:nth-child(2n + 1) td {
    background-color: #f4f4f5;
  }
`;

export const ContainerGeral = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0;
  flex-direction: column;
  background: #ffffff;

  ${customMedia.lessThan("notebook")`
      flex-direction: column;
      width:100%;

      &.descricao {
        width: 100%;
      }
  `}

  ${customMedia.lessThan("mobile")`
    margin-left: 10px;
      p{
        padding: 0;
        margin: 5px 0px;
      }
  `}

  img {
    max-width: 100%;
    width: auto;
    height: auto;
  }
  .accordion1 {
    display: flex;
    width: 100%;

    button {
      display: flex;
      padding: 10px 30px 10px 20px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 13px;
      background: #f4f4f5;
      color: #292728;
    }
  }
  .accordion2 {
    display: flex;
    width: 100%;

    button {
      display: flex;
      padding: 10px 30px 10px 20px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 13px;
      background: #f4f4f5;
    }
  }

  .ContainerItem {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  p {
    background: unset;
    padding: 10px;
    ${customMedia.lessThan("notebook")`
        margin-bottom:0px;
    `}
  }

  .collapse.show {
    background-color: #f4f4f5;
    ${customMedia.lessThan("notebook")`
        padding:0px;
        margin:0px;
    `};
  }
`;

export const arrowUp = styled(ChevronDown)`
  color: #292728;
  height: 24px;
  width: 24px;
  margin-right: 0;
  position: relative;
  float: right;
`;

export const closeUp = styled(Close)`
  color: #ce171f;
  height: 24px;
  width: 24px;
  margin-right: 0;
  position: relative;
  float: right;
`;

export const header = styled.div`
  margin: 30px 0;
  color: #241332;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const icons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  span {
    padding-left: 15px;
    position: relative;
    font-size: 16px;
  }
`;

export const dados = styled.div`
  margin: 15px 0;
  p {
    color: #acacac;
    font-size: 16px;
  }
  span {
    color: #000;
    font-size: 14px;
  }
`;

export const manual = styled.div`
  width: 200px;
  height: 40px;
  background-color: #ce171f;
  border-radius: 50px;
  text-align: center;
  color: #fff;
  padding-top: 11px;
  margin: 20px 0;
  font-weight: bold;
  font-size: 16px;

  a {
    color: #fff !important;
    text-decoration: none;
  }
`;

export const imageContainer = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;
