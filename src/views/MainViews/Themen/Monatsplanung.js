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
import {THEMEN_MONATSPLANUNG_DESCRIPTION, THEMEN_MONATSPLANUNG_TITLE} from "../../../constants/MetaTexts";
import Calendar from "../../../assets/img/themen/Monatsplanung/CalendarImage.png"
import VorlageFreigeben from "../../../assets/img/themen/Monatsplanung/VorlageFreigeben.png"
import FreigabeDetails from "../../../assets/img/themen/Monatsplanung/FreigabeDetails.png"
import GanzerMonat from "../../../assets/img/themen/Monatsplanung/SchichtpläneGanzerMonat.png"


function Monatsplanung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/monatsplanung";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_MONATSPLANUNG_TITLE}</title>
          <meta name="description" content={THEMEN_MONATSPLANUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/monatsplanung" />
          <meta property="og:title" content="Staffbite - Schichtplan für einen ganzen Monat"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir wie du mit deiner Vorlage einen Schichtplan für den ganzen Monat erstellen kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/monatsplanung"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Calendar}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schichtplan für einen ganzen Monat"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir wie du mit deiner Vorlage einen Schichtplan für den ganzen Monat erstellen kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/monatsplanung"></meta>
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
                        <h1>Schichtplanung für einen ganzen Monat</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin zusammen 🚀
                    </p>
                    <p className="lead">
                        In diesem Beitrag zeige ich dir, wie du deine individuelle <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage</Link> nutzen kannst, um die Planung für einen ganzen Monat vorzubereiten. Im letzten Artikel habe ich dir gezeigt, wie du deine <Link to="/themen/schichtplan-vorlage">Schichtplanvorlage erstellen</Link> kannst.
                    </p>
                    <p className="lead">
                        Um die Schichtplanung für einen ganzen Monat vorzubereiten, wählst du zunächst erneut deine Vorlage aus. Wenn du keine Anpassungen vornehmen möchtest, klickst du oben rechts auf „Schichtplan freigeben“. 🙌
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite vom Freigeben einer Schichtplan Vorlage"
                            src={VorlageFreigeben}
                            title="Vorlage Freigeben"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <br/>
                    <h2>Der erste Schichtplan</h2>
                    <p className="lead">
                        Anschließend öffnet sich dieses Fenster. Gib deinem Schichtplan einen Namen wie beispielsweise „1. Woche Januar“ und wähle im Feld darunter die entsprechende Kalenderwoche aus. Anschließend klickst du auf „Freigeben“. ✅
                    </p>
                    
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite beim Eintragen der Freigabedetails"
                            src={FreigabeDetails}
                            title="Freigabedetails"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    <h2>Die Schichtpläne für den ganzen Monat</h2>
                    <p className="lead">
                        Der vorbereitete Schichtplan taucht anschließend in deinem Reiter „Bewerbung“ auf und ist für dein gesamtes Team einsehbar. Wechsel nun zurück in deine Vorlage und führe die oben genannten Schritte erneut durch. Innerhalb von zwei Minuten bist du fertig und kannst deine vorbereiteten Schichtpläne für den ganzen Monat einsehen. 😎
                    </p>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von Staffbite beim Eintragen von Schichtdetails"
                        src={GanzerMonat}
                        title="Schichtdetails Dialog"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>


                    <p className="lead">
                        Dein Team kann die Pläne nun ebenfalls einsehen und sich für den gesamten Monat eintragen. Im nächsten Artikel zeige ich dir wie du einzelne Schichten bearbeiten und somit deinen individuellen Schichtplan jederzeit abbilden kannst. Schau doch in der Zwischenzeit einfach mal in unsere Lösung rein – ich würde mich freuen! 
                    </p>
                    
                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p className="lead">
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!</p>
                  </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Monatsplanung;