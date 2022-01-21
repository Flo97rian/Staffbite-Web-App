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
  CardImg,
  CardText,
  CardSubtitle,
  CardTitle
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {ERSTEANMELDUNG_TITLE, ERSTEANMELDUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import VorlageThumbnail from "../../../assets/img/themen/SchichtplanVorlage/SchichtplanVorlageThumbnail.png"
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"


function ErsteAnmeldung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/erste-anmeldung";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{ERSTEANMELDUNG_TITLE}</title>
          <meta name="description" content={ERSTEANMELDUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/erste-anmeldung" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-4">
                        <h1>Die erste Anmeldung</h1>
                    </Row>
      </Container>
                
            <Container className="pb-2"fluid>
                <Row className="text-center">
                <Col>
                <p className="lead">
                  Wir freuen uns, dass du dich für Staffbite interessierst.
                  <br/>
                  Um dir den Einstieg so leicht wie möglich zu machen, haben wir ein Video vorbereitet.
                  <br/>
                  In diesem Video zeige ich dir die ersten Schritte mit unserer Lösung.
                </p>
                </Col>
                </Row>

                <Row className="text-center">      
                <Col className="col-xs-12"  md="12" lg="12">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/R0SpszGT0k8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Col>
                  <br/>
                </Row>

                
                <Row className="text-center">
                <Col md="12" lg="12">
                  <br/>
                  <p className="lead">
                    Um dich das erste Mal bei Staffbite anzumelden, musst du dich zunächst registrieren. 
                    <br/>
                    Klicke dafür einfach oben rechts auf <Link to="/signup">"Kostenlos testen"</Link> und gib die benötigten Daten ein.
                  <br/>
                    Nachdem du deinen Account verifiziert hast, kannst du sofort loslegen! Herbei fallen keinerlei Kosten an.
                    <br/>
                    Wenn du mehr über unsere Lösung erfahren willst, klick einfach unten auf eines der Bilder.
                  </p>    
                </Col>

                </Row>
                
            </Container>
            
            <Container mt-4>
                <Row className="mt-6" >

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanVorlage}
                  alt="Tablet mit Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/schichtplan-erstellen" class="stretched-link">Einfache und unkomplizierte Schichtpläne</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Mit Staffbite erstellst du deine Schichtpläne innerhalb kürzester Zeit.
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                      Schaue dir hier an wie du mit Staffbite einen Schichtplan erstellen kannst.
                      Du kannst die Schichtpläne jederzeit online per Smartphone, Tablet oder Laptop einsehen und bearbeiten.
                  </CardText>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={VorlageThumbnail}
                            alt="Vier Menschen am Tisch mit Zettel und Block"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/themen/schichtplan-vorlage"class="stretched-link">Schichtplan Vorlage erstellen</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie erstelle ich eine Schichtplan Vorlage?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel zeige ich dir, wie du mit Staffbite deine individuelle & wiederverwendbare Vorlage erstellen kannst. 
                                    Schau dir hier unsere Schritt für Schritt Anleitung an. 
                            </CardText>
                            <br/>
                        </Card>
                </Col>

                </Row>
                </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default ErsteAnmeldung;