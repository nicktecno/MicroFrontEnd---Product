import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import { Context } from "../../Context/AuthContext";

import api from "../../services/api";
import { useContext } from "react";
import { useCart } from "../../Context/CartLengthContext";
import ProfileComponent from "./Profile";

const ProfilePage = () => {
  const { routeTranslations } = useLang();
  const { handleLogout } = useContext(Context);
  const { setCartLength } = useCart();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  return (
    <>
      <ProfileComponent
        mktName={mktName}
        api={api}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default ProfilePage;
