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
  Col,
  CardImg,
  CardText,
  CardSubtitle,
  Card,
  CardTitle
} from "reactstrap";
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {TEAM_VORTEILE_TITLE, TEAM_VORTEILE_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import CloudPicture from "../../../assets/img/themen/CloudService/CloudComputingImage.png"
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png";


function VorteileTeam (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/fuer-dein-team";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{TEAM_VORTEILE_TITLE}</title>
          <meta name="description" content={TEAM_VORTEILE_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/fuer-dein-team" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-8">
                        <h1 className="display-3">Dein individueller Schichtplan für dich und dein Team</h1>
                    </Row>
      </Container>    
            <Container className="pb-2"fluid>
            <Row className="justify-content-center ml-0 mt-4">
                <Col className="mt-6">
                <Row className=" justify-content-center mt-4 ml-6">
                    <Col>
                        <h2 class="display-4">Vorteile für dein Team</h2>
                        <p className="lead">
                        In vielen Betrieben sind Schichtpläne ein Streitthema. Unzufriedenheiten des Teams stehen an der Tagesordnung. Wir wollen diese Probleme lösen. Durch unsere Lösung ist der gesamte Prozess vom grundlegenden Plan bis zum fertigen Schichtplan transparent. Durch die automatisierte Verteilung der Schichten wird niemand bevorzugt und es geschehen weniger Fehler. 
                        <br/>
                        <br/>
                        Viele der Mitarbeiter*innen in der Gastronomie sind jung. Sie sind es gewohnt digitale Produkte und Services zu nutzen. Warum sollte das beim Schichtplan anders sein?  
                        <br/>
                        <br/>
                        Mit unserer Lösung kann sich dein Team jederzeit und überall in den Schichtplan eintragen. Ohne WhatsApp-Nachrichten, E-Mails, Excel-Tabellen oder Papier. Egal ob vom Smartphone, Tablet oder Laptop. Den fertigen Schichtplan kann dein Team natürlich auch jederzeit online einsehen. 
                        </p>
                    </Col>
                </Row>
                    
                </Col>
                <Col className="col-xs-12 text-center"  md="6" lg="6">
                <img
                    alt="Fertiger Schichtplan bereit zur Veröffentlichung"
                    src={SchichtplanPublish}
                    title="Fertiger Schichtplan"
                    height="100%"
                    width="100%"
                  />
                </Col>
                  <br/>
                </Row>
                </Container>
                <div>


                <Container mt-4>
                <Row className="mt-6" >

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanVorlage}
                  alt="Laptop mit leerem Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/schichtplan-erstellen" class="stretched-link">Schichtplan erstellen</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wie erstelle ich einen Schichtplan mit Staffbite?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                    Schau dir hier an wie du deinen individuellen & digitalen Schichtplan erstellen kannst.
                    Mit wenigen Klicks gibst du die wichtigsten Informationen zu deinen Schichten an.
                  </CardText>
                  <br/>
                  <br/>
                  </Card>
                </Col>
                

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={CloudPicture}
                  alt="Wolke auf die ein Finger zeigt"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/verfuegbarkeiten-eintragen" class="stretched-link">Verfügbarkeiten eintragen</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wie kann mein Team sich in den erstellen Schichtplan eintragen?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                      Dein Team bekommt ebenfalls einen Zugang zu Staffbite.
                      Für deine Mitarbeiter*innen ist Staffbite vollständig kostenlos. Dein Team kann sich jederzeit online in den Schichtplan eintragen.
                  </CardText>
                  <br/>
                  </Card>
                </Col>

                </Row>
                </Container>
                </div>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VorteileTeam;