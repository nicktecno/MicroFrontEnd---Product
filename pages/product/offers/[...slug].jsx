import OtherOffersPage from "../../../PagesComponents/OtherOffers";
import { initializeApollo } from "../../../services/apolloSsr";
import { GET_PRODUCT, GET_PRODUCTID } from "../../../services/Querys";

export default function OtherOffers({ data }) {
  return <OtherOffersPage data={data} />;
}

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  const apolloClient = initializeApollo();
  let dataProductWithoutId = "";
  let imagens = [];
  let product = {};
  let id = "";

  try {
    const { data: response } = await apolloClient.query({
      query: GET_PRODUCTID,
      variables: {
        url_key: slug[0],
      },
    });
    dataProductWithoutId = response;
    id = parseInt(dataProductWithoutId.children[0].parent[0].product_id);
  } catch (e) {
    console.log(e);
    return { redirect: { destination: "/404", permanent: false } };
  }

  if (id !== undefined) {
    const { data: dataProductWithId } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        url_key: slug[0],
        id,
      },
    });
    product = dataProductWithId.children[0];

    if (dataProductWithId.children[0].images) {
      dataProductWithId.children[0].images.map((imagem, index) => {
        imagens.push({
          original:
            process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL + "/" + imagem.path,
          thumbnail:
            process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL + "/" + imagem.path,
        });
      });
    } else {
      imagens = [];
    }
  }

  function showValue(produto, atributo, manual = false) {
    const value = produto.find((attr) => attr.attribute[0].code === atributo);

    if (!manual && atributo === "installation_manual") {
      return false;
    }

    if (value) {
      return value.text_value ? value.text_value : value.value;
    } else {
      return false;
    }
  }

  const title = `${process.env.NEXT_PUBLIC_REACT_APP_GENERAL_TITLE} -
  ${showValue(product.attributes, "meta_title")}`;
  const metaKeywords = showValue(product.attributes, "meta_keywords");
  const metaDescription = showValue(product.attributes, "meta_description");
  const metaKdt = `${process.env.NEXT_PUBLIC_REACT_APP_NAME} -
  ${showValue(product.attributes, "meta_title")}`;

  return {
    props: {
      seo: {
        title,
        metaDescription,
        metaKdt,
        metaKeywords,
      },
      data: {
        images: imagens,
        id,
        product,
      },
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
