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
} from "reactstrap";

import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {TEAMVERWALTEN_TITLE, TEAMVERWALTEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png"

function TeamVerwalten (props) {
  useEffect(() => {
    pageViewsTracking()
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
                <h1 class="text-center">Behalte dein Team im Blick!</h1>
                </Row>
    </Container>
                
    <Container className="pb-2"fluid>
        <Row className="text-center ml-0 mt-4">
        <Col>
        <p>
            Staffbite liefert dir einfach und unkompliziert die wichtigsten Informationen zu deinem Team.
            <br/>
            
        </p>
        </Col>
        </Row>
        
        <Row className="text-center">
        <Col className="col-xs-12"  md="12" lg="9">
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
        

        <Container className="pb-2"fluid>
        <Row className="text-center ml-0 mt-4">
        <Col md="12" lg="12">
            <br/>
            <p>
            Damit sich dein Team in den Schichtplan eintragen kann, musst du deine Mitarbeiter*innen nur einmalig einladen. 
            <br/>
            Dafür brauchst du nur ihren Namen, ihre E-Mail-Adresse und die Anzahl der Schichten, die sie pro Woche arbeiten sollen. 
            <br/>
            Außerdem kannst du angeben wie viel Erfahrung sie bereits haben und welche Position (z.B. Service, Küche, etc.) sie ausfüllen. 
            <br/>
            Diese Informationen kannst du später nutzen, um deine Schichtpläne noch besser zu gestalten.
            </p>  
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