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
import {THEMEN_POSITIONEN_DESCRIPTION, THEMEN_POSITIONEN_TITLE} from "../../../constants/MetaTexts";
import PositionEinstellungen from "../../../assets/img/themen/Positionen/PositionEinstellungen.png";
import PositionTeam from "../../../assets/img/themen/Positionen/PositionTeam.png";
import PositionSchicht from "../../../assets/img/themen/Positionen/PositionSchicht.png";
import PositionThumb from "../../../assets/img/themen/Positionen/PositionenThumb.png";
import ThemenSlider from "./ThemenSlider";




function Positionen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/positionen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_POSITIONEN_TITLE}</title>
          <meta name="description" content={THEMEN_POSITIONEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/positionen" />
          <meta property="og:title" content="Staffbite - Positionen erstellen und festlegen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir wozu Positionen im Schichtplan gut sind und wie du sie in Staffbite erstellen und nutzen kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/positionen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={PositionThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Positionen erstellen und festlegen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir wozu Positionen im Schichtplan gut sind und wie du sie in Staffbite erstellen und nutzen kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/tauschanfragen"></meta>
          <meta property="twitter:image" content={PositionThumb}></meta>
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
                        <h1>Positionen erstellen und festlegen</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Hallo und herzlich Willkommen zum neuen Beitrag 😊
                    <br/>
                    <br/>
                    Im heutigen Blogbeitrag möchte ich dir näherbringen, wie du Rollen und Positionen für deinen Betrieb bei Staffbite festlegen kannst, damit du deinen perfekten Schichtplan erhältst. 
                    <br/>
                    
                    Zunächst möchte ich dir aber das Konzept dahinter erklären, damit du entscheiden kannst, ob Rollen und Positionen innerhalb des Schichtplans für dich überhaupt nötig und sinnvoll sind. 
                    <br/>
                    <br/>
                    
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/positionen#basics">
                      Sollte ich Positionen definieren?
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/positionen#erstellen">
                      Positionen erstellen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/positionen#festlegen">
                      Positionen festlegen beim Einladen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/positionen#schicht">
                      Positionen und Schichten
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/positionen#next-steps">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    </p>       

                    <section className="section pt-7" id={"basics"}>
                    <h2>Sollte ich Positionen definieren und was bringt mir das?</h2>
                    <p className="lead">
                    Jeder Betrieb ist einzigartig. Aus diesem Grund kannst du selbst entscheiden, ob du Positionen für deine Mitarbeiter*innen festlegen möchtest oder nicht. Grundsätzlich kannst du dich daran orientieren, ob deine Mitarbeiter*innen größtenteils dasselbe machen.
                    <br/>
                    <br/>
                    Wenn du beispielsweise die Schichtplanung für ein kleines Café erledigst und du lediglich dafür sorgen möchtest, dass immer genug Mitarbeiter*innen vor Ort sind, da sich Team eigenständig organisiert, brauchst du wahrscheinlich keine unterschiedlichen Positionen festlegen. Beim Einladen deines Teams gibst du einfach allen Mitarbeitern die Standard-Position.
                    <br/>
                    <br/>
                    Wenn du einen größeren Betrieb wie beispielsweise ein Restaurant mit 30 Angestellten hast, musst du sicherstellen, dass sowohl genügend Personal für den Service, die Theke als auch in der Küche vorhanden sind. In diesem Fall reicht es nicht aus, wenn fünf Personen pro Schicht anwesend sind, da alle Positionen innerhalb deines Betriebs abgedeckt sein müssen. Mit Staffbite kannst du sicherstellen, dass immer ausreichend Mitarbeiter*innen der entsprechenden Position im Schichtplan eingetragen werden.
                    <br/>
                    </p>


                    </section>



                    <section className="section pt-7" id={"erstellen"}>
                    <h2>Positionen erstellen</h2>
                    <p className="lead">
                    Um die benötigten Positionen für deinen Betrieb zu erstellen, gibt es verschiedene Möglichkeiten. Ich empfehle dir, dass du, nachdem du dich bei Staffbite eingeloggt hast, in die Einstellungen gehst. Dort findest du unten die Zeile „Positionen bearbeiten“.
                    <br/>
                    Klicke einfach auf „Position erstellen“ und gib den Namen der benötigten Position ein. Bestätige deine Angabe anschließend mit Enter oder klicke erneut auf „Position erstellen“.
                    <br/>
                    <br/>
                    Du kannst beliebig viele Positionen erstellen, um deine individuellen Anforderungen genau abzubilden. Denk auch daran am Ende auf „Änderungen speichern“ zu klicken 😉
                    <br/>
                    </p>


                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PositionEinstellungen}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    </section>

                    <section className="section pt-7" id={"festlegen"}>
                    <h2>Positionen festlegen beim Einladen</h2>
                    <p className="lead">
                    Du kannst ebenfalls Positionen erstellen und festlegen, während du dein Team zu Staffbite einlädst. Hierfür wechselst du einfach in den Reiter „Team“ und klickst oben rechts auf „Mitarbeiter einladen“. Anschließend öffnet sich dieses Fenster. Hier gibst du die wichtigsten Informationen der Person ein.
                    <br/>
                    Wenn du bereits Positionen in den Einstellungen erstellt hast, kannst du diese nun einfach auswählen. Falls nicht, kannst du die benötigten Positionen immer noch erstellen. Klicke hierfür einfach auf „Position erstellen“ und gib den Namen der Position ein. Klicke anschließend erneut auf „Position erstellen“, um die neue Position zu speichern.
                    <br/>
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PositionTeam}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="60%"
                    />
                    </Col>
                    </Row> 

                    <br/>
                    <p className="lead">
                    Wenn du zufrieden mit den Positionen (du kannst einer Person auch mehrere Positionen zuweisen) bist, klicke unten rechts auf „Einladen“. Dein Teammitglied erhält eine E-Mail von uns und kann sich anschließend direkt bei Staffbite im Web oder mit unserer kostenlosen Mitarbeiter-App anmelden. 
                    </p>
                    </section>

                    <section className="section pt-7" id={"schicht"}>
                    <h2>Position festlegen in einer Schicht</h2>
                    <p className="lead">
                    Nun hast du die Positionen, die für deinen Betrieb relevant sind, erstellt und dein Team eingeladen. Damit diese Informationen in deinem Schichtplan berücksichtigt werden können, musst du dies beim Erstellen einer Schicht festlegen.
                    <br/>
                    <br/>
                    Gehe hierzu in den Reiter „Schichtplan“ und wähle eine Vorlage aus. Falls du noch keine Vorlage erstellt hast, schau dir doch einmal diesen Beitrag zum Erstellen deines individuellen Schichtplans an:
                    <a href="https://www.staffbite.de/themen/schichtplan-vorlage"> Vorlage erstellen</a>
                    <br/>
                    Klicke auf eine der Schichten, die links im Plan angezeigt werden. Ich nehme hier die Schicht „Früh“ von 07:00 – 14:30 Uhr. Jetzt kannst du die Schicht im Detail bearbeiten. Du kannst den Namen, den Start und das Ende, die benötigte Anzahl Mitarbeiter*innen und die Position festlegen.
                    <br/>
                    <br/>
                    Jede von dir erstellte Position wird hier aufgeführt und du kannst somit festlegen welche Art von Teammitglied du benötigst. Du solltest jedoch beachten, dass sich nur die Mitarbeiter*innen in diese Schicht eintragen können, die der Position entsprechen. Somit stellen wir sicher, dass nicht beispielsweise ein Fahrer im Service eingeteilt wird.
                    <br/>
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PositionSchicht}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>  

                    </section>

                    <section className="section pt-7" id={"next-steps"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                    Wenn du mehr über Staffbite wissen möchtest, schreib uns einfach bei WhatsApp unter 0157 30644650 oder per Mail an daniel@staffbite.de 😊
                    <br/>
                    Falls du Staffbite einfach selbst mal ausprobieren möchtest, kannst du direkt in unseren kostenlosen Probemonat starten.
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
export default Positionen;