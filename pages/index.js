import dynamic from "next/dynamic";

import algoliasearch from "algoliasearch/lite";
import apiUnlogged from "../services/apiUnlogged";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_REACT_APP_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_REACT_APP_ALGOLIA_SEARCH_API_KEY
);

const DEFAULT_PROPS = {
  searchClient,
  indexName: process.env.NEXT_PUBLIC_REACT_APP_ALGOLIA_INDEX_SEARCH,
};

const HomeMicro = dynamic(() => import("homePage/home"), { ssr: false });

export default function Home(props) {
  return (
    <>
      <HomeMicro {...DEFAULT_PROPS} menu={props.menu} banners={props.banners} />
    </>
  );
}

export async function getStaticProps({ resolvedUrl }) {
  const { data: response } = await apiUnlogged.get("/descendant-categories");
  const { data: responsePromotions } = await apiUnlogged.get("/promotions");
  const { data: responseSellers } = await apiUnlogged.get(
    "/seller/public/home"
  );
  const menuFilter = response.data.filter((filtro) => filtro.name !== "Root");

  let banners = false;

  try {
    const { data: response } = await apiUnlogged.get("/banners");
    banners = response;
  } catch (e) {
    console.log(e);
  }
  const title = `${process.env.NEXT_PUBLIC_REACT_APP_GENERAL_TITLE} - ${process.env.NEXT_PUBLIC_REACT_APP_GENERAL_TITLE_COMPLEMENT}`;
  const metaKeywords = process.env.NEXT_PUBLIC_REACT_APP_GENERAL_KEYWORDS;
  const metaDescription = process.env.NEXT_PUBLIC_REACT_APP_GENERAL_DESCRIPTION;
  const metaKdt = `${process.env.NEXT_PUBLIC_REACT_APP_NAME} - Home`;

  return {
    props: {
      seo: {
        title,
        metaDescription,
        metaKdt,
        metaKeywords,
      },
      banners,
      menu: menuFilter,
      sellers: responseSellers[0],
      promotions: responsePromotions,
    },
    revalidate: 600,
  };
}
