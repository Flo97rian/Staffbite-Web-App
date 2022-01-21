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
                
      <Container className="pb-2"fluid>
            <Row className="ml-0 mt-10">
              <Col className="mt-4 ml-6">
              
              <br/>
              <br/>
              <br/>
              <h2 class="display-4">Verfügbarkeiten eintragen</h2>
                <p className="lead">
                  Jedes deiner Teammitglieder bekommt einen eigenen Zugang zu Staffbite. 
                  <br/>
                  Anschließend können sie per Smartphone, Tablet oder Laptop ihre Verfügbarkeiten eintragen.
                  <br/>
                  Auf diese Weise spart ihr euch einen Haufen WhatsApp-Nachrichten, Mails, Zettel und Stress.
                  <br/>
                  <br/>
                  Übrigens: Wir arbeiten derzeit mit Hochdruck an einer kostenlosen iOS & Android-App für deine Mitarbeiter*innen.
                </p>
                </Col>
                
                    
                
                <Col md="12" lg="6">
                  <img
                    alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                    src={TeamVerwalten}
                    title="Team erstellen und verwalten"
                    height="100%"
                    width="100%"
                  />
                </Col>
                </Row>
                </Container>

                <Container mt-4>
                <Row className="mt-6" >

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanBeispiel}
                  alt="Vollständig befüllter Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/automatisierter-schichtplan" class="stretched-link">Dein automatisierter Schichtplan</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wir wollen dir dabei helfen deine Schichtpläne deutlich schneller zu befüllen.
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                      Aus diesem Grund haben wir automatisierte Befüllung entwickelt.
                      Unser Algorithmus teilt deine Mitarbeiter*innen fair & ausgeglichen in den Schichtplan ein.
                  </CardText>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Possibilities}
                            alt="Ein Mensch steht vor 3 Wegen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/themen/schichtplan-erstellen"class="stretched-link">Schichtplan mit Papier, Excel oder Software</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie viel kostet dich unsere Lösung nach dem Probemonat?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Wenn du Staffbite testen möchtest, erhälst du einen kostenlosen Probemonat. 
                                    Nachdem dieser abgelaufen ist, prüfen wir gemeinsam, welches Paket für dich passt.
                                    Bei uns gibt es keinen Preis pro Mitarbeiter*in, damit du nicht jeden Monat etwas anderes zahlen musst. 
                            </CardText>
                        </Card>
                </Col>

                </Row>
                </Container>
          
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VerfügbarkeitenEintragen;