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
                alt="Rahmen eines Tablets"
                className="laptop-img"
                src={
                  require("../../../assets/img/landing/Landing_Tablet_empty.png")
                    .default
                }
                title="Tabletrand"
                height="430px"
                width="645px"
              />
              <img
                alt="Abbildung einer Übersichtsseite für Schichtplanvorlagen"
                className="uebersicht-img"
                title="Schichtplanvorlage Übersicht"
                src={
                  require("../../../assets/img/landing/Landing_KeinPlan.png")
                    .default
                }
                height="323px"
                width="490px"
              />
              <img
                alt="Abbildung des Fensters, um eine Schichtplanvorlage zu erstellen"
                className="vorlageErstellen-img"
                title="Schichtplan Vorlage erstellen Fenter"
                src={require("../../../assets/img/landing/Landing_VorlageFenster_Full.png").default}
                height="323px"
                width="490px"
              />
              <img
                alt="Abbildung einer fertigen Schichtplanvorlage bei Staffbite"
                className="vorlagePlan-img"
                src={
                  require("../../../assets/img/landing/Landing_VorlagePlan_Details.png")
                    .default
                }
                title="Fertige Schichtplanvorlage"
                height="323px"
                width="490px"
              />
            </div>
        </Row>
    </Container>
  );
}

export default ErstellenShow;
