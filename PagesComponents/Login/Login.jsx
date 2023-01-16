import React, { useState, useEffect } from "react";

import Link from "next/link";
import notification from "../../services/notification";

import * as S from "./style";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";

import { useRouter } from "next/router";

function LoginComponent({ setCartLength, validaLogin, mktName, api }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [pass, setPass] = useState(false);

  const [solicitacaoAndamento, setSolicitacao] = useState(false);
  const [passwordOculto, setPasswordOculto] = useState(true);

  const [loading, setLoading] = useState(false);
  const [oldUrl, setOldUrl] = useState("");
  const history = useRouter();

  useEffect(() => {
    document.body.style.overflow = "auto";
    if (localStorage.getItem(mktName)) {
      window.localStorage.removeItem(`${mktName}_username`);
    }

    if (sessionStorage.getItem("urlantiga")) {
      setOldUrl(sessionStorage.getItem("urlantiga"));
    }
  }, []);

  async function getUser() {
    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        return false;
      }

      const { data: response } = await api.get("/customer/get");

      localStorage.setItem(`${mktName}_username`, response.name);
      localStorage.setItem(`${mktName}_userId`, response.id);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const dataLogin = {
      email: email,
      password: senha,
    };

    try {
      const { data: response } = await api.post("/customer/login", dataLogin);

      if (
        response.message === "Logged in successfully." ||
        response.message === "Conectado com sucesso."
      ) {
        localStorage.setItem(mktName, response.token);

        if (sessionStorage.getItem("urlantiga")) {
          let antiga = sessionStorage.getItem("urlantiga");
          sessionStorage.removeItem("urlantiga");
          window.location.href = antiga;
        }

        const WishListProduct =
          JSON.parse(sessionStorage.getItem("productInfo")) || "";
        if (WishListProduct !== "") {
          history.push(`/product/${WishListProduct.urlKey}`);
          sessionStorage.removeItem("productInfo");
        } else {
          history.push("/profile");
        }
        getUser();
        validaLogin();

        if (sessionStorage.getItem("cart")) {
          let carrinhoAnonimo = JSON.parse(sessionStorage.getItem("cart"));

          carrinhoAnonimo.map((lojista) =>
            Object.values(lojista).map((product) =>
              product.map((p) =>
                addItem([
                  {
                    product: p.product,
                    quantity: p.quantity,
                    seller_info: {
                      seller_id: p.seller_info.seller_id,
                      offer: p.seller_info.offer,
                      store: p.seller_info.store,
                    },
                  },
                ])
              )
            )
          );

          sessionStorage.removeItem("cart");
        } else {
          const { data: responseCustomer } = await api.get(
            "/customer/checkout/cart"
          );
          if (responseCustomer.data !== null) {
            setCartLength(responseCustomer.data.items_qty);
          }
        }

        if (sessionStorage.getItem("urlantiga")) {
          let antiga = sessionStorage.getItem("urlantiga");
          sessionStorage.removeItem("urlantiga");
          window.location.href = antiga;
        } else {
          if (sessionStorage.getItem("credirect") == "1") {
            sessionStorage.removeItem("credirect");
            history.push("/cart");
          } else {
            const WishListProduct =
              JSON.parse(sessionStorage.getItem("productInfo")) || "";
            if (WishListProduct !== "") {
              history.push(`/product/${WishListProduct.urlKey}`);
              sessionStorage.removeItem("productInfo");
            } else {
              history.push("/profile");
            }
          }
        }
      } else {
        notification(response.message, "error");
      }
    } catch (err) {
      console.log(err);
      notification("Login ou senha inválidos", "error");
    }
  }

  async function addItem(item) {
    try {
      const response = await api.post("/customer/checkout/cart/add", item);

      if (response.data.message === "Products added to cart successfully.") {
        const { data: responseCustomer } = await api.get(
          "/customer/checkout/cart"
        );
        if (responseCustomer.data !== null) {
          setCartLength(responseCustomer.data.items_qty);
        }
      }
    } catch {}
  }

  async function addItem(item) {
    try {
      const response = await api.post("/customer/checkout/cart/add", item);

      if (response.data.message === "Products added to cart successfully.") {
        const { data: responseCustomer } = await api.get(
          "/customer/checkout/cart"
        );
        if (responseCustomer.data !== null) {
          setCartLength(responseCustomer.data.items_qty);
        }
      }
      history.push("/cart");
    } catch {}
  }

  async function handlePass() {
    setLoading(true);
    const dataLogin = {
      email: email,
    };

    setSolicitacao(false);

    try {
      const { data: response } = await api.post(
        "/customer/forgot-password",
        dataLogin
      );

      if (
        response.message ===
        "Caso o seu email exista em nosso banco de dados, um link será enviado para redefinição da senha."
      ) {
        notification(
          "Um link para redefinição de senha foi enviado para seu email",
          "info"
        );
        setSolicitacao(true);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
    }
  }

  const clearSessionStorageItens = () => {
    if (sessionStorage.getItem("urlantiga")) {
      sessionStorage.removeItem("urlantiga");
    }
    if (sessionStorage.getItem("productInfo")) {
      sessionStorage.removeItem("productInfo");
    }
  };
  return (
    <>
      <S.login className={!pass ? "" : "oculto"}>
        <S.texto>
          <h1>Login</h1>
          <p>
            Faça o login para consultar seus pedidos, gerenciar endereços e
            muito mais
          </p>
        </S.texto>

        <S.form>
          <form onSubmit={(e) => e.preventDefault}>
            <S.inputArea>
              <label>Seu E-mail</label>
              <input
                className="email"
                type="text"
                placeholder="Digite aqui"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && handleLogin(e);
                }}
              />
            </S.inputArea>
            <br />
            <S.inputArea>
              <label id="password">Senha</label>
              <div className="containerSenha">
                <input
                  className="inputSenha"
                  type={passwordOculto ? "password" : "text"}
                  placeholder="Digite aqui"
                  onChange={(e) => setSenha(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && handleLogin(e);
                  }}
                />

                <span onClick={() => setPasswordOculto(!passwordOculto)}>
                  {passwordOculto ? <EyeSlash /> : <Eye />}
                </span>
              </div>
            </S.inputArea>
            <br />
            <div className="forget-pass" onClick={() => setPass(true)}>
              Esqueceu sua senha?
            </div>

            <br />
            <div className="containerButton">
              <button
                className="voltar negativeButton"
                onClick={(e) => {
                  e.preventDefault();
                  clearSessionStorageItens();
                  oldUrl ? history.push(`${oldUrl}`) : history.push("/");
                }}
              >
                VOLTAR
              </button>
              <button
                className="login positiveButton"
                type="button"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
          </form>
        </S.form>
        <p id="registerLink">
          Não possui uma conta? <Link href="/register">Registre-se</Link>
        </p>
      </S.login>

      <S.solicitarSenha className={pass ? "" : "oculto"}>
        <S.texto>
          <h1>Solicitar nova senha</h1>
        </S.texto>

        <S.form>
          <form onSubmit={(e) => e.preventDefault}>
            <input
              className="email"
              type="text"
              placeholder="Seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <div className="containerButton">
              {solicitacaoAndamento ? (
                <div className="emailCheck">Confira seu email</div>
              ) : (
                <>
                  {loading && (
                    <img
                      className="loading"
                      src="/images/loadingIcon.svg"
                      alt="Carregando"
                    />
                  )}

                  <button
                    type="button"
                    className="voltar negativeButton"
                    onClick={() => setPass(false)}
                  >
                    VOLTAR PARA LOGIN
                  </button>
                  <br />
                  <br />
                  {!loading && (
                    <button
                      className="login positiveButton"
                      onClick={handlePass}
                    >
                      SOLICITAR SENHA
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </S.form>
      </S.solicitarSenha>
      <ToastContainer />
    </>
  );
}

export default LoginComponent;
