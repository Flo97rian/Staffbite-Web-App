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
  CardSubtitle,
  CardTitle
} from "reactstrap";

import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {ERSTEANMELDUNG_TITLE, ERSTEANMELDUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";

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
                <p>
                  Moin! Wir freuen uns, dass du dich für Staffbite interessierst.
                  <br/>
                  Um dir den Einstieg so leicht wie möglich zu machen, haben wir ein Video vorbereitet.
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
                  <p>
                    Um dich das erste Mal bei Staffbite anzumelden, musst du dich zunächst registrieren. 
                    <br/>
                    Klicke dafür einfach oben rechts auf "Kostenlos Registrieren" und gib die benötigten Daten ein.
                  </p>
                  <p>
                    Nachdem du deinen Account verifiziert hast, kannst du sofort loslegen! Herbei fallen keinerlei Kosten an.
                  </p>    
                </Col>

                </Row>
                
            </Container>
            <Container className="pb-2 pt-6 px-9" fluid>
                <Row className="mt-2" >
                <Col xs="6">
                <Card>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Automatisierter Schichtplan
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Einen Schichtplan automatisiert Befüllen? Wie geht das?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-2 pr-4 lead" tag="p">
                                     Mit wenigen Klicks kannst du deinen <Link to="/automatisierter-schichtplan" class="stretched-link">Schichtplan automatisiert</Link> für dich befüllen lassen.
                                    <br/>
                                    <br/>
                            </CardText>
                        </Card>
                </Col>

                

                <Col xs="6">
                <Card>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichtplan erstellen
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie erstelle ich einen guten Schichtplan?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-2 pr-4 lead" tag="p">
                                     Mit wenigen Klicks erstellst du deinen <Link to="/schichtplan-erstellen" class="stretched-link">digitalen Schichtplan</Link> für dich und dein Team. 
                                    <br/>
                                    <br/>
                            </CardText>
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