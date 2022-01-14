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
import {TEAMVERWALTEN_TITLE, TEAMVERWALTEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png"
import Preise from "../../../assets/img/theme/ZeitGeld.png"
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"

function TeamVerwalten (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/team-verwalten";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{TEAMVERWALTEN_TITLE}</title>
          <meta name="description" content={TEAMVERWALTEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/team-verwalten" />
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
                <h1 class="text-center">Dein digitaler Schichtplan - Team verwalten</h1>
                </Row>
    </Container>
                
    <Container className="pb-2"fluid>
        <Row className="ml-0 mt-10">
        <Col className="mt-4 ml-6">
        <p className="lead">
        <br/>
        <br/>
        <br/>
        <h2 class="display-4">Behalte dein Team im Blick!</h2>
            Staffbite liefert dir einfach und unkompliziert die wichtigsten Informationen zu deinem Team.
            <br/>
            <p className="lead">
            Damit sich dein Team in den Schichtplan eintragen kann, musst du deine Mitarbeiter*innen nur einmalig einladen. 
            <br/>
            Dafür brauchst du nur ihren Namen, ihre E-Mail-Adresse und die Anzahl der Schichten, die sie pro Woche arbeiten sollen. 
            <br/>
            Außerdem kannst du angeben wie viel Erfahrung sie bereits haben und welche Position (z.B. Service, Küche, etc.) sie ausfüllen. 
            <br/>
            Diese Informationen kannst du später nutzen, um deine Schichtpläne noch besser zu gestalten.
            </p>  
            
        </p>
        </Col>

        <Col className="col-xs-12"  md="12" lg="8">
            <img
            alt="Übersicht zur Erstellung und Verwaltung deines Teams"
            src={TeamÜbersicht}
            title="Team erstellen und verwalten"
            height="100%"
            width="100%"
            />
        </Col>
            <br/>
        </Row>
        

        <Container mt-6>
        
                <Row className="mt-6" >
                  

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanPublish}
                  alt="Vollständig befüllter Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/fuer-dein-team" class="stretched-link">Vorteile für dein Team</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wir liefern Mehrwerte für dich und dein gesamtes Team.
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                      Schaue dir hier die Vorteile unserer Lösung für dein gesamtes Team an.
                      Biete deinen Mitarbeiter*innen die Schichtpläne, die sie verdient haben.
                  </CardText>
                  <br/>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Preise}
                            alt="Eine Wage im Gleichgewicht mit einer Uhr und Geld"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/pricing"class="stretched-link">Unsere Preise</Link>
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
    </Container>
          
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default TeamVerwalten;