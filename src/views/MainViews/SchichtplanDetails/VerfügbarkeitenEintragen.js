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
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  CardSubtitle,
  CardImg
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {VERFÜGBARKEITENEINTRAGEN_TITLE, VERFÜGBARKEITENEINTRAGEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamVerwalten from "../../../assets/img/theme/Team-verwalten.png"
import Possibilities from "../../../assets/img/themen/SchichtplanErstellen/Possibilities.png"
import SchichtplanBeispiel from "../../../assets/img/theme/Schichtplan-befüllen.png"
import ThemenSlider from "../Themen/ThemenSlider";


function VerfügbarkeitenEintragen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/verfuegbarkeiten-eintragen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{VERFÜGBARKEITENEINTRAGEN_TITLE}</title>
          <meta name="description" content={VERFÜGBARKEITENEINTRAGEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/verfuegbarkeiten-eintragen" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-4 pt-6">
                        <h1>Dein digitlaer Schichtplan - Eintragen</h1>
                    </Row>
      </Container>
                
      <Container className="pb-2 pt-6">
            <Row>
              <Col className="mt-4" xs="12" sm="6">
                <Row className="">
                  <Col>
                  <h2 class="display-4">Verfügbarkeiten eintragen</h2>
                  </Col>
                </Row>
                <p className="lead">
                <Row className="">
                  <Col>
                Jedes deiner Teammitglieder bekommt einen eigenen Zugang zu Staffbite. 
                Anschließend können sie per Smartphone, Tablet oder Laptop ihre Verfügbarkeiten eintragen.
                Auf diese Weise spart ihr euch einen Haufen WhatsApp-Nachrichten, Mails, Zettel und Stress.
                </Col>
                </Row>
                <Row className="mt-4 ">
                  <Col>
                      Übrigens: Wir arbeiten derzeit mit Hochdruck an einer kostenlosen iOS & Android-App für deine Mitarbeiter*innen.
                </Col>
                </Row>
                </p>
                </Col>
                <Col xs="12" sm="6">
                  <Row className="right">
                  <Card className="bg-transparent shadow-none">
                      <img
                    alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                    src={TeamVerwalten}
                    title="Team erstellen und verwalten"
                    height="100%"
                    width="100%"
                  />
                  </Card>
                  </Row>
                </Col>
                </Row>
                </Container>
                <Container>
                  <Row className="text-center">
                    <Col xs="12">
                      <Row className="text-center mt-8">
                        <Col>
                        <h2 className="display-4">In einen Schichtplan eintragen. So funktioniert's</h2>
                        </Col>
                      </Row>
                      <Row className="text-center">
                        <Col>
                          <CardSubtitle className="lead">Als Teil des Teams erhälst du einen Zugang für deinen Betrieb. Dort wählst du einen Schichtplan für die nächste oder kommende Woche aus. Anschließend wählst du einen Tag und eine Uhrzeit aus. Nun musst du nur noch auf "Eintragen" klicken.</CardSubtitle>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col xs="0"sm="2"></Col>
                        <Col xs="12"sm="8">
                        <Card className="bg-transparent shadow-none">
                        <img
                          alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                          src={TeamVerwalten}
                          title="Team erstellen und verwalten"
                          height="100%"
                          width="100%"
                        />    
                        </Card>
                        </Col>
                        <Col xs="0"sm="2"></Col>
                        
                      </Row>
                      <Row>
                        <Col>
                        <p className="lead">
                          Und schon ist deine Aufgabe erledigt! Warte nun bis der Schichtplan veröffentlicht wurde, um zu sehen, welche Schicht du erhalten hast.
                        </p>
                        </Col>
                      </Row>
                      
                    </Col>
                  </Row>
                </Container>
          <ThemenSlider></ThemenSlider>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VerfügbarkeitenEintragen;