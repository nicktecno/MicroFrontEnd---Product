import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($url_key: String!, $id: Int!) {
    children(url_key: $url_key) {
      id
      name
      status
      images {
        path
      }
      attribute_group {
        name
        attributes {
          code
          admin_name
          swatch_type
          options_exist(parent_id: $id) {
            id
            code
            admin_name
            url_image
            swatch_value
          }
        }
      }
      attributes {
        id
        value
        text_value
        configurable
        attribute {
          code
          admin_name
          options {
            id
            code
            admin_name
            url_image
            swatch_value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_OTHER_OFFERS = gql`
  query GetProduct($url_key: String!) {
    children(url_key: $url_key) {
      id
      name
      images {
        path
      }
      attributes {
        id
        value
        text_value
        configurable
        attribute {
          code
          admin_name
          options {
            id
            code
            admin_name
            url_image
            swatch_value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_RELATED = gql`
  query ProductRelated($id: Int!) {
    related(id: $id) {
      product_id
      name
      url_key
      stamps {
        code
        value
        color
      }
      images {
        id
        path
      }
      offer(lat: "null", lng: "null") {
        price
        installment {
          installment_number
          installment_value
          interest_status
        }
        of_to_view
        promotional_price
        promotional_percentage
        marketplace_seller_id
        marketplace_seller {
          url
        }
      }
    }
  }
`;

export const GET_OTHER_OFFERS = gql`
  query GetOffers($lat: String, $lng: String, $id: Int!, $zipcode: String) {
    offers(lat: $lat, lng: $lng, productId: $id) {
      id
      sku_vendor
      price
      stock
      status
      marketplace_seller_id
      company_id
      distance
      of_to_view
      promotional_price
      promotional_percentage

      marketplace_seller {
        shop_title
        url
      }
    }
  }
`;

export const GET_OFFERS = gql`
  query GetOffers($lat: String, $lng: String, $id: Int!) {
    offers(lat: $lat, lng: $lng, productId: $id) {
      id
      sku_vendor
      price
      stock
      status
      marketplace_seller_id
      company_id
      distance

      of_to_view
      promotional_price
      promotional_percentage
      marketplace_seller {
        shop_title
        url
      }
    }
  }
`;

export const GET_OFFERS_SELLER = gql`
  query GetOffers($lat: String, $lng: String, $id: Int!, $sellerId: Int!) {
    offers(lat: $lat, lng: $lng, productId: $id, sellerId: $sellerId) {
      id
      sku_vendor
      price
      stock
      status
      marketplace_seller_id
      company_id
      distance
      of_to_view
      promotional_price
      promotional_percentage
      marketplace_seller {
        shop_title
        url
      }
    }
  }
`;

export const GET_PRODUCTID = gql`
  query GetProduct($url_key: String!) {
    children(url_key: $url_key) {
      parent {
        product_id
      }
    }
  }
`;

export const GET_VARIANTS = gql`
  query GetVariantes($id: Int!) {
    variants(id: $id) {
      id
      url_key

      attributes {
        value
        configurable
        attribute {
          admin_name
          code
        }
      }
    }
  }
`;

export const GET_PRODUCT_SELLER = gql`
  query GetProduct($url_key: String!, $id: Int!) {
    children(url_key: $url_key) {
      id
      name
      status
      images {
        path
      }
      attribute_group {
        name
        attributes {
          code
          admin_name
          swatch_type
          options_exist(parent_id: $id) {
            id
            code
            admin_name
            url_image
            swatch_value
          }
        }
      }
      attributes {
        id
        value
        text_value
        configurable
        attribute {
          code
          admin_name
          options {
            id
            code
            admin_name
            url_image
            swatch_value
          }
        }
      }
    }
  }
`;
