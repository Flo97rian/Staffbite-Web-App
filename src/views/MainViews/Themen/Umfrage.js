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
  Button
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar";
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_UMFRAGE_DESCRIPTION, THEMEN_UMFRAGE_TITLE} from "../../../constants/MetaTexts";
import UmfrageThumb from "../../../assets/img/theme/UmfrageThumb.jpg";
import ThemenSlider from "./ThemenSlider";




function Umfrage (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/umfrage";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_UMFRAGE_TITLE}</title>
          <meta name="description" content={THEMEN_UMFRAGE_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/umfrage" />
          <meta property="og:title" content="Staffbite - Umfrage"/>
          <meta property="og:description" content="In diesem Beitrag geht es um deine Meinung. Hilf uns dabei Staffbite bestmöglich weiterzuentwickeln."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/umfrage"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={UmfrageThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Umfrage"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag geht es um deine Meinung. Hilf uns dabei Staffbite bestmöglich weiterzuentwickeln."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/umfrage"></meta>
          <meta property="twitter:image" content={UmfrageThumb}></meta>
          <meta property="twitter:type" content="blog"></meta>

        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-0 mt-4">
                        <h1>Deine Meinung ist gefragt!</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Hallo! Schön, dass du wieder da bist 😊
                    <br/>
                    <br/>
                    Heute gibt es Mal einen ganz anderen Beitrag in unserem Blog. Wir wollen von dir wissen, welche Funktionalitäten dir bei einem Schichtplanungstool besonders wichtig sind.
                    <br/>
                    <br/>
                    Wir würden uns sehr freuen, wenn du dir ein bis zwei Minuten nimmst, um unsere Umfrage auszufüllen. Du findest die Umfrage hier: <a href="https://forms.office.com/r/aQfa6ugGtZ">Umfrage</a>.
                    <br/>
                    <br/>
                    Wir bei Staffbite verfolgen das Ziel stets mit Hilfe unserer Kunden und Interessenten unsere Lösung zu verbessern. Derzeit stehen wir kurz vor dem Release unserer kostenfreien Mitarbeitenden-App. Diese wurde sich von vielen gewünscht, daher haben die Entwicklung vorgezogen.
                    <br/>
                    <br/>
                    Anschließend geht es darum weitere Funktionalitäten zu entwickeln. Wir möchten unseren Kunden eine breite Palette bieten. Kostenpflichtig ist jedoch nur was unsere Kunden auch wirklich nutzen. Derzeit ist die Entwicklung von Stundenkonten, einer Zeiterfassung und eine Live Demo geplant. Diese Liste erweitern wir stets in Abstimmung mit unseren Kunden.
                    <br/>
                    <br/>
                    Wenn du auch Ideen und Anmerkungen zu unserer Lösung hast, füll gerne die Umfrage aus oder wende dich direkt an uns.
                    <br/>
                    <br/>
                    Neuerdings sind wir auch bei WhatsApp unter 0157 30 64 46 50 erreichbar – du kannst uns auch dort schreiben 😊
                    <br/>
                    <br/>
                    Bleib gesund und hab einen schönen Tag!

                    </p>

                    <Row className="">
                          <Col className="mt-2">
                        <Link to="/signup">
                        <Button className="btn-icon btn-3" color="success" type="button"
                          ><p className="p-0 m-0">Kostenlos ausprobieren</p></Button>
                        </Link>
                        <Link to="/contact">
                        <Button className="btn-icon ml-sm-2 btn-3" color="info" type="button"
                        ><p className="p-0 m-0">Schreib uns!</p></Button>
                        </Link>
                        </Col>
                        </Row>
                    
                    
                </Col>
              </Row>
        </Container>
        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Umfrage;