import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import wishListApi from "../../services/msWishList";

import { useLocation } from "../../Context/Location";
import { useCart } from "../../Context/CartLengthContext";
import { useMenu } from "../../Context/Menu";

import ProductComponent from "./Product";

const ProductPage = ({ data }) => {
  const { routeTranslations } = useLang();
  const { localizacao, setModal, localizado } = useLocation();
  const { setCartLength } = useCart();
  const { show, openWishList, setOpenWishList } = useMenu();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  return (
    <>
      <ProductComponent
        mktName={mktName}
        api={api}
        wishListMenuOpened={show}
        openWishList={openWishList}
        setOpenWishList={setOpenWishList}
        location={localizacao}
        setOpenLocationModal={setModal}
        located={localizado}
        wishListApi={wishListApi}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        ssrData={data}
      />
    </>
  );
};

export default ProductPage;
