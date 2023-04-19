import React from "react";
import ContentLoader from "react-content-loader";

const RectangleLoader = (props) => (
  <ContentLoader
    speed={2}
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width} ${props.height}`}
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    rtl={true}
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width={props.width} height={props.height} />
  </ContentLoader>
);

export default RectangleLoader;
