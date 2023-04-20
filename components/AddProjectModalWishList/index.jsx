import React, { useState, useEffect, useRef } from "react";

import ImageUploading from "react-images-uploading";

import { ImageAdd } from "@styled-icons/boxicons-solid/ImageAdd";

import { Location } from "@styled-icons/fluentui-system-filled/Location";

import ReactInputMask from "react-input-mask";

import notification from "../../services/notification";

// Css do componente
import * as S from "./styles";

export function AddProjectModalWishList({
  getListWishList,
  setAddProjetoModal,
  addProjetoModal,
  terms,
  setModalTerms,
  modalEdicaoMobile,
  mktName,
  headerUrl,
  api,
  msLocation,
  wishListApi,
  setCartLength,
}) {
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [pais, setPais] = useState("");

  const [nomeLista, setNomeLista] = useState("");
  const [description, setDescription] = useState("");
  const [privacidade, setPrivacidade] = useState("");

  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAddList, setLoadingAddList] = useState(false);
  const [aceito, setAceito] = useState(false);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [optionalSubmit, setOptionalSubmit] = useState(false);

  const maxNumber = 1;

  async function handleWishList() {
    setSubmit(true);
    setLoadingAddList(true);
    if (
      nome === "" &&
      cep === "" &&
      endereco === "" &&
      complemento === "" &&
      bairro === "" &&
      numero === "" &&
      pais === "" &&
      estado === "" &&
      cidade === "" &&
      telefone === "" &&
      !aceito &&
      imagesUpload.length === 0
    ) {
      const dataWishList = new FormData();
      dataWishList.append("name", nomeLista);
      dataWishList.append("description", description);
      dataWishList.append("type", privacidade);

      try {
        const token = localStorage.getItem(mktName);
        if (token) {
          wishListApi.defaults.headers.Authorization = token;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);

          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await wishListApi.post(
          "/wish-list/customer/create",
          dataWishList,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );

        notification(response.message, "success");
        setDescription("");
        setPrivacidade("");
        setNome("");
        setNomeLista("");
        setCep("");
        setEndereco("");

        setNumero("");
        setComplemento("");
        setBairro("");
        setPais("");
        setEstado("");
        setCidade("");
        setTelefone("");
        setImagesUpload([]);
        setAceito(false);

        setAddProjetoModal("inativo");
        if (modalEdicaoMobile === "inativo") {
          document.body.style.overflow = "auto";
        }
        setLoadingAddList(false);
        getListWishList();
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoadingAddList(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          setLoadingAddList(false);
          notification(
            "Verifique se todos os campos estão preenchidos",
            "error"
          );
        }
      }
    } else if (
      nome === "" &&
      cep === "" &&
      endereco === "" &&
      numero === "" &&
      complemento === "" &&
      bairro === "" &&
      pais === "" &&
      estado === "" &&
      cidade === "" &&
      telefone === "" &&
      !aceito &&
      imagesUpload.length > 0
    ) {
      setOptionalSubmit(true);
      const dataWishList = new FormData();
      dataWishList.append("name", nomeLista);
      dataWishList.append("description", description);
      dataWishList.append("type", privacidade);
      dataWishList.append("cover", imagesUpload[0].file);

      try {
        const token = localStorage.getItem(mktName);
        if (token) {
          wishListApi.defaults.headers.Authorization = token;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);

          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await wishListApi.post(
          "/wish-list/customer/create",
          dataWishList,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        notification(response.message, "success");
        setDescription("");
        setPrivacidade("");
        setNome("");
        setNomeLista("");
        setCep("");
        setEndereco("");

        setNumero("");
        setComplemento("");
        setBairro("");
        setPais("");
        setEstado("");
        setCidade("");
        setTelefone("");
        setAceito(false);
        setImagesUpload([]);
        setAddProjetoModal("inativo");
        if (modalEdicaoMobile === "inativo") {
          document.body.style.overflow = "auto";
        }
        setLoadingAddList(false);
        getListWishList();
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoadingAddList(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          setLoadingAddList(false);
          notification(
            "Verifique se todos os campos estão preenchidos",
            "error"
          );
        }
      }
    } else if (imagesUpload.length === 0) {
      setOptionalSubmit(true);
      const numberModify =
        telefone !== ""
          ? "+55" +
            telefone
              .replace("(", "")
              .replace(")", "")
              .replace(" ", "")
              .replace("-", "")
          : "";
      const country = nome !== "" ? "BR" : "";

      const dataWishList = new FormData();
      dataWishList.append("name", nomeLista);
      dataWishList.append("description", description);
      dataWishList.append("type", privacidade);
      dataWishList.append("address[name]", nome);
      dataWishList.append("address[postcode]", cep.replace("-", ""));
      dataWishList.append("address[address]", endereco);
      dataWishList.append("address[number]", parseInt(numero, 10));
      dataWishList.append("address[complement]", complemento);
      dataWishList.append("address[neighborhood]", bairro);
      dataWishList.append("address[country]", country);
      dataWishList.append("address[state]", estado);
      dataWishList.append("address[city]", cidade);
      dataWishList.append("address[term_id]", aceito ? terms.data.id : "");
      dataWishList.append("address[accept]", aceito ? 1 : 0);
      dataWishList.append("address[phone]", numberModify);

      try {
        const token = localStorage.getItem(mktName);
        if (token) {
          wishListApi.defaults.headers.Authorization = token;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);

          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await wishListApi.post(
          "/wish-list/customer/create",
          dataWishList,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        notification(response.message, "success");
        setDescription("");
        setPrivacidade("");
        setNomeLista("");
        setNome("");
        setCep("");
        setEndereco("");

        setNumero("");
        setComplemento("");
        setBairro("");
        setPais("");
        setEstado("");
        setCidade("");
        setTelefone("");
        setAceito(false);
        setImagesUpload([]);
        setAddProjetoModal("inativo");
        if (modalEdicaoMobile === "inativo") {
          document.body.style.overflow = "auto";
        }
        setLoadingAddList(false);
        setOptionalSubmit(false);
        getListWishList();
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoadingAddList(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          setLoadingAddList(false);

          notification(
            "Verifique se todos os campos estão preenchidos",
            "error"
          );
        }
      }
    } else {
      const numberModify =
        telefone !== ""
          ? "+55" +
            telefone
              .replace("(", "")
              .replace(")", "")
              .replace(" ", "")
              .replace("-", "")
          : "";
      const country = nome !== "" ? "BR" : "";
      const dataWishList = new FormData();
      dataWishList.append("name", nomeLista);
      dataWishList.append("description", description);
      dataWishList.append("type", privacidade);
      dataWishList.append("cover", imagesUpload[0].file);
      dataWishList.append("address[name]", nome);
      dataWishList.append("address[postcode]", cep.replace("-", ""));
      dataWishList.append("address[address]", endereco);
      dataWishList.append("address[number]", parseInt(numero, 10));
      dataWishList.append("address[complement]", complemento);
      dataWishList.append("address[neighborhood]", bairro);
      dataWishList.append("address[country]", country);
      dataWishList.append("address[state]", estado);
      dataWishList.append("address[city]", cidade);
      dataWishList.append("address[term_id]", aceito ? terms.data.id : "");
      dataWishList.append("address[accept]", aceito ? 1 : 0);
      dataWishList.append("address[phone]", numberModify);

      try {
        const token = localStorage.getItem(mktName);
        if (token) {
          wishListApi.defaults.headers.Authorization = token;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await wishListApi.post(
          "/wish-list/customer/create",
          dataWishList,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        notification(response.message, "success");
        setDescription("");
        setPrivacidade("");
        setNomeLista("");
        setNome("");
        setCep("");
        setEndereco("");

        setNumero("");
        setComplemento("");
        setBairro("");
        setPais("");
        setEstado("");
        setCidade("");
        setTelefone("");
        setAceito(false);
        setImagesUpload([]);
        setAddProjetoModal("inativo");
        if (modalEdicaoMobile === "inativo") {
          document.body.style.overflow = "auto";
        }
        setLoadingAddList(false);
        getListWishList();
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoadingAddList(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          setLoadingAddList(false);
          notification(
            "Verifique se todos os campos estão preenchidos",
            "error"
          );
        }
      }
    }
  }

  async function getCep() {
    const dataCep = {
      zipcode: cep.replace("-", ""),
    };
    try {
      const { data: response } = await msLocation.post(
        "/location/cep/search",
        dataCep
      );

      if (response.message === "CEP inválido ou ausente") {
        notification(response.message, "error");
        return false;
      }

      setCidade(response.city);
      setPais("BR");
      setEstado(response.state);
      setBairro(response.neighborhood);
      setEndereco(response.address);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  const handleCadastrarLocalizacaoAtual = () => {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const { data: response } = await api.post(`${url}/location/geolocation`, {
        latitude: JSON.stringify(latitude),
        longitude: JSON.stringify(longitude),
      });
      setCep(response.zipcode);
      setBairro(response.neighborhood);
      setEstado(response.state);
      setCidade(response.city);
      setEndereco(response.address);
    });
    setLoading(false);
  };

  const onChangeImageUpload = (imageList, addUpdateIndex) => {
    // data for submit

    setImagesUpload(imageList);
  };

  function CancelarCriacaoLista() {
    setDescription("");
    setPrivacidade("");
    setNome("");
    setCep("");
    setEndereco("");

    setNumero("");
    setComplemento("");
    setBairro("");
    setPais("");
    setEstado("");
    setCidade("");
    setTelefone("");

    setAceito(false);
    setImagesUpload([]);
    setLoadingAddList(false);
  }

  return (
    <S.ModalWishList className={addProjetoModal}>
      <S.Transparente
        onClick={() => {
          CancelarCriacaoLista();
          if (modalEdicaoMobile === "inativo") {
            document.body.style.overflow = "auto";
          }
          setAddProjetoModal("inativo");
        }}
      />

      <S.centroAlertaWishList>
        <div className="modalTitle">
          <span className="title">Adicionar lista</span>
          <S.closeButton
            onClick={() => {
              CancelarCriacaoLista();
              if (modalEdicaoMobile === "inativo") {
                document.body.style.overflow = "auto";
              }
              setAddProjetoModal("inativo");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaLista">
          <div className="formCreate">
            <div className="containerInput">
              <input
                style={{
                  border:
                    submit && nomeLista.length === 0 && "2px solid #ce171f",
                }}
                type="text"
                placeholder="Digite o nome da lista"
                onChange={(event) => {
                  setNomeLista(event.target.value);
                }}
              />
            </div>

            <select
              className="selectMaiorMenor"
              style={{
                border:
                  submit && privacidade.length === 0 && "2px solid #ce171f",
              }}
              onChange={(event) => {
                setPrivacidade(event.target.value);
              }}
            >
              <option value="" hidden>
                Selecione o tipo de privacidade
              </option>
              <option value="private">Privado</option>
              <option value="public">Público</option>
            </select>
            <textarea
              style={{
                border:
                  submit && description.length === 0 && "2px solid #ce171f",
              }}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              rows="3"
              placeholder="Digite a descrição da lista"
              cols="40"
              maxLength="100"
            />
            <div className="dadosOpcionais">Dados Opcionais</div>
            <div className="containerImageUpload">
              <ImageUploading
                value={imagesUpload}
                onChange={onChangeImageUpload}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                resolutionWidth={520}
                resolutionHeight={240}
                resolutionType="less"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    {errors !== null &&
                      errors.resolution &&
                      notification(
                        "A imagem deve ter a resolução de 520x240",
                        "error"
                      )}
                    {imageList.length === 0 && (
                      <button
                        className="buttonAdicionarImagem negativeButton"
                        style={isDragging ? { color: "#086a68" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <div className="dadosImage">
                          Clique ou arraste sua imagem de 520x240
                        </div>
                        <div className="containerImage">
                          <ImageAdd />
                        </div>
                      </button>
                    )}

                    {imageList.map((image, index) => (
                      <div key={index} className="image-uploaded">
                        <div className="containerImageUploaded">
                          <img
                            src={image["data_url"]}
                            alt="imagem carregada"
                            width="150px;"
                          />
                        </div>

                        <div className="image-item__btn-wrapper">
                          <button
                            onClick={() => onImageUpdate(index)}
                            className="negativeButton"
                          >
                            Atualizar
                          </button>
                          <button
                            onClick={() => onImageRemove(index)}
                            className="negativeButton"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            {loading && (
              <img
                className="loading"
                src="/images/loadingIcon.svg"
                alt="Carregando"
              />
            )}
            {!loading && (
              <div
                onClick={() => handleCadastrarLocalizacaoAtual()}
                className="botaoLocalizacao positiveButton"
              >
                <Location />
                USAR LOCALIZAÇÃO ATUAL
              </div>
            )}

            <div className="containerInput">
              <ReactInputMask
                style={{
                  border:
                    optionalSubmit && cep.length === 0 && "2px solid #ce171f",
                }}
                onBlur={() => getCep()}
                placeholder="Digite o cep"
                type="text"
                mask="99999-999"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value);
                }}
              />
            </div>
            <div className="containerInput">
              <input
                type="text"
                maxLength="15"
                placeholder="Digite o apelido do endereço"
                style={{
                  border:
                    optionalSubmit && nome.length === 0 && "2px solid #ce171f",
                }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                style={{
                  border:
                    optionalSubmit &&
                    endereco.length === 0 &&
                    "2px solid #ce171f",
                }}
                type="text"
                maxLength="50"
                placeholder="Rua, Avenida, Etc"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                style={{
                  border:
                    optionalSubmit &&
                    numero.length === 0 &&
                    "2px solid #ce171f",
                }}
                maxLength="20"
                type="text"
                placeholder="Digite o Nº"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                style={{
                  border:
                    optionalSubmit &&
                    bairro.length === 0 &&
                    "2px solid #ce171f",
                }}
                maxLength="20"
                type="text"
                placeholder="Digite o Bairo"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                style={{
                  border:
                    optionalSubmit &&
                    cidade.length === 0 &&
                    "2px solid #ce171f",
                }}
                maxLength="20"
                type="text"
                placeholder="Digite a Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <input
                style={{
                  border:
                    optionalSubmit &&
                    estado.length === 0 &&
                    "2px solid #ce171f",
                }}
                maxLength="20"
                type="text"
                placeholder="Digite o Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>
            <div className="containerInput">
              <ReactInputMask
                style={{
                  border:
                    optionalSubmit &&
                    telefone.length === 0 &&
                    "2px solid #ce171f",
                }}
                mask="(99) 9999-99999"
                placeholder="Telefone/Celular"
                type="text"
                value={telefone.replace("+55", "")}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <S.termos
              style={{
                padding: "2px",
                border:
                  optionalSubmit && aceito === false && "2px solid #ce171f",
              }}
            >
              <input
                className="check-termos"
                type="checkbox"
                onClick={() => setAceito(aceito ? false : true)}
              />
              Eu aceito o&nbsp;
              <span>
                <div
                  className="termosEntrega"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setModalTerms("ativo");
                  }}
                >
                  {terms !== false && terms.data.title}
                </div>
              </span>
            </S.termos>
          </div>
        </div>

        <div className="modalFooter">
          <button
            onClick={() => {
              CancelarCriacaoLista();
              if (modalEdicaoMobile === "inativo") {
                document.body.style.overflow = "auto";
              }
              setAddProjetoModal("inativo");
            }}
            className="cancelar negativeButton"
          >
            CANCELAR
          </button>
          {loadingAddList ? (
            <img
              className="loading"
              src="/images/loadingIcon.svg"
              alt="Carregando"
            />
          ) : (
            <button
              className="adicionar positiveButton"
              onClick={handleWishList}
            >
              ADICIONAR
            </button>
          )}
        </div>
      </S.centroAlertaWishList>
    </S.ModalWishList>
  );
}
