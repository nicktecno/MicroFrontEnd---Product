import { useQuery } from "@apollo/client";

// Template do site
import * as S from "./style";

import { useEffect } from "react";
import Link from "next/link";
import { GET_PRODUCT } from "../../services/Querys";

function AttributesSelectionModal({ produto, page, sellerId }) {
  const {
    data: productDataId,
    // eslint-disable-next-line no-unused-vars
    error: productIdError,
    // eslint-disable-next-line no-unused-vars
    loading: productIdLoading,
    refetch: refetchProduct,
  } = useQuery(GET_PRODUCT, {
    variables: {
      url_key: produto.valor.url_key,
      id: parseInt(produto.valor.id),
    },
  });
  useEffect(() => {}, [productDataId]);

  return (
    <>
      {productIdLoading && (
        <S.ContainerLoading>
          <img src="/images/loadingIcon.svg" alt="loading" />
        </S.ContainerLoading>
      )}
      {productDataId !== undefined && (
        <Link
          href={
            page !== "product"
              ? `${sellerId}/${produto.valor.url_key}`
              : produto.valor.url_key
          }
          passhref="true"
        >
          <S.ContainerGeral>
            <S.ContainerImage>
              <img
                src={
                  productDataId.children[0].images[0] &&
                  `${process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL}/${productDataId.children[0].images[0].path}`
                }
                alt={productDataId.children[0].name}
              />
            </S.ContainerImage>
            <S.ContainerDados>
              {productDataId.children[0].name}
            </S.ContainerDados>
          </S.ContainerGeral>
        </Link>
      )}
    </>
  );
}

export default AttributesSelectionModal;
