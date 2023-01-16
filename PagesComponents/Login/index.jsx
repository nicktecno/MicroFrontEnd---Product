import { useCart } from "../../Context/CartLengthContext";

import { useLang } from "../../Context/LangContext";

import { Context } from "../../Context/AuthContext";

import api from "../../services/api";
import LoginComponent from "./Login";
import { useContext } from "react";

const LoginPage = () => {
  const { lang, generalComponentsTranslation, setLang } = useLang();
  const { setCartLength } = useCart();
  const { validaLogin } = useContext(Context);

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  return (
    <LoginComponent
      mktName={mktName}
      api={api}
      validaLogin={validaLogin}
      generalComponentsTranslation={generalComponentsTranslation}
      lang={lang}
      setLang={setLang}
      setCartLength={setCartLength}
    />
  );
};

export default LoginPage;
