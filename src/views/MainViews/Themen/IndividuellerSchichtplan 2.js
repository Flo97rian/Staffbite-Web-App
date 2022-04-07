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
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_INDIVIDUELLERSCHICHTPLAN_DESCRIPTION, THEMEN_INDIVIDUELLERSCHICHTPLAN_TITLE} from "../../../constants/MetaTexts"
import Individuell from "../../../assets/img/themen/IndividuellerSchichtplan/Individuell.png"
import FertigeVorlage from "../../../assets/img/themen/SchichtplanVorlage/SchichtplanVorlageFertig.png"
import Qualifikation from "../../../assets/img/themen/IndividuellerSchichtplan/Vorlage-Qualifikationen.png"
import Deaktivieren from "../../../assets/img/themen/IndividuellerSchichtplan/Vorlage-Schicht-deaktivieren.png"
import Änderungen from "../../../assets/img/themen/IndividuellerSchichtplan/Vorlage-Details-Geändert.png"
import Notiz from "../../../assets/img/themen/IndividuellerSchichtplan/Vorlage-Notiz.png";
import ThemenSlider from "./ThemenSlider";


function IndividuellerSchichtplan (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/individueller-schichtplan";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_INDIVIDUELLERSCHICHTPLAN_TITLE}</title>
          <meta name="description" content={THEMEN_INDIVIDUELLERSCHICHTPLAN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/individueller-schichtplan" />
          <meta property="og:title" content="Staffbite - Dein individueller Schichtplan"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir wie du deinen Schichtplan im Detail individualisieren kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/individueller-schichtplan"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Individuell}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schichtplan Vorlage erstellen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir wie du deinen Schichtplan im Detail individualisieren kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/individueller-schichtplan"></meta>
          <meta property="twitter:image" content={Individuell}></meta>
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
                        <h1>Dein individueller Schichtplan</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin – heute zeige ich dir wie du deinen individuellen Schichtplan gestalten kannst 🙌
                    </p>
                    <p className="lead">
                        In den letzten Blogbeiträgen habe ich dir bereits gezeigt, wie du Vorlagen für deinen Schichtplan erstellst & direkt die Schichtplanung für einen ganzen Monat erledigen kannst. Falls du die Artikel noch nicht gesehen hast, kannst du das hier nachholen:
                    <br/>
                    -	<Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                    <br/>
                    -	<Link to="/themen/monatsplanung">Schichtplanung für einen ganzen Monat</Link>
                    <br/>
                    <br/>
                    Heute gehen wir ins Detail und ich zeige dir die Möglichkeiten, um deinen Schichtplan weiter zu Individualisieren. Ich nutze erneut die Vorlage, die ich in dem vorherigen Blogbeitrag erstellt habe.

                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite beim Erstellen einer Schichtplan Vorlage"
                            src={FertigeVorlage}
                            title="Fertige Schichtplan Vorlage"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <br/>
                    <h2>Mindestanforderungen einstellen</h2>
                    <p className="lead">
                    In vielen Betrieben gibt es Schichten die anspruchsvoller sind als andere. Ein klassisches Beispiel sind die Schichten am Freitagabend. Zu dieser Zeit sind oft mehr Kunden vor Ort – die Routinen müssen sitzen.
                    <br/>
                    <br/>
                    Um neue Mitarbeiter*innen nicht zu überfordern und den Ablauf vor Ort zu gewährleisten, planen die Verantwortlichen oft eher erfahrenes Personal in die Schichten ein. Mit unserer Lösung kannst du direkt festlegen, ob du bei bestimmten Schichten eine Mindestanforderung hast. Hierfür klickst du einfach auf die entsprechende Schicht. Ich nehme für dieses Beispiel die Spätschicht am Freitag.
                    </p>
                    
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite beim Auswählen der Mindestqualifikation"
                            src={Qualifikation}
                            title="Schichtdetails - Qualifikation"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    <p className="lead">
                    Durch das Auswählen der Mindestanforderung plant unser Algorithmus später bei der Befüllung deines Schichtplans nur Mitarbeiter*innen ein, die die entsprechende Qualifikation haben. Natürlich kannst du aber auch manuell zusätzliches Personal einteilen, damit immer genug Mitarbeiter*innen vor Ort sind – oder dich einfach selbst in den Plan eintragen.
                    </p>

                    <h2>Schichten deaktivieren</h2>
                    <p className="lead">
                    Es kommt immer wieder vor, dass bestimmte Schichten nicht jeden Tag benötigt werden. Nehmen wir einmal an, dass dein Betrieb am Montagmorgen geschlossen bleibt. Die restliche Woche wird die Frühschicht dennoch benötigt.
                    </p>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von Staffbite beim Bearbeiten der Schichtdetails"
                        src={Deaktivieren}
                        title="Schichtdetails - Deaktivieren"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>
                    
                    <p className="lead">
                    In diesem Fall klickst du einfach auf die Schicht, die du bearbeiten möchtest. Dieses Mal klickst du unten im Fenster auf „Deaktivieren“. Die Schicht wird in deinem Schichtplan ausgeraut. Deine Mitarbeiter*innen können sich nicht in diese Schicht eintragen. 
                    </p>                    

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von Staffbite einer fertigen Schichtplan Vorlage"
                        src={Änderungen}
                        title="Fertige Vorlage"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>
                    <h2>Notiz hinzufügen</h2>
                    <p className="lead">
                    Zuletzt möchte ich dir zeigen, wie du Notizen für eine konkrete Schicht hinzufügen kannst. Diese Notizen können deine Mitarbeiter*innen natürlich auch sehen, wenn sie sich in die Schicht eintragen. In diesem Beispiel möchte ich mein Team daran erinnern, dass sie den Betrieb am Montag abschließen müssen, wenn die Spätschicht vorbei ist. Hierfür klicke ich erneut in die entsprechende Schicht und tippe meine Notiz direkt in das Feld.
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von Staffbite einer fertigen Schichtplan Vorlage"
                        src={Notiz}
                        title="Fertige Vorlage"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>

                    <p className="lead">
                    Die Notiz ist nun gespeichert und wird deinen Mitarbeiter*innen beim Eintragen direkt angezeigt. Auf diese Weise kannst du deine individuellen Anforderungen direkt beim Erstellen deines Schichtplans berücksichtigen und musst nicht zusätzlich noch WhatsApp-Nachrichten verschicken oder deine Mitarbeiter*innen während der Schicht anrufen.
                    </p>
                    
                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p className="lead">
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!</p>
                  </Col>
              </Row>
        </Container>

        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default IndividuellerSchichtplan;