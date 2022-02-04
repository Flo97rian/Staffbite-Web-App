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
  CardSubtitle,
  CardText
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {TEAMVERWALTEN_TITLE, TEAMVERWALTEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png"
import MitarbeiterEinladen from "../../../assets/img/landing/TeamVerwalten/MAEinladen.png"
import MitarbeiterÜberblick from "../../../assets/img/landing/TeamVerwalten/TeamÜbersicht.png"
import { isMobile } from "react-device-detect";
import ThemenSlider from "../Themen/ThemenSlider";
import TrialBanner from "../sub/TrialBanner";


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
        <TrialBanner></TrialBanner>
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

    <Container className="mt-4">
          <Row>
            <Col xs="12" md="4">
            <Card>
            <Row className="text-center">
                <Col className="mt-3">
                <i className="far fa-paper-plane"></i>
                </Col>
            </Row>
            <Row className="text-center mt-1 mb-0">
              <Col className="mx-1">
                <CardTitle className="px-2 lead my-0">
                  1. Team einladen
                </CardTitle>
              </Col>
            </Row>
            <Row  className="text-center mt-1">
              <Col className="mx-1 mb-2">
                <CardText className="px-2">
                  Dafür brauchst du nur ihren Namen, ihre E-Mail-Adresse und die Anzahl der Schichten, die sie pro Woche arbeiten sollen. 
                </CardText>
              </Col>
            </Row>
            </Card>
            </Col>
            <Col xs="12" md="4">
            <Card>
            <Row className="text-center">
                <Col className="mt-3">
                <i className="far fa-edit"></i>
                </Col>
            </Row>
            <Row className="text-center mt-1">
              <Col className="mx-1">
                <CardTitle className="px-2 lead my-0 mb-1">
                  2. Position & Erfahrung festlegen
                </CardTitle>
              </Col>
            </Row>
            <Row  className="text-center">
              <Col className="mx-1 mb-2">
                <CardText className="px-2">
                  Anschließend gibt du an wie viel Erfahrung sie bereits haben und welche Position (z.B. Service, Küche, etc.) sie ausfüllen.
                </CardText>
              </Col>
            </Row>
            </Card>
            </Col>
            <Col xs="12" md="4">
            <Card>
            <Row className="text-center">
                <Col className="mt-3">
                <i className="far fa-check-circle"></i>
                </Col>
            </Row>
            <Row className="text-center mt-1">
              <Col className="mx-1">
                <CardTitle className="px-2 lead my-0">
                  3.  Los geht's
                </CardTitle>
              </Col>
            </Row>
            <Row  className="text-center">
              <Col className="mx-1 mb-2">
                <CardText className="px-2">
                  Diese Informationen kannst du später nutzen, um deine Schichtpläne noch besser zu gestalten.
                </CardText>
              </Col>
            </Row>
            </Card>
            </Col>
          </Row>
        </Container>

      <Container className="">
        <Row className="">
        <Col className="ml-0" xs="12" sm="4" lg="12">
        <Row>   
            <img
            className="right"
            alt="Übersicht zur Erstellung und Verwaltung deines Teams"
            src={TeamÜbersicht}
            title="Team erstellen und verwalten"
            height="80%"
            width="100%"
            />
            </Row>
        </Col>
          <br/>
        </Row>
        <Row className=" ml-0 mt-8">
          <h2 class="display-4">Behalte dein Team im Blick</h2>
        </Row>
            <p className="lead pl-2 mt-2">
            <Row>
            Staffbite liefert dir einfach und unkompliziert die wichtigsten Informationen zu deinem Team.
            <br/>
            Sieh dir hier die einzelnen Schritte an, um dein Team zu verwalten.
            </Row>
            </p> 
        </Container>
        
        <Container className="mt-8">
        <Row>
                    <Col md="12" lg="8">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung der Erstellung eines Mitarbeiters bei Staffbite"
                    src={MitarbeiterEinladen}
                    title="Erstellung eines Mitarbeiters"
                    height="100%"
                    width="100%"
                  />
                    </Col>

                    <Col className={isMobile ? "" : "ml-6"}>
                    <Row className="mt-4 text-left">
                      <h2 className="m-0 p-0 display-4">1. Team einladen</h2>
                    </Row>
                    <Row className="mt-2">
                    <CardSubtitle className="lead">Nur wenige Klicks & Informationen nötig, damit es losgehen kann 🎉</CardSubtitle>
                  </Row>
                  <p className="m-0 lead">
                  <Row className="justify-content-center mt-4">
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Name
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  E-Mail
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Erfahrung
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Schichten pro Woche
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Position
                </Col>
              </Row>  
              </p>
              </Col>
        </Row>
            </Container>

            <Container className="mt-8">
        <Row>

                    <Col className={isMobile ? "" : "ml-6"}>
                    <Row className="mt-4 text-left">
                      <h2 className="m-0 p-0 display-4">2. Team verwalten</h2>
                    </Row>
                    <Row className="mt-2">
                    <CardSubtitle className="lead">Nachdem du dein Team eingeladen hast, kannst du deine Mitarbeiter*innen übersichtlich verwalten.</CardSubtitle>
                  </Row>
                  <p className="m-0 lead">
                  <Row className="justify-content-center mt-4">
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Alles auf einen Blick
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Änderungen vornehmen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-1">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                Positionen vergeben
                </Col>
              </Row>
              </p>
              </Col>
              
              <Col md="12" lg="8">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung der Erstellung eines Mitarbeiters bei Staffbite"
                    src={MitarbeiterÜberblick}
                    title="Erstellung eines Mitarbeiters"
                    height="100%"
                    width="100%"
                  />
                    </Col>
              
        </Row>
        </Container>
          <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default TeamVerwalten;