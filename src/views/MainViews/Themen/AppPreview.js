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
import LandingNavBar from "../../../components/Navbars/LandingNavbar";
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_APPPREVIEW_DESCRIPTION, THEMEN_APPPREVIEW_TITLE} from "../../../constants/MetaTexts";
import Uebersicht from "../../../assets/img/app/V2/ÜbersichtV2-Smartphone.png";
import Eintragen from "../../../assets/img/app/V2/Eintragen-Plan.png";
import Plan from "../../../assets/img/app/V2/Schichtplan-Smartphone.png";
import Tauschmöglichkeit from "../../../assets/img/app/V2/App-tauschanfrage-smartphone.png";
import PreviewThumb from "../../../assets/img/app/V2/AppPreview.jpg";
import ThemenSlider from "./ThemenSlider";




function AppPreview (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/app-preview";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_APPPREVIEW_TITLE}</title>
          <meta name="description" content={THEMEN_APPPREVIEW_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/app-preview" />
          <meta property="og:title" content="Staffbite - App Preview"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir unsere neuesten Entwicklungen bezüglich der Staffbite Apps."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/app-preview"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={PreviewThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - App Preview"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir unsere neuesten Entwicklungen bezüglich der Staffbite Apps."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/app-preview"></meta>
          <meta property="twitter:image" content={PreviewThumb}></meta>
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
                        <h1>Preview: Staffbite-Apps bald verfügbar</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin zusammen 😊
                    <br/>
                    <br/>
                    In den letzten zwei Wochen war es etwas ruhiger auf unserem Blog. Wir hatten aber auch einen guten Grund: Wir haben die letzten Wochen intensiv an den Staffbite-Apps gearbeitet. Wir werden in den nächsten Tagen mit den ersten Tests mit einigen ausgewählten Kunden starten. 
                    <br/>
                    <br/>
                    Der offizielle Release der Apps ist für Mitte April geplant. Wenn du so lange nicht warten willst, schreib uns direkt und erhalte Zugang zur Beta. Wir freuen uns über deine Nachricht und bieten dir im Gegenzug auch zwei zusätzliche Monate im kostenlosen Probemonat an. Insgesamt bekommst du also 3 Monate kostenlos.
                    <br/>
                    <br/>
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
                    
                    <p className="lead">
                    <br/>
                    Kommen wir jetzt aber zum Thema. Was kann die App und wie wird sie aussehen?
                    <br/>                
 
                    <br/>
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/app-preview#uebersicht">
                      Übersicht
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/app-preview#eintragen">
                      Eintragen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/app-preview#schichtplan">
                      Schichtplan
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/app-preview#tauschanfragen">
                      Tauschanfragen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/app-preview#zusammenfassung">
                      Zusammenfassung
                    </HashLink>
                    <br/>
                    </p>
                           

                    <section className="section pt-7" id={"uebersicht"}>
                    <h2>Übersicht</h2>
                    <p className="lead">
                    Wenn dein Team die Staffbite-App heruntergeladen hat, müssen sie sich mit ihren normalen Anmeldedaten einloggen. Anschließend öffnet sich dieser Bildschirm.
                    </p>


                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="4" lg="4">
                    <img
                        alt="Screenshot der Startseite der Staffbite App"
                        src={Uebersicht}
                        title="Staffbite App - Übersicht"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    <Col md="4" lg="4">
                    </Col>
                    </Row> 
                    <p className="lead">
                    Oben auf dem Startbildschirm wird der aktuelle Schichtplan gezeigt. Durch einen Klick kommst du direkt auf den Plan und kannst sehen, wann du arbeitest. Die kleine grüne Zahl oben rechts zeigt bereits an wie viele Schichten du diese Woche bekommen hast.
                    <br/>
                    Darunter wird direkt der Schichtplan für die kommende Woche angezeigt, falls bereits ein neuer Plan freigegeben wurde. Außerdem kann eingestellt werden, bis wann sich dein Team eintragen soll.
                    <br/>
                    Ganz unten kann dein Team direkt die eigenen Tauschanfragen überblicken.
                    </p>
                    </section>



                    <section className="section pt-7" id={"eintragen"}>
                    <h2>Eintragen</h2>
                    <p className="lead">
                    Wenn deine Mitarbeiter*in auf den zweiten Reiter unten in der Leiste klicken, werden die freigegebenen Schichtpläne angezeigt.
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="4" lg="4">
                    <img
                        alt="Screenshot von Schichtplan zum Eintragen"
                        src={Eintragen}
                        title="Freigegebener Schichtplan in der Staffbite App"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    <Col md="4" lg="4">
                    </Col>
                    </Row>

                    <p className="lead">
                    Durch einen Klick auf das + öffnet sich ein Fenster. Hier kann ich bestätigen, dass ich zu dieser Zeit arbeiten kann. Natürlich kann ich mich nur auf Schichten bewerben, die meiner Position entsprechen.
                    </p>
                    </section>

                    <section className="section pt-7" id={"schichtplan"}>
                    <h2>Schichtplan</h2>
                    <p className="lead">
                    Im nächsten Reiter werden die fertigen, veröffentlichten Schichtpläne angezeigt. Hier kann ich als Mitarbeiter*in jederzeit nachgucken, wann ich arbeite. 
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="4" lg="4">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={Plan}
                        title="Fertiger Schichtplan in der Staffbite App"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    <Col md="4" lg="4">
                    </Col>
                    </Row>  
                    <p className="lead">
                    Somit hat dein Team jederzeit und überall den aktuellen Schichtplan dabei. Ergeben sich Änderungen im Plan werden diese automatisch auch bei deinem Team in der App aktualisiert.
                    </p>
                    </section>

                    <section className="section pt-7" id={"tauschanfragen"}>
                    <h2>Schichten tauschen</h2>
                    <p className="lead">
                    Es kommt immer wieder vor, dass Mitarbeiter*innen doch nicht zu ihrer Schicht erscheinen können. Verhindern können wir das nicht, aber wir können euch die Arbeit erleichtern. Kann eine Mitarbeiter*in doch nicht vor Ort sein, kann die Person einfach im veröffentlichten Plan auf ihre Schicht klicken. Anschließend öffnet sich dieses Fenster.
                    </p>

                    <Row className="mt-sm-4">
                    <Col className="order-md-2" md="4" lg="4">
                        <img
                            alt="Screenshot einer Tauschanfrage innerhalb der Staffbite App"
                            src={Tauschmöglichkeit}
                            title="Schichten tauschen per App"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    <Col md="4" lg="4">
                    </Col>
                    </Row>                    

                    <p className="lead">
                    Klickt sie nun auf „Tauschanfrage senden“ taucht ihre Tauschanfrage bei allen Mitarbeiter*innen auf der Übersicht-Seite der App auf. Wenn Jemand einspringen kann, kann die Person dies direkt in der App angeben.
                    </p>
                    <br/>

                    </section>

                    <section className="section pt-7" id={"zusammenfassung"}>
                    <h2>Zusammenfassung</h2>
                    <p className="lead">
                    Die Staffbite-Apps (iOS & Android) erleichtern das Eintragen in den Schichtplan für dein Team enorm. Durch Push-Notifications kannst du außerdem deinem Team Bescheid geben, dass du einen Schichtplan fertiggestellt hast. Solche Nachrichten gehen bei WhatsApp häufig unter. 
                    <br/>
                    Dein Team hat jederzeit und überall den aktuellen Schichtplan dabei und kann sogar noch einfacher Schichten tauschen. Auf diese Weise ergibt sich eine Win-Win-Situation für dich und dein Team.
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
export default AppPreview;