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
import {THEMEN_SCHICHTPLANVORLAGE_DESCRIPTION, THEMEN_SCHICHTPLANVORLAGE_TITLE} from "../../../constants/MetaTexts";
import SchichtplanVorlageThumbnail from "../../../assets/img/themen/SchichtplanVorlageThumbnail.png"
import VorlageMetaInfos from "../../../assets/img/themen/VorlageMetaInfos.png"
import BasicPlanVorlage from "../../../assets/img/themen/GrundlegenderPlanVorlage.png"
import Schichtdetails from "../../../assets/img/themen/Schichtdetailseintragen.png"
import FertigeVorlage from "../../../assets/img/themen/SchichtplanVorlageFertig.png"




function Schichtplanvorlage (props) {
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/schichtplanvorlage";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_SCHICHTPLANVORLAGE_TITLE}</title>
          <meta name="description" content={THEMEN_SCHICHTPLANVORLAGE_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/schichtplanvorlage" />
          <meta property="og:title" content="Staffbite - Schichtplan Vorlage erstellen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir wie du eine Vorlage für deinen Schichtplan erstellen kannst."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/schichtplanvorlage"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={SchichtplanVorlageThumbnail}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schichtplan Vorlage erstellen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir wie du eine Vorlage für deinen Schichtplan erstellen kannst."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/schichtplanvorlage"></meta>
          <meta property="twitter:image" content={SchichtplanVorlageThumbnail}></meta>
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
                        <h1>Schichtplan Vorlage erstellen?</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p>
                    Moin 👋
                    </p>
                    <p>
                    Im heutigen Artikel möchte ich dir zeigen, wie du mit unserer Lösung eine Vorlage für deinen Schichtplan erstellst. Diese kannst du jederzeit wiederverwenden oder bei Bedarf anpassen.
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite beim Erstellen einer Schichtplan Vorlage"
                            src={VorlageMetaInfos}
                            title="Meta Infos zur Vorlage"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <br/>
                    <h2>Grundlegenden Plan vorbereiten</h2>
                    <p>
                        Um deine individuelle Vorlage zu erstellen, benötigst du nur die wichtigsten Informationen. Im ersten Schritt wählst du einen Namen und die Anzahl der Schichten pro Tag. Anschließend wählst du aus an welchen Tagen dein Betrieb geschlossen ist. Klicke auf „Erstellen“, damit dein grundlegender Plan vorbereitet wird. 🚀
                    </p>
                    
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot von Staffbite mit einer unvollständigen Schichtplan Vorlage"
                            src={BasicPlanVorlage}
                            title="Basic Schichtplan Vorlage"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    <h2>Schichtdetails eintragen</h2>
                    <p>
                    Nach wenigen Sekunden ist der Plan da. Jetzt fehlen noch die Schichtdetails, damit dein Team sich in den Plan eintragen kann. <br/>Hierfür gibst du an:<br/>
                        -	Name der Schicht<br/>
                        -	benötigte Position (Kasse, Lager, Küche, Schichtleitung, etc.)<br/>
                        -	Beginn und Ende der Schicht<br/>
                        -	Anzahl Mitarbeiter in dieser Schicht
                    </p>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="6">
                    <img
                        alt="Screenshot von Staffbite beim Eintragen von Schichtdetails"
                        src={Schichtdetails}
                        title="Schichtdetails Dialog"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>
                    
                    <p>
                    Nachdem du die benötigten Schichtdetails eingetragen hast, ist deine Vorlage fertig! Du kannst den Plan nun für dein Team freigeben. 🎉
                    </p>                    

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von Staffbite einer fertigen Schichtplan Vorlage"
                        src={FertigeVorlage}
                        title="Fertige Vorlage"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>
                    <br/>


                    <p>
                        Im nächsten Artikel zeige ich dir wie du mit einer Vorlage direkt die Schichtplanung für einen ganzen Monat vorbereiten kannst. 😍
                    </p>
                    
                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p>
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!</p>
                  </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Schichtplanvorlage;