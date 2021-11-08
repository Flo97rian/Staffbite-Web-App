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
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-Beispiel.png"
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";

function Shiftplan () {
    return (
    <>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
      {/* Page content */}
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-8">
                        <h1> Unsere digitalen Schichtpläne</h1>
                    </Row>
                </Container>
      <section className="section" id={"sectioncreate"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    src={SchichtplanBeispiel}
                    style={{ width: "500px", height: "300px"}}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3>Einfach und schnell Schichtpläne erstellen</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                    <Link to="/" >Hier geht's zum Video</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionteam"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-1" md="6">
                  <img
                    alt="..."
                    src={SchichtplanBeispiel}
                    style={{ width: "500px", height: "300px"}}
                  />
                </Col>
                <Col className="order-md-2" md="6">
                  <div className="pr-md-5">
                    <h3>Verwalte dein Team mühelos</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                    <Link to="/" >Hier geht's zum Video</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionalg"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
              <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3>Automatisierte Befüllung deiner Schichtpläne</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                    <Link to="/" >Hier geht's zum Video</Link>
                  </div>
                </Col>
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    src={SchichtplanBeispiel}
                    style={{ width: "500px", height: "300px"}}
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionapp"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-1" md="6">
                  <img
                    alt="..."
                    src={SchichtplanBeispiel}
                    style={{ width: "500px", height: "300px"}}
                  />
                </Col>
                <Col className="order-md-2" md="6">
                  <div className="pr-md-5 mt-3">
                    <h3>Vorteile für dein Team</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. 
                    </p>
                    <Link to="/" >Hier geht's zum Video</Link>
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
export default Shiftplan;