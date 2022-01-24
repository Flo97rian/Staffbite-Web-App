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
import {THEMEN_ANPASSUNGEN_DESCRIPTION, THEMEN_ANPASSUNGEN_TITLE} from "../../../constants/MetaTexts";
import Overview from "../../../assets/img/theme/AnpassungenOverview.png"
import PlanÜberprüfen from "../../../assets/img/themen/BefüllungStarten/PlanÜberprüfen.png"
import SelbstEintragen from "../../../assets/img/themen/AnpassungenVornehmen/SelbstEintragen.png"
import SelbstImPlan from "../../../assets/img/themen/AnpassungenVornehmen/SelbstEintragenImPlan.png"
import AnpassungNachBefüllung from "../../../assets/img/themen/AnpassungenVornehmen/AnpassungNachBefüllung.png"
import PersonalEntfernen from "../../../assets/img/themen/AnpassungenVornehmen/PersonalAusSchichtEntfernen.png"
import AnpassungVornehmen from "../../../assets/img/themen/AnpassungenVornehmen/AnpassungVornehmen.png"
import PlanNachAnpassungen from "../../../assets/img/themen/AnpassungenVornehmen/PlanNachAnpassungen.png"




function Anpassungen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/anpassungen-vornehmen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_ANPASSUNGEN_TITLE}</title>
          <meta name="description" content={THEMEN_ANPASSUNGEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/anpassungen-vornehmen" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Anpassungen am Schichtplan"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du Anpassungen an deinem Schichtplan vornehmen kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/anpassungen-vornehmen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Overview}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Anpassungen am Schichtplan"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du Anpassungen an deinem Schichtplan vornehmen kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/anpassungen-vornehmen"></meta>
          <meta property="twitter:image" content={Overview}></meta>
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
                        <h1>Schritt für Schritt: Anpassungen am Schichtplan</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin liebe Leser*innen 🤓
                    <br/>
                    <br/>
                    im diesem Teil der Schritt für Schritt Anleitungen möchte ich dir zeigen, wie du Anpassungen am Schichtplan vornehmen kannst. Ich habe dir bereits gezeigt, wie du deine eigene Schichtplan Vorlage erstellst, den individualisierten Dienstplan für dein Team freigibst und anschließend die automatisierte Befüllung startest.
                    <br/>
                    <br/>    
                    Falls du die Beiträge noch nicht gesehen hast, schau sie dir hier ruhig noch an:
                    <br/>
                    - <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                    <br/>
                    - <Link to="/themen/individueller-schichtplan">Dein individueller Schichtplan</Link>
                    <br/>
                    - <Link to="/themen/monatsplanung">Schichtplan freigeben</Link>
                    <br/>
                    - <Link to="/themen/automatisierte-befuellung-starten">Automatisiere Befüllung starten</Link>
                    <br/>
                    <br/>
                    Heute machen wir den nächsten Schritt und gehen darauf ein, wie du am automatisiert befüllten Schichtplan Änderungen vornehmen kannst. 👀
                    <br/>
                    <br/>
                    Inhaltsverzeichnis:
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/anpassungen-vornehmen#vorbereitung">
                      Vorbereitung
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/anpassungen-vornehmen#befüllung">
                      Befüllung starten
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/anpassungen-vornehmen#next">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    <br/>
                    </p>

                    <section className="section pt-7" id={"vorbereitung"}>
                    <h2>Die Vorbereitung</h2>
                    <p className="lead">
                    Um Änderungen an deinem Dienstplan vornehmen zu können, benötigst du einen bereits befüllten Plan. Ich verwende hier den Plan aus dem letzten Beitrag. Der Plan befindet sich jetzt im Reiter „Überprüfen“.
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
                    </section>              

                    
                    <section className="section pt-7" id={"befüllung"}>
                    <h2>Anpassungen vornehmen</h2>
                    <p className="lead">
                    Bei dem oben gezeigten Plan konnte die Backoffice-Schicht am Donnerstag nicht befüllt werden, da sich niemand in diese Schicht eingetragen hat. Du kennst diese Situation sicher. Um den Schichtplan voll zu bekommen, möchte ich mich einfach selbst in die Schicht eintragen.
                    <br/>
                    Dazu klicke ich einfach auf die leere Schicht – anschließend öffnet sich dieses Fenster.
                    </p>
                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines befüllten Schichtplans"
                            src={SelbstEintragen}
                            title="Befüllter Schichtplan"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                    Oben im Fenster sehe ich noch einmal die Schichtdetails. Hier sehe ich eventuelle Notizen und den Namen & die Uhrzeit der Schicht. Darunter befindet sich das Feld „Selbst eintragen“. Ich klicke dieses Feld an und bin direkt in der Schicht vermerkt.
                    </p>
                    <br/>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot einer Schicht"
                            src={SelbstImPlan}
                            title="Selbst eintragen in den Schichtplan"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>


                    <p className="lead">
                    Der Schichtplan ist somit vollständig befüllt. Häufig kommt es jedoch vor, dass sich Mitarbeiter*innen melden und mitteilen, dass Sie an bestimmten Tagen doch nicht arbeiten können.
                    <br/>
                    In diesem Beispiel zeige ich dir noch, wie du ein eingeteiltes Teammitglied vor der Veröffentlichung deines Plans mit einem anderen tauschen kannst. Gehen wir einmal davon aus, dass Svea am Montag doch nicht arbeiten kann.
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines Schichtplans"
                            src={AnpassungNachBefüllung}
                            title="Befüllter Schichtplan"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    <p className="lead">
                    Um Änderungen vorzunehmen, klicke ich einfach auf die entsprechende Schicht. Es öffnet sich dieses Fenster:
                    </p>
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines Schichtplans mit Bewerbern"
                            src={PersonalEntfernen}
                            title="Plan mit Bewerbern"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    <p className="lead">
                    Die obere Leiste kennst du bereits. Jetzt möchte ich dir die darunterliegenden Informationen erklären. 
                    <br/>
                    <br/>
                    Auf der linken Seite werden dir alle deine Mitarbeiter*innen angezeigt, die der Position der Schicht entsprechen. Beim Erstellen der Schicht haben wir die Position auf „Service“ gestellt. Somit sind alle Mitarbeiter*innen auf der linken Seite Servicekräfte.
                    <br/>
                    In der mittleren Spalte kannst du sehen, welche Mitarbeiter*innen sich in die Schicht eingetragen haben. Unter dem Namen der Person steht außerdem ihre Erfahrung (Anfänger, Fortgeschritten, Experte) und die Anzahl der zugeteilten / maximalen Schichten. 
                    <br/>
                    Auf der rechten Seite sind die eingeteilten Mitarbeiter*innen zu sehen. Um Svea aus der Schicht zu entfernen, klick einfach auf das Symbol rechts neben ihrem Namen. Nun sieht die Schicht wie folgt aus:
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines Schichtplans mit Bewerbern"
                            src={AnpassungVornehmen}
                            title="Plan mit Bewerbern"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    <p className="lead">
                    Um den Plan wieder vollständig zu befüllen, klicke auf einen anderen Bewerber und ziehe die Person per Drag & Drop auf die rechte Seite. Anschließend klickst du auf „Änderungen übernehmen“. Dein Schichtplan ist nun fertig – gehe deshalb oben rechts auf „Aktualisieren“, um deine Änderungen zu speichern. Dein fertiger Plan sieht nun so aus:
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines Schichtplans mit Bewerbern"
                            src={PlanNachAnpassungen}
                            title="Plan mit Bewerbern"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    </section>


                    <section className="section pt-7" id={"next"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                    Im nächsten Artikel zeige ich dir, wie du deinen fertigen Plan mit deinem gesamten Team teilst. Deine Mitarbeiter*innen können somit den Plan einsehen und wissen jederzeit und von überall aus Bescheid, wann sie arbeiten müssen.
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
export default Anpassungen;