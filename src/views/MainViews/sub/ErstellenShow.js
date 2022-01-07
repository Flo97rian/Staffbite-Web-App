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
                className="uebersicht-img"
                src={
                  require("../../../assets/img/landing/KeinPlan.png")
                    .default
                }
                height="900px"
                width="1200px"
              />
              <img
                alt="..."
                className="vorlageErstellen-img"
                src={require("../../../assets/img/landing/VorlageFenster.png").default}
                height="900px"
                width="1200px"
              />
              <img
                alt="..."
                className="vorlageKlick-img"
                src={
                  require("../../../assets/img/landing/KlickErstellen.png").default
                }
                height="900px"
                width="1200px"
              />
              <img
                alt="..."
                className="vorlagePlan-img"
                src={
                  require("../../../assets/img/landing/VorlagePlan.png")
                    .default
                }
                height="900px"
                width="1200px"
              />
            </div>
        </Row>
    </Container>
  );
}

export default ErstellenShow;
