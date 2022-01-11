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
import {VERFÜGBARKEITENEINTRAGEN_TITLE, VERFÜGBARKEITENEINTRAGEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamVerwalten from "../../../assets/img/theme/Team-verwalten.png"

function VerfügbarkeitenEintragen (props) {
  useEffect(() => {
    pageViewsTracking()
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
                        <h1>Verfügbarkeiten eintragen</h1>
                    </Row>
      </Container>
                
            <Container className="pb-2">
              <Row className="justify-content-center ml-0 mt-4">
                
                <p>
                  Moin! Wir freuen uns, dass du dich für Staffbite interessierst.
                  <br/>
                  Um dir den Einstieg so leicht wie möglich zu machen, haben wir ein Video vorbereitet.
                </p>
                
                    
                
                <Col md="12" lg="7">
                  <img
                    alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                    src={TeamVerwalten}
                    title="Team erstellen und verwalten"
                    height="100%"
                    width="100%"
                  />
                </Col>
                </Row>
                  <br/>
                

                <Container className="pb-2"fluid>
                <Row className="text-center ml-0 mt-4">
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
            </Container>
          
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VerfügbarkeitenEintragen;