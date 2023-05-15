import React, { useContext, useEffect } from "react";
import dynamic from "next/dynamic";

const HeaderMicro = dynamic(() => import("layout/header"), { ssr: false });
const FooterMicro = dynamic(() => import("layout/footer"), { ssr: false });

import defaultLayout from "../../jover";

import GlobalStyles from "../../styles/globals";

import { useColorTheme } from "../../Context/ColorTheme";
import { useMenu } from "../../Context/Menu";
import { useLang } from "../../Context/LangContext";
import { useCart } from "../../Context/CartLengthContext";
import { useLocation } from "../../Context/Location";
import api from "../../services/api";
import { Context } from "../../Context/AuthContext";

const Layout = (props) => {
  const { openMenu, setOpenMenu, setMenuState, menuState } = useMenu();
  const { lang, generalComponentsTranslation, setLang } = useLang();
  const {
    localizacao,
    localizado,
    modal,
    setModal,
    setLocalizacao,
    setLocalizado,
    removeLocation,
    AtualizarModalPagina,
    setAtualizarModalPagina,
  } = useLocation();
  const { cartLength, setCartLength } = useCart();

  const { colorThemes, chooseMktOption, selectedMkt } = useColorTheme();
  const { validaLogin } = useContext(Context);

  const footerMktData = {
    nameComplete: "SeoZé",
    address: "Rua Irma Gabriela, 51 - Sl 224 Parte IV",
    postalCode: "Cep 04.571-130",
    cnpj: "10.331.096/0001-24",
    name: "Ricardo Eletro",
    email: "sac@ricardoeletro.com.br",
    facebook: "https://google.com",
    instagram: "https://google.com",
  };

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const envGeo = process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY;
  const envMsLocation = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;
  const logo = defaultLayout[0]["logo-img"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem(mktName)) {
        validaLogin(true);
      }
    }
  }, []);

  return (
    <>
      <GlobalStyles
        colors={
          process.env.NEXT_PUBLIC_REACT_APP_MMP_STATE === "true"
            ? selectedMkt
            : defaultLayout
        }
      />

      <HeaderMicro
        mktName={mktName}
        envGeo={envGeo}
        envMsLocation={envMsLocation}
        api={api}
        cartLength={cartLength}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        generalComponentsTranslation={generalComponentsTranslation}
        lang={lang}
        setLang={setLang}
        localizacao={localizacao}
        localizado={localizado}
        modal={modal}
        setModal={setModal}
        setLocalizacao={setLocalizacao}
        setLocalizado={setLocalizado}
        removeLocation={removeLocation}
        AtualizarModalPagina={AtualizarModalPagina}
        setAtualizarModalPagina={setAtualizarModalPagina}
        setCartLength={setCartLength}
        setMenuState={setMenuState}
        menuState={menuState}
        logo={logo}
      />
      <div className="contentFull">{props.children}</div>
      <FooterMicro
        mktName={mktName}
        cartLength={cartLength}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        colorThemes={colorThemes}
        chooseMktOption={chooseMktOption}
        selectedMkt={selectedMkt}
        generalComponentsTranslation={generalComponentsTranslation}
        lang={lang}
        setLang={setLang}
        footerMktData={footerMktData}
        api={api}
      />
    </>
  );
};

export default Layout;
