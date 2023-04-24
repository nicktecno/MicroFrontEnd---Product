import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import wishListApi from "../../services/msWishList";
import msLocation from "../../services/msLocation";

import { useLocation } from "../../Context/Location";
import { useCart } from "../../Context/CartLengthContext";
import { useMenu } from "../../Context/Menu";

import ProductComponent from "./Product";
import Head from "next/head";

const ProductPage = ({ data }) => {
  const { routeTranslations } = useLang();
  const { localizacao, setModal, localizado } = useLocation();
  const { setCartLength } = useCart();
  const { show, openWishList, setOpenWishList } = useMenu();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const imageUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL;
  const appTitle = process.env.NEXT_PUBLIC_REACT_APP_TITLE;
  const headerUrl = process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL;
  const appUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
  const msLocationEnv = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;

  function showValue(produto, atributo) {
    const value = produto?.find((attr) => attr.attribute[0].code === atributo);

    if (value) {
      return value.text_value ? value.text_value : value.value;
    } else {
      return false;
    }
  }

  return (
    <>
      <Head>
        <title>
          {appTitle} - {showValue(data?.product?.attributes, "name")}
        </title>
        <meta
          name="description"
          content={showValue(data?.product?.attributes, "meta_description")}
        />
        <meta
          name="keywords"
          content={showValue(data?.product?.attributes, "meta_keywords")}
        />
      </Head>
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
        imageUrl={imageUrl}
        headerUrl={headerUrl}
        appUrl={appUrl}
        msLocation={msLocation}
        msLocationEnv={msLocationEnv}
      />
    </>
  );
};

export default ProductPage;
