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
import { Helmet } from "react-helmet";
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

function Pricing () {
    return (
    <>
        <Helmet>
          <title>Über uns</title>
          <meta name="description" content="Florian Zellmann. Daniel Zellmann."/>
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1> Über uns</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <img
                      alt="Abbildung der Gründer von Staffbite. Links steht Florian Zellmann. Rechts steht Daniel Zellmann."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={Team}
                      height="800px"
                      width="1000px"
                    />
                    <div className="pt-4 text-center">
                    <h5 className="title">
                      <Row>
                        <Col xs="6">
                          <h3 className="d-block mb-1">Florian Zellmann</h3>
                        </Col>
                        <Col xs="6">
                          <h3 className="d-block mb-1 ">Daniel Zellmann</h3>
                        </Col>
                      </Row>
                      </h5>
                    </div>
                    <Row className="mt-6">
                      <h2>Florian Zellmann</h2>
                      <p>
                      Florian Zellmann ist Mitgründer von Staffbite und verantwortlich für die technische Umsetzung. Er interessiert sich seit einigen Jahren für verschiedenste Aspekte der Softwareentwicklung. Neben einem breiten Wissen bezüglich künstlicher Intelligenz, Algorithmen und Datenverarbeitung liegt sein Schwerpunkt vor allem auf responsiven Programmiersprachen, um das Nutzererlebnis der Kunden stetig zu verbessern. Im Studium arbeitete Florian in der Gastronomiebranche und lernte die Herausforderungen der Betriebe selbst kennen.
                      </p>
                    </Row>
                    <Row className="mt-3">
                      <h2>Daniel Zellmann</h2>
                      <p>
                      Daniel Zellmann (M.A. Business Management) ist Mitgründer von Staffbite. Er ist verantwortlich für die operativen Geschäfte. Vor der Gründung von Staffbite arbeitete er mehrere Jahre als IT-Berater. Während der verschiedenen Kundenprojekte in ganz Deutschland sammelte er viel Erfahrung im Aufbau von skalierbaren Cloud-Infrastrukturen, Datenanalyse und der Automatisierung von Arbeitsabläufen. Sein Schwerpunkt liegt derzeit auf der kundenzentrierten Produktentwicklung. 
                      </p>
                    </Row>
                  </div>
                </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Pricing;