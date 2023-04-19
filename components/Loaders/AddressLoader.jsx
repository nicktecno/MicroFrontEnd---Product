import React from "react";
import ContentLoader from "react-content-loader";

const AddressLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={180}
    viewBox="0 0 400 180"
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    style={!props.noResponsive && { width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="350" height="180" />
  </ContentLoader>
);

export default AddressLoader;
