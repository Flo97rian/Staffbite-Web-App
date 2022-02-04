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
import { HashLink } from 'react-router-hash-link';
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_VERÖFFENTLICHUNG_DESCRIPTION, THEMEN_VERÖFFENTLICHUNG_TITLE} from "../../../constants/MetaTexts";
import PlanNachAnpassungen from "../../../assets/img/themen/AnpassungenVornehmen/PlanNachAnpassungen.png";
import PlanNachAnpassungenPublish from "../../../assets/img/themen/SchichtplanVeröffentlichen/PlanNachAnpassungenPublish.png";
import VeröffentlichungThumb from "../../../assets/img/themen/SchichtplanVeröffentlichen/SchichtplanVeröffentlichenThumbnail.jpg";
import PlanÜbersicht from "../../../assets/img/themen/SchichtplanVeröffentlichen/PlanÜbersicht.png";
import ThemenSlider from "./ThemenSlider";




function Veröffentlichung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/schichtplan-veroeffentlichen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_VERÖFFENTLICHUNG_TITLE}</title>
          <meta name="description" content={THEMEN_VERÖFFENTLICHUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/schichtplan-veroeffentlichen" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Schichtplan veröffentlichen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie deinen Schichtplan veröffentlichen kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/schichtplan-veroeffentlichen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={VeröffentlichungThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Schichtplan veröffentlichen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du deinen Schichtplan veröffentlichen kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/schichtplan-veroeffentlichen"></meta>
          <meta property="twitter:image" content={VeröffentlichungThumb}></meta>
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
                        <h1>Schritt für Schritt: Schichtplan veröffentlichen</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin liebe Planerinnen und Planer 🤝
                    <br/>
                    <br/>
                    Im heutigen Teil der Schritt für Schritt-Anleitung zeige ich dir, wie du deinen fertigen Dienstplan veröffentlichen kannst.
                    <br/>
                    In den vorherigen Teilen haben ich dir bereits im Detail gezeigt, wie du Vorlagen erstellst, deinen individuellen Schichtplan für dein Team freigibst, du die Befüllung startest und bei Bedarf Anpassungen vornehmen kannst. Jetzt fehlt nur noch ein letzter Schritt, damit dein Team deine online Schichtpläne direkt über das Smartphone oder per Laptop einsehen kann.
                    <br/>    
                    <br/>
                    Falls du die Beiträge noch nicht gesehen hast, schau sie dir hier gerne an:
                    <br/>
                    - <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                    <br/>
                    - <Link to="/themen/individueller-schichtplan">Dein individueller Schichtplan</Link>
                    <br/>
                    - <Link to="/themen/monatsplanung">Schichtplan freigeben</Link>
                    <br/>
                    - <Link to="/themen/automatisierte-befuellung-starten">Automatisiere Befüllung starten</Link>
                    <br/>
                    - <Link to="/themen/anpassungen-vornehmen">Anpassungen vornehmen</Link>
                    <br/>
                    
                    <br/>
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/schichtplan-veroeffentlichen#vorbereitung">
                      Vorbereitung
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/schichtplan-veroeffentlichen#veroeffentlichung">
                      Schichtplan veröffentlichen
                    </HashLink>
                    <br/>
                    </p>

                    <section className="section pt-7" id={"vorbereitung"}>
                    <h2>Die Vorbereitung</h2>
                    <p className="lead">
                    Wir haben bereits zusammen alle nötigen Schritte unternommen, damit du deinen perfekten Schichtplan erstellst. Nachdem du die automatisierte Befüllung gestartet hast, ist schon fast alles fertig.
                    <br/>
                    Ich habe mich am Ende in eine unbesetzte Schicht selbst eingetragen und habe eine Mitarbeiterin aus einer Schicht ersetzt, da ihr etwas dazwischengekommen ist – ganz normale Aufgaben bei der Schichtplanung.
                    <br/>
                    Der fertige Plan sieht nun so aus:
                    </p>

                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PlanNachAnpassungen}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>  
                    </section>              

                    
                    <section className="section pt-7" id={"veroeffentlichung"}>
                    <h2>Schichtplan veröffentlichen</h2>
                    <p className="lead">
                    Der letzte Schritt ist nun die Veröffentlichung. Da dein Schichtplan bereits fertig befüllt und angepasst ist, ist hier nur noch 1 Klick nötig.
                    </p>
                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines fertigen Schichtplans mit Kasten um den Button zur Veröffentlichung"
                            src={PlanNachAnpassungenPublish}
                            title="Fertiger Schichtplan zur Veröffentlichung"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                    Anschließend befindet sich dein Schichtplan im Reiter „Schichtplan“.
                    </p>
                    <br/>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={PlanÜbersicht}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    <p className="lead">
                    Somit ist der Plan nun für dein gesamtes Team einsehbar und du bist fertig. 🙌
                    <br/>
                    Natürlich kannst du auch weiterhin Anpassungen vornehmen und auf neue Wünsche deines Teams eingehen.
                    </p>

                    </section>


                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p className="lead">
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!
                      </p>

                  </Col>
              </Row>
        </Container>
        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Veröffentlichung;