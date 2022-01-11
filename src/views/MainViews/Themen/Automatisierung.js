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
import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_AUTOMATISIERUNG_DESCRIPTION, THEMEN_AUTOMATISIERUNG_TITLE} from "../../../constants/MetaTexts";
import Paperwork from "../../../assets/img/themen/PaperworkImage.png"
import HappyEmployee from "../../../assets/img/themen/HappyEmployeeImage.png"


function Automatisierung (props) {
  let mainContent = useRef("mainContent");

  useEffect(() => {
    pageViewsTracking()
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  function pageViewsTracking () {
    const pathname = "/themen/automatisierung";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
    } 
    
    return (
    <div ref={mainContent}>
        <Helmet>
          <title>{THEMEN_AUTOMATISIERUNG_TITLE}</title>
          <meta name="description" content={THEMEN_AUTOMATISIERUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/automatisierung" />
          <meta property="og:title" content="Staffbite - Automatisierte Befüllung deines Schichtplans"/>
          <meta property="og:description" content="In diesem Beitrag stelle ich dir die automatisierte Befüllung deiner Schichtpläne mit Staffbite vor."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/automatisierung"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Paperwork}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Automatisierte Befüllung deines Schichtplans"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag stelle ich dir die automatisierte Befüllung deiner Schichtpläne mit Staffbite vor."/>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/automatisierung"></meta>
          <meta property="twitter:image" content={Paperwork}></meta>
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
                        <h1>Automatisierte Befüllung deines Schichtplans</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p>
                    Moin zusammen 😊
                    </p>
                    <p>
                      In unserem Blog werden wir regelmäßig Fragen beantworten, Tipps & Tricks mit euch teilen und auf aktuelle Neuigkeiten eingehen. Wenn du also eine Frage an uns hast, dann schreib gerne eine Mail an info@staffbite.de – wir freuen uns deine Nachricht!
                    </p>
                    <p>
                        In diesem kurzen Beitrag möchte ich dir die automatisierte Befüllung deiner Schichtpläne vorstellen.  
                    </p>
                    <p>
                    Du kennst das sicherlich: Jede Woche aufs Neue bekommst du unzählige WhatsApp-Nachrichten, E-Mails und Anrufe deines Teams mit Wünschen und Terminen, an denen sie arbeiten können. Nun musst du dich hinsetzen und in mühevoller Kleinstarbeit einen Schichtplan puzzeln.
                    </p>
                    <p>
                    In der Regel dauert dieser Prozess jede Woche circa 1-2 Stunden. Nachdem du den fertigen <Link to="/schichtplan-veroeffentlichen">Schichtplan veröffentlicht</Link> hast, brauchst du meist nicht lange zu warten, bis die ersten Rückmeldungen kommen, da Jemand krank geworden ist oder eine Familienfeier vergessen hat. Also musst du dich wieder hinsetzen und Änderungen vornehmen.
                    </p>
                <Row className="pb-6">
                <Col className="order-md-2" md="12" lg="6">
                    <img
                        alt="Schreibtisch mit Kaffee, Zettel und Stift"
                        src={Paperwork}
                        title="PaperworkImage"
                        height="110%"
                        width="110%"
                    />
                </Col>
                </Row>
                    <h2>Wie kann ich diese Probleme lösen?</h2>
                    <p>
                    Durch Staffbite lassen sich diese Probleme leicht lösen. Du & dein Team erhalten einen Zugang zu unserem Cloud Service. Dieser ist jederzeit und überall erreichbar. Nachdem du deinen individuellen <Link to="/schichtplan-erstellen">Schichtplan erstellt</Link> hast, kann sich dein Team in die einzelnen Schichten eintragen. Auf diese Weise sparst du bereits jede Menge Zeit und Nerven. 
                    </p>
                    <p>
                    Nachdem dein Team sich transparent eingetragen hat, musst du nur noch auf einen Knopf klicken: „Befüllung starten“. Nun legt unser Algorithmus los und teilt dein Team in den Schichtplan ein. Natürlich werden deine Mitarbeiter*innen nur in Schichten eingeteilt, in die sie sich zuvor eingetragen haben.
                    </p>
                    <p>
                    Neben der Verfügbarkeit deines Teams berücksichtigt unser Algorithmus noch eine Reihe weiterer Faktoren wie die Position der Mitarbeiter*in, die Erfahrung, die Anzahl der SOLL-Schichten pro Woche und vieles mehr.
                    </p>
                    <p>
                    Durch die automatisierte Befüllung deines Schichtplans ist dieser innerhalb weniger Sekunden fertig. Du kannst nun bei Bedarf letzte Anpassungen machen und anschließend den fertigen Schichtplan veröffentlichen.    
                    </p>
                <Row className="pb-6">
                <Col className="order-md-2" md="12" lg="6">
                    <img
                        alt="Glückliche Frau schaut auf ihr Handy"
                        src={HappyEmployee}
                        title="HappyEmployeeImage"
                        height="110%"
                        width="110%"
                    />
                </Col>
                </Row>
                    <p>
                    Den fertigen Schichtplan kann jetzt dein gesamtes Team einsehen. Falls einer deiner Mitarbeiter*innen jetzt eine Schicht absagen muss, kann sie dies direkt über unsere Lösung tun. Wie genau deine Team untereinander Schichten tauschen kann, zeige ich dir in einem anderen Beitrag.
                    </p>
                    <h2>Probiere es jetzt aus</h2>
                    <p>
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!</p>
                  </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Automatisierung;