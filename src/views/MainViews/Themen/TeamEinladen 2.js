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
  Col,
  Button
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_EINTRAGEN_DESCRIPTION, THEMEN_EINTRAGEN_TITLE} from "../../../constants/MetaTexts";
import ÜbersichtTeamHightlight from "../../../assets/img/themen/TeamEinladen/Übersicht-Team-Highlight.png";
import TeamÜbersichtMAHighlight from "../../../assets/img/themen/TeamEinladen/Team-Übersicht-MA-Highlight.png";
import MAEinladenDetails from "../../../assets/img/themen/TeamEinladen/MA-Einladen-Details.png";
import TeamÜbersichtFloHighlight from "../../../assets/img/themen/TeamEinladen/Team-Übersicht-Flo-Highlight.png";
import TeamEinladenThumb from "../../../assets/img/themen/TeamEinladen/TeamEinladenThumb.png";
import ThemenSlider from "./ThemenSlider";




function TeamEinladen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/team-einladen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_EINTRAGEN_TITLE}</title>
          <meta name="description" content={THEMEN_EINTRAGEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/team-einladen" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Team einladen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du dein Team zu Staffbite einlädst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/team-einladen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={TeamEinladenThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Team einladen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie du dein Team zu Staffbite einlädst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/team-einladen"></meta>
          <meta property="twitter:image" content={TeamEinladenThumb}></meta>
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
                        <h1>Schritt für Schritt: Team einladen</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin zusammen 😉
                    <br/>
                    <br/>
                    Heute zeige ich dir in unserer Reihe der Schritt für Schritt-Anleitungen wie du dein Team zu Staffbite einlädst.
                    <br/>
                    Nachdem du dein Team eingeladen hast, bekommen deine Mitarbeiter*innen eine E-Mail von uns. In dieser Mail stehen die nötigen Login-Daten. Deine Mitarbeiter*innen werden aufgefordert ein eigenes Passwort festzulegen. Anschließend können sie sich in deinen Schichtplan eintragen.
                    <br/>
                    <br/>
                    Wie dein Team sich eintragen kann, habe ich im letzten Beitrag bereits gezeigt. Hier findest du die Anleitung für dein Team:
                    <br/>
                    - <Link to="/themen/eintragen">In den Schichtplan eintragen</Link>
                    <br/>

                    
                    <br/>
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/team-einladen#einladen">
                      Team einladen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/team-einladen#next-steps">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    </p>       

                    
                    <section className="section pt-7" id={"eintragen"}>
                    <h2>Team einladen</h2>
                    <p className="lead">
                    Um dein Team einzuladen, musst du dich registriert und angemeldet haben. Falls du noch nicht registriert bist, klicke einfach unten auf den Button und probiere Staffbite kostenlos aus!
                    </p>
                    <Row className="">
                          <Col xs="12" lg="6" className="mt-2">
                        <Link to="/signup">
                        <Button className="btn-icon btn-3" color="success" type="button"
                          ><p className="p-0 m-0">Kostenlos ausprobieren</p></Button>
                        </Link>
                        </Col>
                        </Row>

                    <br/>
                    <p className="lead">
                    Wenn du dich angemeldet hast, klicke oben in den Reiter „Team“.
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={ÜbersichtTeamHightlight}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>  
                    

                    <p className="lead">
                    In dieser Übersicht taucht später dein gesamtes Team auf. Wenn du noch keine Mitarbeiter*innen eingeladen hast, ist die Liste noch leer. Das wird sich aber gleich ändern. Klick einfach auf „Mitarbeiter einladen“.
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines fertigen Schichtplans mit Kasten um den Button zur Veröffentlichung"
                            src={TeamÜbersichtMAHighlight}
                            title="Fertiger Schichtplan zur Veröffentlichung"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                    Anschließend öffnet sich dieses Fenster. Gib zunächst den vollen Namen der Person ein, die du einladen willst.
                    <br/>
                    Zusätzlich wird die E-Mail-Adresse der Person benötigt, damit wir die Einladung zu Staffbite verschicken können.
                    <br/>
                    Wenn du Schichten hast, die Mitarbeiter*innen mit mehr Erfahrung benötigen, kannst du hier festlegen wie viel Erfahrung die Person hat. Falls das bei dir keine Rolle spielt, kannst du hier einfach „Anfänger“ stehen lassen. Diese Information sind nur für dich und können von deinem Team nicht eingesehen werden.
                    <br/>
                    <br/>
                    Jetzt kommt ein wichtiger Punkt: Gib ein wie viele Schichten pro Woche die Person arbeiten soll. Je nachdem ob du Voll- und Teilzeitkräfte oder Mini-Jobber beschäftigst, kann dies natürlich variieren. Der Algorithmus zur automatisierten Befüllung plant die Person maximal so oft ein, wie du hier angegeben hast. Trotzdem hast du noch die Möglichkeit die Person später manuell häufiger einzuplanen.
                    <br/>
                    Zuletzt gibst du noch die Position der Person ein. Falls du keine verschiedenen Positionen hast, kannst du hier einfach den Standard „Leitung“ auswählen. Um neue Positionen festzulegen, kannst du einfach auf „Position erstellen“ klicken.
                    </p>
                    <br/>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={MAEinladenDetails}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <p className="lead">
                    Nachdem du auf „Einladen“ geklickt hast, erscheint die Person direkt in deiner Übersicht. Wiederhole diese Schritte einmalig für jedes Teammitglied, damit dein gesamtes Team auf deine freigegebenen Schichtpläne zugreifen kann. Bei Bedarf kannst du die eingegebenen Informationen jederzeit ändern. Wenn du fertig bist, sieht deine Team Übersicht in etwa so aus:
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={TeamÜbersichtFloHighlight}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    </section>

                    <section className="section pt-7" id={"next-steps"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                    Dein Team ist nun eingeladen. Falls du noch keine Schichtpläne erstellt hast, wird es nun Zeit. Schau dir dazu gerne unsere anderen Schritt für Schritt-Anleitungen an oder probiere es einfach selbst aus.
                    <br/>
                    </p>

                    <Row className="">
                          <Col className="mt-2">
                        <Link to="/signup">
                        <Button className="btn-icon btn-3" color="success" type="button"
                          ><p className="p-0 m-0">Kostenlos ausprobieren</p></Button>
                        </Link>
                        <Link to="/themen">
                        <Button className="btn-icon ml-sm-2 btn-3" color="info" type="button"
                        ><p className="p-0 m-0">Mehr erfahren</p></Button>
                        </Link>
                        </Col>
                        </Row>
                    </section>
                  </Col>
              </Row>
        </Container>
        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default TeamEinladen;