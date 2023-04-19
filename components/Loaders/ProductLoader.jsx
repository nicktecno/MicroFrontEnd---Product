import React from "react";
import ContentLoader from "react-content-loader";
import { Row, Col, Container } from "react-bootstrap";

const ProductLoader = (props) => (
  <Container>
    <Row>
      <Col xs={9} md={5}>
        <ContentLoader
          speed={2}
          width={400}
          maxheight={420}
          viewBox="0 0 400 420"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "400px",
            maxHeight: "420px",
          }}
        >
          <rect x="0" y="0" rx="0" ry="0" width="400" height="420" />
        </ContentLoader>
      </Col>

      <Col md={6} xs={10}>
        <div className="pl-md-5">
          <ContentLoader
            speed={2}
            width={296}
            height={62}
            viewBox="0 0 296 62"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{ width: "100%", maxWidth: "296px" }}
            {...props}
          >
            <rect x="0" y="23" rx="0" ry="0" width="296" height="17" />
            <rect x="0" y="50" rx="0" ry="0" width="242" height="12" />
          </ContentLoader>
          <br />
          <br />

          <div className="d-md-block d-flex justify-content-center align-items-center">
            <div>
              <div className=" d-flex ">
                <div className="mr-2">
                  <ContentLoader
                    speed={2}
                    width={51}
                    height={51}
                    viewBox="0 0 51 51"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: "100%", maxWidth: "51px" }}
                    {...props}
                  >
                    <rect x="0" y="13" rx="0" ry="0" width="51" height="51" />
                  </ContentLoader>
                </div>

                <div className="mr-2">
                  <ContentLoader
                    speed={2}
                    width={51}
                    height={51}
                    viewBox="0 0 51 51"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: "100%", maxWidth: "51px" }}
                    {...props}
                  >
                    <rect x="0" y="13" rx="0" ry="0" width="51" height="51" />
                  </ContentLoader>
                </div>

                <div className="mr-2">
                  <ContentLoader
                    speed={2}
                    width={51}
                    height={51}
                    viewBox="0 0 51 51"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: "100%", maxWidth: "51px" }}
                    {...props}
                  >
                    <rect x="0" y="13" rx="0" ry="0" width="51" height="51" />
                  </ContentLoader>
                </div>
              </div>
            </div>

            <div>
              <ContentLoader
                speed={2}
                width={140}
                height={66}
                viewBox="0 0 140 66"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ width: "100%", maxWidth: "140px" }}
                {...props}
              >
                <rect x="0" y="18" rx="2" ry="2" width="140" height="28" />
                <rect x="0" y="56" rx="2" ry="2" width="140" height="10" />
              </ContentLoader>
            </div>
          </div>

          <div className="mt-md-5 mt-4">
            <ContentLoader
              speed={2}
              width={293}
              height={60}
              viewBox="0 0 293 60"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              style={{ width: "100%", maxWidth: "293px" }}
              {...props}
            >
              <rect x="0" y="0" rx="32" ry="32" width="293" height="60" />
            </ContentLoader>
          </div>
        </div>
      </Col>

      <Col className="mt-5" xs={12}>
        <ContentLoader
          speed={2}
          width={340}
          height={84}
          viewBox="0 0 340 84"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%", maxWidth: "340px" }}
          {...props}
        >
          <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
          <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
          <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
          <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
          <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
          <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
          <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
          <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
        </ContentLoader>
      </Col>

      <Col className="mt-5">
        <ContentLoader
          speed={2}
          width={100}
          height={150}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%" }}
          {...props}
        >
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="100%" height="10" />
          <circle cx="10" cy="50" r="8" />
          <rect x="25" y="45" rx="5" ry="5" width="100%" height="10" />
          <circle cx="10" cy="80" r="8" />
          <rect x="25" y="75" rx="5" ry="5" width="100%" height="10" />
          <circle cx="10" cy="110" r="8" />
          <rect x="25" y="105" rx="5" ry="5" width="100%" height="10" />
        </ContentLoader>
      </Col>
    </Row>
  </Container>
);

export default ProductLoader;
