import ProductPage from "../../PagesComponents/Product";

import { initializeApollo } from "../../services/apolloSsr";
import {
  GET_PRODUCT,
  GET_PRODUCTID,
  GET_PRODUCT_SELLER,
} from "../../services/Querys";

export default function Product({ data }) {
  return <ProductPage data={data} />;
}

export async function getServerSideProps({ params, resolvedUrl }) {
  const { slug } = params;

  const apolloClient = initializeApollo();
  let dataProductWithoutId = "";
  let imagens = [];
  let product = {};
  let id = "";

  const filterRoute = resolvedUrl.includes("/sellerproduct")
    ? { seller_id: parseInt(slug[0]), url_key: slug[1] }
    : { url_key: slug[0] };

  const filterQuery = resolvedUrl.includes("/sellerproduct")
    ? GET_PRODUCT_SELLER
    : GET_PRODUCT;

  try {
    const { data: response } = await apolloClient.query({
      query: GET_PRODUCTID,
      variables: filterRoute,
    });
    dataProductWithoutId = response;
    id = parseInt(dataProductWithoutId.children[0].parent[0].product_id);
  } catch (e) {
    console.log(e);
    return { redirect: { destination: "/404", permanent: false } };
  }

  if (id !== undefined) {
    const { data: dataProductWithId } = await apolloClient.query({
      query: filterQuery,
      variables: { ...filterRoute, id },
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

  return {
    props: {
      data: {
        images: imagens,
        id,
        product,
        resolvedUrl,
      },
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
