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
import {ERSTEANMELDUNG_TITLE, ERSTEANMELDUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";

function ErsteAnmeldung (props) {
  useEffect(() => {
    pageViewsTracking()
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
                        <h1>Dein digitaler & automatisierter Schichtplan</h1>
                    </Row>
      </Container>
                
            <Container className="pb-2"fluid>
              <Row className="justify-content-center ml-0 mt-4">
                <Col md="12" lg="12">
                  <h2 class="text-center">Die erste Anmeldung</h2>
                </Col>

                <p>
                  Moin! Wir freuen uns, dass du dich für Staffbite interessierst.
                  <br/>
                  Um dir den Einstieg so leicht wie möglich zu machen, haben wir ein Video vorbereitet.
                </p>
                      
                <Col className="col-xs-12 text-center"  md="12" lg="12">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/R0SpszGT0k8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Col>
                  <br/>
                </Row>

                <Container className="pb-2"fluid>
                <Row className="justify-content-center ml-0 mt-4">
                <Col class="text-center" md="12" lg="12">
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
          
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default ErsteAnmeldung;