import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function ErstellenShow() {
  return (
    <Container>
        <Row>
            <div className="image-container">
            <img
                alt="..."
                className="laptop-img"
                src={
                  require("../../../assets/img/landing/Landing_Tablet_empty.png")
                    .default
                }
                height="430px"
                width="645px"
              />
              <img
                alt="..."
                className="uebersicht-img"
                src={
                  require("../../../assets/img/landing/Landing_KeinPlan.png")
                    .default
                }
                height="323px"
                width="490px"
              />
              <img
                alt="..."
                className="vorlageErstellen-img"
                src={require("../../../assets/img/landing/Landing_VorlageFenster_Full.png").default}
                height="323px"
                width="490px"
              />
              <img
                alt="..."
                className="vorlagePlan-img"
                src={
                  require("../../../assets/img/landing/Landing_VorlagePlan_Details.png")
                    .default
                }
                height="323px"
                width="490px"
              />
            </div>
        </Row>
    </Container>
  );
}

export default ErstellenShow;
