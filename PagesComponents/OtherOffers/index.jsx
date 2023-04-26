import "react-toastify/dist/ReactToastify.min.css";

import api from "../../services/api";
import apiUnlogged from "../../services/apiUnlogged";

import { useLocation } from "../../Context/Location";
import { useLang } from "../../Context/LangContext";

import OtherOffersComponent from "./OtherOffers";
import Head from "next/head";

const OtherOffersPage = ({ data }) => {
  const { routeTranslations } = useLang();
  const { localizacao, setModal, localizado, modal } = useLocation();

  const imageUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL;
  const appTitle = process.env.NEXT_PUBLIC_REACT_APP_TITLE;

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
      <OtherOffersComponent
        ssrData={data}
        imageUrl={imageUrl}
        api={api}
        apiUnlogged={apiUnlogged}
        location={localizacao}
        setOpenLocationModal={setModal}
        locationModal={modal}
        located={localizado}
        routeTranslations={routeTranslations}
      />
    </>
  );
};

export default OtherOffersPage;
