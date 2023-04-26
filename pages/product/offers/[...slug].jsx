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

  return {
    props: {
      data: {
        images: imagens,
        product,
      },
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
