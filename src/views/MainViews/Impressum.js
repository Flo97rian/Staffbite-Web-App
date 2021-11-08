/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"
import LandingFooter from "../../components/Footers/LandingFooter";

function Impressum () {
    return (
    <>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <section className="section" id={"sectionimpressum"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-left mb-4 mt-8">
                <Col md="8">
                  <div className="text-left">
                    <h1>Impressum</h1>
                    <p className="lead">
                      Name: Zellmann GbR.
                      <br/>
                      Anschift: Möllingstraße 8, 24103 Kiel
                      <br/>
                      Tel.:
                      <br/>
                      Vertreten durch: Florian Zellmann & Daniel Zellmann
                      <br/>
                      Umsatzsteuer-Indentifikationsnummer: Bitte einfügen
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionlaw"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-2" md="6">
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3>Rechtliches</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectiondatasecurity"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-2" md="6">
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3>Datenschutz</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Impressum;