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
  CardTitle,
  Card,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";

import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLANERSTELLEN_TITLE, SCHICHTPLANERSTELLEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"
import CloudPicture from "../../../assets/img/themen/CloudComputingImage.png"
import Calendar from "../../../assets/img/themen/CalendarImage.png"

function SchichtplanErstellen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/schichtplan-erstellen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/schichtplan-erstellen" />
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
                        <h1>Dein digitaler Schichtplan</h1>
                    </Row>
      </Container>
                
            <Container fluid>
            <Row className="ml-0 mt-10">
        <Col className="mt-4 ml-6">
        <p className="lead">
        <br/>
        <br/>
        <br/>
        <h2 class="display-4">Einfache und unkomplizierte Schichtpläne für dich und dein Team</h2>
                  Mit unserer Lösung kannst du in kürzester Zeit deine Schichtpläne digital erstellen. 
                  <br/>
                  Du kannst mit wenigen Klicks die wichtigsten Informationen zu deinen Schichten angeben. 
                  <br/>
                  Den vorbereiteten Plan gibst du anschließend deinem Team frei.
                  <br/>
                  <br/>
                  Jetzt musst du nur noch abwarten, bis dein Team sich in den Plan eingetragen hat.
                    <br/> 
                    Dein Team bekommt ebenfalls einen Zugang zu Staffbite und kann sich jederzeit per Smartphone, Tablet oder Laptop in den Plan eintragen. 
                    <br/>
                    Über unser Reporting kannst du außerdem nachschauen wer sich noch nicht eingetragen hat.
                
                </p>
                </Col>
                      
                <Col md="12" lg="8">
                  <img
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlage}
                    title="Schichtplan Vorlage erstellen"
                    height="100%"
                    width="100%"
                  />
                </Col>
                </Row>

                <Container mt-4>
                <Row className="mt-6" >

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={CloudPicture}
                  alt="Wolke auf die ein Finger zeigt"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/verfuegbarkeiten-eintragen" class="stretched-link">Verfügbarkeiten eintragen</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wie kann mein Team sich in den erstellen Schichtplan eintragen?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                      Dein Team bekommt ebenfalls einen Zugang zu Staffbite.
                      Für deine Mitarbeiter*innen ist Staffbite vollständig kostenlos. Dein Team kann sich jederzeit online in den Schichtplan eintragen.
                  </CardText>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Calendar}
                            alt="Bild eines Kalenders"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/themen/monatsplanung"class="stretched-link">Schichtplanung für einen ganzen Monat</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie erstelle ich die Schichtpläne für einen ganzen Monat?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel zeige ich dir, wie du mit Staffbite die Schichtplanung für einen ganzen Monat erledigen kannst. 
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
export default SchichtplanErstellen;