import styled from "styled-components";

import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const ImagePerfil = styled.div`
  img {
    width: 150px;
    margin-bottom: 20px;
  }
`;

export const login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 10vh;
  align-content: center;
  align-items: center !important;
  &.oculto {
    display: none;
  }

  #registerLink {
    font-size: 13px;
    color: #000;
    a {
      color: 000;
      font-weight: 500;
      :hover {
        color: var(--default-color);
      }
    }
  }

  ${customMedia.lessThan("tablet")`
            margin-bottom:0px;
        `}
`;

export const inputArea = styled.div`
  display: flex;
  flex-direction: column;
  label {
    text-align: left;
  }
  #password {
    padding-left: 5px;
  }
`;

export const novaSenha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 58vh;
  align-content: center;
  align-items: center !important;

  &.oculto {
    display: none;
  }
  .containerSenha {
    margin-left: -1px !important;
  }
  .login {
    width: 100%;
  }
  .voltar {
    width: 100%;
  }
`;

export const solicitarSenha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 58vh;
  align-content: center;
  align-items: center !important;
  &.oculto {
    display: none;
  }
  h1 {
    margin-bottom: 20px;
  }

  .containerButton {
    margin-top: 20px;

    .emailCheck {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  .email {
    margin-top: 15px;
  }

  .login {
    width: 100%;
    margin-bottom: -20px;
  }
  .voltar {
    width: 100%;
  }
`;

export const texto = styled.div`
  text-align: center;

  h1 {
    font-size: 30px;
    color: #000;
    font-weight: bold;
  }
  p {
    font-size: 12px;
    color: #292728;
    padding: 0 10px;
    margin: 27px 0px;
  }
`;

export const form = styled.div`
  text-align: center;

  form {
    margin-bottom: 40px;
  }

  .loading {
    align-self: center;
    width: 50px;
  }

  .forget-pass {
    cursor: pointer;
    font-size: 12px;
    margin-bottom: 30px;
    font-weight: bold;
    transition: 0.3s;

    :hover {
      color: var(--input-border-color);
    }
  }

  .containerSenha {
    width: 500px;
    margin-left: 5px;
    height: 40px;
    display: flex;
    background-color: unset;
    border-bottom: solid 3px var(--input-border-color);
    height: 45px;
    transition: 0.3s;
    :hover {
      border-bottom: solid 3px var(--input-border-color-hover);
    }
    span {
      display: flex;
      width: 30px;
      cursor: pointer;
      svg {
        transition: 0.3s;
        :hover {
          color: #292728;
        }
      }
    }
  }

  .inputSenha {
    width: 90%;

    height: 40px;
    padding-left: 10px;
    font-size: 14px;

    border: none;
    background-color: unset;
  }

  .email {
    height: 45px;
    width: 500px;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    border: none;
    background-color: unset;
    border-bottom: solid 3px var(--input-border-color);
    transition: 0.3s;
    :hover {
      border-bottom: solid 3px var(--input-border-color-hover);
    }
  }

  form button {
    border: none;
    font-size: 14px;
    font-weight: bold;
    width: 250px;
    height: 50px;
  }

  .containerButton {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }

  ${customMedia.lessThan("mobile")` 
	.containerSenha {
		width: 85vw;
	}
	.email {
		width: 85vw;

	}
	.containerButton {
		flex-direction: column-reverse;
		width: 85vw;
		align-items: center;
	}
	form button{
    width: 100%;
  }
	`}
`;
