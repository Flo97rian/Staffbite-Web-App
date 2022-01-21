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
import {THEMEN_AUTOMATISIERTEBEFÜLLUNG_DESCRIPTION, THEMEN_AUTOMATISIERTEBEFÜLLUNG_TITLE} from "../../../constants/MetaTexts";
import Calendar from "../../../assets/img/themen/CalendarImage.png"
import FreigegebenerPlan from "../../../assets/img/themen/FreigegebenerPlan.png"
import PlanMitBewerbern from "../../../assets/img/themen/PlanMitBewerbern.png"
import PlanÜberprüfen from "../../../assets/img/themen/PlanÜberprüfen.png"




function AutomatisierteBefüllung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/automatisierte-befuellung-starten";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_AUTOMATISIERTEBEFÜLLUNG_TITLE}</title>
          <meta name="description" content={THEMEN_AUTOMATISIERTEBEFÜLLUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/automatisierte-befuellung-starten" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Automatisierte Befüllung starten"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du die automatisierte Befüllung starten kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/automatisierte-befuellung-starten"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Calendar}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Automatisierte Befüllung starten"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du die automatisierte Befüllung starten kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/automatisierte-befuellung-starten"></meta>
          <meta property="twitter:image" content={Calendar}></meta>
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
                        <h1>Schritt für Schritt: Automatisierte Befüllung starten</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin zusammen 🚀
                    <br/>
                    <br/>
                    Heute zeige ich dir, wie du die automatisierte Befüllung deines Schichtplans starten kannst. In den vorherigen Artikeln habe ich dir gezeigt, wie du deine Schichtplan Vorlage erstellst und wie du deinen Schichtplan anschließend für dein gesamtes Team freigibst.
                    <br/>    
                    Wenn du mehr darüber wissen willst, wie du deinen individuellen Schichtplan erstellst und freigibst, schau dir die Artikel gerne an:
                    <br/>
                    - <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                    <br/>
                    - <Link to="/themen/monatsplanung">Schichtplanung für einen ganzen Monat</Link>
                    <br/>
                    - <Link to="/themen/individueller-schichtplan">Dein individueller Schichtplan</Link>
                    <br/>
                    <br/>
                    Heute möchte ich dir den nächsten Schritt zeigen: Die automatisierte Befüllung deines Schichtplans.
                    <br/>
                    <br/>
                    Inhaltsverzeichnis:
                    <br/>
                    
                    <HashLink className="text-muted p-0" to="/themen/automatisierte-befuellung-starten#vorbereitung">
                      Vorbereitung
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/automatisierte-befuellung-starten#befüllung">
                      Befüllung starten
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/automatisierte-befuellung-starten#next">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    <br/>
                    </p>

                    <section className="section pt-7" id={"vorbereitung"}>
                    <h2>Die Vorbereitung</h2>
                    <p className="lead">
                    Um die Befüllung deines Schichtplans zu automatisieren, musst du zuvor eine Schichtplan Vorlage erstellt und freigegeben haben. Ich verwende für dieses Beispiel den bereits erstellten Plan aus den vorherigen Artikeln. Der bereits freigegebe Plan hat somit den Status „Bewerbung“.
                    </p>
                    <br/>
                    </section>
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite vom einem freigegebenen Schichtplan"
                            src={FreigegebenerPlan}
                            title="Freigegebener Schichtplan"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <br/>
                    <p className="lead">
                    Nun ist es an der Zeit, dass mein Team sich einträgt. Nach ein paar Tagen sollten alle Mitarbeiter*innen dies erledigt haben und die automatisierte Befüllung kann gestartet werden.
                    </p>
                    <br/>
                    

                    
                    <section className="section pt-7" id={"befüllung"}>
                    <h2>Automatisierte Befüllung</h2>
                    <p className="lead">
                    Nachdem sich das Team in den Schichtplan eingetragen hat, sieht der Schichtplan so aus:
                    </p>
                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines Schichtplans mit Bewerbern"
                            src={PlanMitBewerbern}
                            title="Plan mit Bewerbern"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                    Anhand dieser ersten Übersicht ist bereits zu erkennen, dass bestimmte Schichten beliebter sind als andere. In die Backoffice-Schicht am Donnerstag hat sich sogar niemand eingetragen. <br/>Normalerweise hättest du diese Informationen hier in Form von einer ganzen Menge WhatsApp-Nachrichten bekommen. Wir strukturieren für dich bereits die Verfügbarkeiten deines Teams. Jetzt kommt entscheidende Punkt: Du klickst einfach oben rechts auf „Befüllung starten“.<br/> Dein Schichtplan sieht nun folgendermaßen aus:
                    </p>
                    <br/>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem Schichtplan nach der Befüllung"
                        src={PlanÜberprüfen}
                        title="Befüllter Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>


                    <p className="lead">
                    Nach nur 5 Sekunden sieht dein Schichtplan schon sehr gut aus. Es konnten fast alle Schichten befüllt werden! Somit hast du für die Befüllung deines Schichtplans 5 Sekunden statt 60-90 Minuten gebraucht. 🙌
                    </p>
                    </section>


                    <section className="section pt-7" id={"next"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                    Im nächsten Artikel zeige ich dir, wie du manuell die Lücken in deinem Schichtplan schließen kannst. Dafür kannst du dich entweder selbst eintragen oder einen deiner Mitarbeiter*innen einteilen. Anschließend brauchst du den fertigen Plan nur noch mit 1 Klick veröffentlichen, sodass dein gesamtes Team den Plan einsehen kann.
                    </p>
                    
                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p className="lead">
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!
                      </p>
                      </section>
                  </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default AutomatisierteBefüllung;