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
import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_SCHICHTPLANERSTELLEN_DESCRIPTION, THEMEN_SCHICHTPLANERSTELLEN_TITLE} from "../../../constants/MetaTexts";
import Possibilities from "../../../assets/img/themen/SchichtplanErstellen/Possibilities.png"
import PlanABC from "../../../assets/img/themen/SchichtplanErstellen/PlanABC.png"
import ThemenSlider from "./ThemenSlider";


function GrundlagenSchichtplan (props) {
  let mainContent = useRef("mainContent")
  const [showChapters, setShowChapters] = useState(false);
  useEffect(() => {
    pageViewsTracking()
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  function pageViewsTracking () {
    const pathname = "/themen/schichtplan-erstellen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <div ref={mainContent}>
        <Helmet>
          <title>{THEMEN_SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={THEMEN_SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/schichtplan-erstellen" />

          <meta property="og:title" content="Staffbite - Wie erstelle ich einen Schichtplan? Papier, Excel oder Software?"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/schichtplan-erstellen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Possibilities}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Wie erstelle ich einen Schichtplan? Papier, Excel oder Software?"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/schichtplan-erstellen"></meta>
          <meta property="twitter:image" content={Possibilities}></meta>
          <meta property="twitter:type" content="blog"></meta>

        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }} />
      {/* Page content */}
      <Container className="pt-5 mt-8" fluid>
        <Row>
          <Col xs="0" md="3">
          </Col>
          <Col xs="12" md="7">
          <Row className="mt-4 text-center">
                <Col>
                    <small>Lesedauer ca. 8 Minuten</small>
                </Col>
            </Row>
            <Row className="mt-4 text-center">
                <Col>
                    <h1>Definition & Regelungen: Die Grundlagen der Schichtplanung </h1>
                </Col>
            </Row>
            <Row className="mt-6">
                <Col>
                    <h2 onClick={() => setShowChapters(!showChapters)}><i className={showChapters ? "fas fa-angle-down mr-2" : "fas fa-angle-right mr-2"}></i>Inhaltsverzeichnis</h2>
                    <div hidden={!showChapters} className="ml-2">
                      <h3><a href="#einleitung">Was ist ein Schichtplan? Die Definition</a></h3>
                      <h3><a href="#zusammenfassung">Wie funktioniert Schichtplanung?</a></h3>
                      <h3><a href="#zusammenfassung">Wer erstellt Schichtpläne?</a></h3>
                      <h3><a href="#zusammenfassung">Welche Modelle gibt es?</a></h3>
                      <h3><a href="#zusammenfassung">Wie lange vorher muss ein Schichtplan bekannt sein?</a></h3>
                      <h3><a href="#zusammenfassung">Rechtliche Vorgaben</a></h3>
                      <h3><a href="#zusammenfassung">Gilt für den Schichtplan Datenschutz?</a></h3>
                      <h3><a href="#zusammenfassung">Zusammenfassung</a></h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                        <p className="lead">
                        Das Thema Schichtplanung ist keineswegs eine neue Entdeckung und hat sich über die Jahre einen undankbaren und frustrierenden Ruf aufgebaut.
                        Dennoch war es früher und ist es heute, eine Notwendigkeit der viele Unternehmen gegenüber stehen. Für viele Unternehmen ist die Erstellung und die Arbeit mit einem Schichtplan essenziell für das eigene Fortbestehen.
                        In diesem Artikel erhälst du einen Einblick, was ein Schichtplan ist & wofür Schichtpläne genutzt werden. Worauf bei der Erstellung des Schichtplans zu achten ist und welche Modelle zur Schichtplanung bereits existieren.
                        </p>
                       
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                        <h2>Was ist ein Schichtplan? Die Definition</h2>
                        <p className="lead">
                        <b>Die Definition:</b>
                        <br/>
                        <Card>
                        <i>"Der <b>Dienstplan</b> bzw. <b>Schichtplan</b> ist ein <b>Instrument der Personaleinsatzplanung</b> in Betrieben und Unternehmen. Er soll sicherstellen, dass der mittels des <b>Einsatzes von Arbeitskräften verfolgte Zweck erreicht</b> wird und die Zweckerreichung <b>den Qualitätsanforderungen entspricht</b>."</i>
                        </Card>
                        <b>Die Bedeutung:</b>
                        <br/>
                          Ein Dienstplan bzw. Schichtplan ist ein <b>Werkzeug der Personalplanung</b>. Unternehmen nutzen Schichtpläne, um ihr <b>Team zu organisieren</b>. Der Gedanke ist eigentlich recht einfach. <b>Wie viele Mitarbeiter</b> und <b>mit welchen Fähigkeiten</b> werden benötigt, damit das Unternehmen betriebsfähig ist. Um diese Frage zu beantworten sind einige Informationen über das Unternehmen notwendig.
                        </p>
                       
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                        <h2>Wie funktioniert Schichtplanung? Die wichtigsten Fragen</h2>
                        <p className="lead">
                        Die <b>Schichtplanung ist ein individueller Prozess</b>, der sich in mehrere kleinere Aufgaben aufteilt. Zu Beginn sind einige grundlegende Informationen über das Unternehmen notwendig.
                        Diese Informationen bilden die Rahmenbedingungen für den Schichtplan im jeweiligen Betrieb. 
                        <br/>
                        Die <b>wichtigsten Fragen</b> die sich ein Schichtplaner zu Beginn stellen sollte:
                        <br/>
                        <br/>
                        <ul>
                          <li>
                            <b>Wann</b> ist mein Betrieb <b>geöffnet</b>?
                          </li>
                          <li>
                            <b>Welche Schichten</b> habe ich zu besetzen?
                          </li>
                          <li>
                            <b>Welche Qualifikationen</b> benötige ich <b>in welcher Schicht</b>?
                          </li>
                          <li>
                            <b>Welche Qualifikationen</b> haben meine Mitarbeiter?
                          </li>
                          <li>
                            <b>Wie viele Mitarbeiter</b> stehen zur Verfügung?
                          </li>
                          <li>
                            <b>Wie oft</b> kann ich meine Mitarbeiter <b>einteilen</b>?
                          </li>
                        </ul>
                        <br/>
                        Wer diese Fragen für sich beantworten kann, kennt bereits die Rahmenbedingungen für seinen Schichtplan. 
                        Je nach Markt und Branche kann es jedoch schwierig sein, diese Fragen konkret zu beantworten.
                        Gibt es saisonale Schwankungen oder akute Änderungen im Bedarf/Verfügbarkeit der Mitarbeiter?
                        Beispiel: Während der Corona-Pandemie mussten viele Unternehmen sehr kurzfristig ihre Mitarbeiter in Kurzarbeit schicken. 
                        Trotz bestehender Unsicherheiten, hilft die Beantwortung dieser Fragen, eine Grundlage für die Schichtplanung im jeweiligen Betrieb zu legen.
                        Der erste Schritt ist geschafft. 
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Wer erstellt Schichtpläne?</h2>
                        <p className="lead">
                          Grundsätzlich wird ein Schichtplan von dem jeweiligen Arbeitgeber erstellt. 
                          Bei größeren Betrieben ist in der Regel die Personalabteilung oder die Bereichsleitung für die Erstellung zuständig. 
                          In kleineren Betrieben übernimmt häufig der Inhaber oder ein erfahrener Mitarbeiter die Erstellung des Schichtplans. 
                          <br/>
                          <br/>
                          Bei der Erstellung übt die verantwortliche Person das sog. <b>Weisungsrecht</b> des Arbeitgebers, nach <b>§106 Satz 1 GewO</b>, aus. 
                          Das Weisungsrecht konkretisiert <b>wann</b> ein Mitarbeiter die vereinbarte Arbeitsleistung zu erbringen hat.
                          <br/>
                          <br/>
                          <h3>Schichtplaner nach Größe von Betrieben:</h3>
                          Wer ist für die Schichtplanung in welcher Unternehmensgröße zuständig?
                          <br/>
                          <br/>
                          <Row className="content-center">
                            <Col xs="12" md="6">
                              Kleine & Mittlere Betriebe:
                              <br/>
                              <ul>
                                <li>
                                  Inhaber
                                </li>
                                <li>
                                  Geschäftsführer
                                </li>
                                <li>
                                  Festangesteller
                                </li>
                                <li>
                                  Erfahrener Mitarbeiter
                                </li>
                              </ul>
                            </Col>
                            <Col xs="12" md="6">
                              Große Betriebe:
                              <br/>
                              <ul>
                                <li>
                                  Personalabteilung
                                </li>
                                <li>
                                  Bereichsleiter
                                </li>
                                <li>
                                  Abteilungsleiter
                                </li>
                              </ul>
                            </Col>
                          </Row>
                          <br/>
                          <br/>
                          <h3>Schichtplanung nach Arten von Betrieben:</h3>
                          Welche Arten von Unternehmen benutzen Schichtpläne um sich zu organisieren?
                          <br/>
                          <br/>
                          <Row className="">
                            <Col xs="12" md="4">
                              <ul>
                                <li>
                                  Restaurants
                                </li>
                                <li>
                                  Bars
                                </li>
                                <li>
                                  Cafees
                                </li>
                                <li>
                                  Bäcker
                                </li>
                              </ul>
                            </Col>
                            <Col xs="12" md="4">
                              <ul>
                                <li>
                                  Pflege (ambulant & stationär)
                                </li>
                                <li>
                                  Krankenhäuser
                                </li>
                                <li>
                                  Arztpraxen
                                </li>
                                <li>
                                  Rettungsdienst
                                </li>
                              </ul>
                            </Col>
                            <Col xs="12" md="4">
                              <ul>
                                <li>
                                  Kita
                                </li>
                                <li>
                                  Einzelhändler
                                </li>
                                <li>
                                  Fitnessstudios
                                </li>
                                <li>
                                  ...
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Welche Modelle gibt es?</h2>
                        <p className="lead">
                        Diagramm
                        Modelle erklären
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Wie lange vorher muss ein Schichtplan bekannt sein?</h2>
                        <p className="lead">
                        Zitate
                        gesetzliche Regelungen
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Rechtliche Vorgaben</h2>
                        <p className="lead">
                        <b>Arbeitszeitgesetz (ArbZG)</b>
                        <br/>
                          Das ArbZG legt Mindeststandards zwischen Arbeitgeber und Arbeitnehmer fest. Diese Mindeststandards sind verbindlich und dient dem Gesundheitsschutz der Arbeitnehmer. Die Bestimmungen sind gesetzlich festgeschrieben.
                        <br/>
                        Unter diese Bestimmungen fallen:
                        <br/>
                        <br/>
                        <b>Werktägliche Höchstarbeitszeit (§ 3 ArbZG)</b>
                        <br/>
                          In der Regel darf die werktägliche Arbeitszeit von acht Stunden nicht überschritten werden. 
                          Eine Außnahme besteht jedoch, wenn innerhalb von sechs Monaten oder 24 Wochen im Durchschnitt acht Stunden nicht überschritten wurden. 
                          In diesem Fall kann die wöchentliche Arbeitszeit auf zehn Stunden verlängert werden.
                        <br/>
                        <br/>
                        <b>Ruhepausen (§ 4 ArbZG)</b>
                        <br/>
                        Beträgt die Arbeitszeit unter sechs Stunden muss keine Pause gewährt werden. 30 Minuten Pause ist dem Mitarbeiter einzuräumen, wenn die Arbeitszeit zwischen sechs und neun Stunden beträgt. Geht die Arbeitsziet über neuen Stunden hinaus, ist eine Pause von 45 Minuten einzuräumen.
                        <br/>
                        <br/>
                        <b>Ruhezeiten (§ 5 ArbZG)</b>
                        <br/>
                        Moin
                        <br/>
                        <br/>
                        <b>Nachtarbeit (§ 6 ArbZG)</b>
                        <br/>
                        Moin
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Gilt für den Schichtplan Datenschutz?</h2>
                        <p className="lead">
                        Zitate
                        gesetzliche Regelungen
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2>Zusammenfassung</h2>
                        <p className="lead">
                        Zitate
                        gesetzliche Regelungen
                        </p>
                       
                </Col>
            </Row>
            <Row className="pb-0">
                <Col className="order-md-2" md="12" lg="6">
                        <img
                            alt="Tafel mit drei Plänen"
                            src={PlanABC}
                            title="PlanABC"
                            height="90%"
                            width="90%"
                        />
                </Col>
            </Row>
            </Col>
            <Col xs="0" md="2"></Col>
        </Row>
        <ThemenSlider/>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default GrundlagenSchichtplan;