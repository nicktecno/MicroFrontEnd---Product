import OtherOffersPage from "../../../PagesComponents/OtherOffers";
import { initializeApollo } from "../../../services/apolloSsr";
import { GET_PRODUCT } from "../../../services/Querys";

export default function OtherOffers({ data }) {
  return <OtherOffersPage data={data} />;
}

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  const apolloClient = initializeApollo();

  let imagens = [];
  let product = {};
  let id = parseInt(slug[1]);

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
      // eslint-disable-next-line array-callback-return
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
        product,
      },
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
