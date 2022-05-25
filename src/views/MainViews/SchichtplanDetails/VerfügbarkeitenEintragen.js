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
  Button,
  CardSubtitle,
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {VERFÜGBARKEITENEINTRAGEN_TITLE, VERFÜGBARKEITENEINTRAGEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import EintragenSmartphone from "../../../assets/img/app/App-eintragen-uebersicht-smartphone.png"
import EintragenSmartphoneSchicht from "../../../assets/img/app/app-eintragen-smartphone.png"
import ThemenSlider from "../Themen/ThemenSlider";
import TrialBanner from "../sub/TrialBanner";
import { isMobile } from "react-device-detect";


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
        <TrialBanner></TrialBanner>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-4 pt-6">
                        <h1>Dein digitaler Schichtplan - Eintragen</h1>
                    </Row>
      </Container>
                
      <Container className="pb-2 pt-6">
            <Row>
              <Col className="mt-0" xs="12" sm="6" lg="6">
                <Row className="">
                  <Col>
                  <h2 class="display-4">Verfügbarkeiten eintragen</h2>
                  </Col>
                </Row>

                <p className="lead">
                <Row className="">
                  <Col>
                Jedes deiner Teammitglieder bekommt einen eigenen Zugang zu Staffbite. 
                Anschließend können sie per Smartphone, Tablet oder Laptop ihre Verfügbarkeiten eintragen.
                Auf diese Weise spart ihr euch einee Menge WhatsApp-Nachrichten, Mails, Zettel und Stress.
                </Col>
                </Row>
                <Row className="mt-4 ">
                  <Col>
                      Übrigens: Wir arbeiten derzeit mit Hochdruck an einer kostenlosen iOS & Android-App für deine Mitarbeiter*innen.
                </Col>
                </Row>

                <Row className="mt-2">
                  <Col>
                  <Link to="/themen">
                    <Button className="btn-icon btn-3" color="info" type="button"
                    onClick={
                        () => 
                        ReactGA.event({
                          category: 'Blog',
                          action: 'Verfüfbarkeiten Eintragen CTA'
                        })}
                      ><p className="p-0 m-0">Aktuelle News lesen</p></Button>
                </Link>
                  </Col>
                
                </Row>
                </p>
                </Col>
                <Col xs="12" sm="6" lg="6">
                  <Row className="right">
                  <img
                    alt="Prototyp der Staffbite-App"
                    src={EintragenSmartphone}
                    title="Staffbite App"
                    height="60%"
                    width="60%"
                  />
                  </Row>
                </Col>
                </Row>
                </Container>


                <Container>
                  <Row className="">
                    <Col>
                      <Row className={ isMobile ? "text-center mt-5" : "text-center mt-5"}>
                        <Col>
                        <h2 className="display-4">In einen Schichtplan eintragen. So funktioniert's:</h2>
                        </Col>
                        </Row>


                        <Row className="mt-5">
                        <Col className="mt-8" xs="12" sm="6" lg="6">
                          <CardSubtitle className="lead">
                            Deine Mitarbeiter*innen erhalten ebenfalls einen Zugang zu Staffbite. 
                            Somit kann dein Team die vorbereiteten Schichtpläne einsehen. 
                            Anschließend tragen deine Mitarbeiter*innen ihre Verfügbarkeiten ein.
                            <br/>
                            <br/>
                            Dafür müssen sie nur die Schichten auswählen und auf "Eintragen" klicken.
                          </CardSubtitle>
                        </Col>
                      
                      
                      <Col xs="12" sm="6" lg="4">
                       
                        <img
                          alt="Ansicht der Staffbite App beim Eintragen in den Schichtplan"
                          src={EintragenSmartphoneSchicht}
                          title="Staffbite App - Eintragen"
                          height="100%"
                          width="100%"
                        />    
                        
                        </Col>
                        
                        
                      </Row>
                      <Row>
                        <Col>
                        <p className="lead">
                          Und schon hast du die Verfügbarkeiten deines Teams übersichtlich bei Staffbite! 
                          <br/>
                          Wenn dein gesamtes Team sich eingetragen hat, kannst du die automatisierte Befüllung starten.
                          <br/>
                          Dein Team wird entsprechend ihrer eingetragenen Verfügbarkeiten bestmöglich eingetragen & du sparst dir jede Menge Zeit.
                        </p>
                        </Col>
                      </Row>
                      
                    </Col>
                  </Row>
                </Container>
          <ThemenSlider></ThemenSlider>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VerfügbarkeitenEintragen;