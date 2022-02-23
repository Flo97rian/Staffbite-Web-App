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
import {THEMEN_TAUSCHANFRAGEN_DESCRIPTION, THEMEN_TAUSCHANFRAGEN_TITLE} from "../../../constants/MetaTexts";
import PlanDZSicht from "../../../assets/img/themen/Tauschanfragen/PlanDZSicht.png";
import TauschPOP from "../../../assets/img/themen/Tauschanfragen/TauschPOP.png";
import PlanMitAnfrage from "../../../assets/img/themen/Tauschanfragen/PlanMitAnfrage.png";
import PlanMitTauschmöglichkeit from "../../../assets/img/themen/Tauschanfragen/PlanMitTauschmöglichkeit.png";
import TeamEinladenThumb from "../../../assets/img/themen/TeamEinladen/TeamEinladenThumb.png";
import ThemenSlider from "./ThemenSlider";




function Tauschanfragen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/tauschanfragen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_TAUSCHANFRAGEN_TITLE}</title>
          <meta name="description" content={THEMEN_TAUSCHANFRAGEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/tauschanfragen" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Schichten tauschen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie dein Team Tauschanfragen stellen kann."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/tauschanfragen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={TeamEinladenThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Schichten tauschen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie dein Team Tauschanfragen stellen kann."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/tauschanfragen"></meta>
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
                        <h1>Schritt für Schritt: Schichten tauschen</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Hallo und herzlich Willkommen zum neuen Beitrag 😊
                    <br/>
                    <br/>
                    Im heutigen Artikel möchte ich dir zeigen, wie dein Team einfach & unkompliziert eine Tauschanfrage stellen kann. 
                    <br/>
                    <br/>
                    Normalerweise findet dies in WhatsApp-Gruppen statt. Dort bricht ein Durcheinander aus und viele Informationen gehen verloren, sobald der Schichtplan veröffentlicht wird. Plötzlich fällt einigen Mitarbeiter*innen ein, dass sie doch nicht arbeiten können, da etwas dazwischengekommen ist. 
                    <br/>
                    <br/>
                    Für diese Person muss natürlich ein Ersatz gefunden werden, da sonst zu wenig Personal im Betrieb ist. Wir bieten hier Abhilfe. Durch einen schlanken und einfachen Prozess kann dein Team eine Tauschanfrage stellen. Wie das funktioniert, zeige ich dir im Folgenden.
                    <br/>
                    <br/>
                    Wenn du zunächst wissen möchtest, wie dein Team sich überhaupt in den Schichtplan eintragen kann, schau dir gerne den letzten Beitrag unseres Blogs an:
                    <br/>
                    - <Link to="/themen/eintragen">In den Schichtplan eintragen</Link>
                    <br/>

                    
                    <br/>
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/tauschanfragen#vorbereitung">
                      Vorbereitung
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/tauschanfragen#stellen">
                      Tauschanfrage stellen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/tauschanfragen#next-steps">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    </p>       

                    <section className="section pt-7" id={"vorbereitung"}>
                    <h2>Vorbereitung</h2>
                    <p className="lead">
                    Damit dein Team Schichten tauschen kann, muss ein fertiger Schichtplan veröffentlicht worden sein. Ich nutze in diesem Beispiel einen Schichtplan, den ich in den letzten Teilen der Schritt für Schritt-Anleitungen erstellt, befüllt und veröffentlicht habe. Der Schichtplan sieht, aus der Sicht des Mitarbeiters Daniel Zellmann, folgendermaßen aus:
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PlanDZSicht}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row> 
                    </section>



                    <section className="section pt-7" id={"stellen"}>
                    <h2>Tauschanfrage stellen</h2>
                    <p className="lead">
                    Daniel hat nun festgestellt, dass er am Freitag um 15 Uhr eine Klausur schreibt und somit nicht arbeiten kann. Um einen Ersatz zu finden, muss er nun diese einfachen Schritte tun. Zunächst klickt er auf seine Schicht, die er tauschen möchte. In diesem Fall die Freitagsschicht.
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={TauschPOP}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row> 

                    <br/>
                    <p className="lead">
                    Hier werden ihm noch einmal die Schichtdetails angezeigt. Er muss nun auf „Tauschanfrage stellen“ klicken. Die Anfrage wird automatisch erstellt und taucht anschließend direkt unter dem Schichtplan auf. 
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={PlanMitAnfrage}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>  
                    

                    <p className="lead">
                    Die Anfrage ist für alle Mitarbeiter*innen ebenfalls sichtbar.
                    <br/>
                    Lisa entscheidet sich dazu die Schicht zu übernehmen, da sie diese Woche noch Zeit hat und gerne ein paar Überstunden sammeln möchte. Sie meldet sich ebenfalls mit ihrem Account bei Staffbite ein und klickt auf „Bewerben“.
                    <br/>
                    <br/>
                    Die Voraussetzungen für den Tausch sind nun gegeben. Ohne die Zustimmung der Verantwortlichen Person im Betrieb (also vermutlich dir) wird der Tausch jedoch nicht durchgeführt. Diesen Sicherheitsmechanismus haben wir eingebaut, damit du immer Bescheid weißt was vor Ort passiert. Außerdem kannst du somit verhindern, dass beispielsweise nur Anfänger in deinen stressigsten Schichten arbeiten und untergehen.
                    <br/>
                    <br/>
                    Du siehst nun unter dem aktuellen Schichtplan die Anfrage von Daniel. Daneben wird Lisa angezeigt, da sie die Tauschanfrage angenommen hat. Nun kannst du den Tausch annehmen oder ablehnen. 
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines fertigen Schichtplans mit Kasten um den Button zur Veröffentlichung"
                            src={PlanMitTauschmöglichkeit}
                            title="Fertiger Schichtplan zur Veröffentlichung"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                    Wenn du der Meinung bist, dass Lisa ein guter Ersatz für Daniel ist, kannst du einfach auf „Annehmen“ klicken. Der Schichtplan wird automatisch für dich und dein gesamtes Team aktualisiert.
                    <br/>
                    </p>
                    <br/>

                    </section>

                    <section className="section pt-7" id={"next-steps"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                    Die Schichten wurden getauscht und dein Team ist glücklich. Auf diese Weise kannst du jede Menge Zeit und Nachrichten einsparen. 
                    <br/>
                    Probiere Staffbite doch direkt kostenlos aus und mach dir dein eigenes Bild!
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
export default Tauschanfragen;