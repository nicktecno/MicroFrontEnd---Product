import "react-toastify/dist/ReactToastify.min.css";

import api from "../../services/api";
import apiUnlogged from "../../services/apiUnlogged";

import { useLocation } from "../../Context/Location";
import { useLang } from "../../Context/LangContext";

import OtherOffersComponent from "./OtherOffers";

const OtherOffersPage = ({ data }) => {
  const { routeTranslations } = useLang();
  const { localizacao, setModal, localizado, modal } = useLocation();

  const imageUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL;
  const locationOffer = process.env.NEXT_PUBLIC_REACT_APP_LOCATION_OFFER;

  return (
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
      locationOffer={locationOffer}
    />
  );
};

export default OtherOffersPage;
