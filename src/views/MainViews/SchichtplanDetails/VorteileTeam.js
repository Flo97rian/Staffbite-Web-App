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
import SchichtplanÜbersicht from "../../../assets/img/app/App-eintragen-uebersicht-smartphone.png"
import SchichtTauschen from "../../../assets/img/app/App-tauschanfrage-smartphone.png"
import SchichtplanEintragen from "../../../assets/img/app/app-eintragen-smartphone.png"
import NeewsFeed from "../../../assets/img/app/app-newsfeed-smartphone.png"
import { isMobile } from "react-device-detect";
import ThemenSlider from "../Themen/ThemenSlider";


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
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-8">
                        <h1 className="display-3">Dein individueller Schichtplan für dich und dein Team</h1>
                    </Row>
      </Container>    
            <Container className="pb-2">
            <Row className="justify-content-center mt-4">
                <Col className={isMobile ? "mt-2" : "mt-4"}>
                <Row className=" justify-content-center mt-4">
                    <Col>
                        <h2 class="display-4">Vorteile für dein Team</h2>
                        <p className="lead">
                        In vielen Betrieben sind Schichtpläne ein Streitthema. Unzufriedenheiten des Teams stehen an der Tagesordnung. Wir wollen diese Probleme lösen. Durch unsere Lösung ist der gesamte Prozess vom grundlegenden Plan bis zum fertigen Schichtplan transparent. Durch die automatisierte Verteilung der Schichten wird niemand bevorzugt und es geschehen weniger Fehler. 
                        </p>
                    </Col>
                </Row>
                    
                </Col>
                <Col className={isMobile ? "" : "pt-2"}  xs="12" md="6" lg="6">
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
                <Container className="mt-8">
                  <Row>
                    <Col md="12" lg="6">
                        <Row className="mt-4">
                          <Col>
                            <h2 className="">1. Schichtplan öffnen</h2>
                          </Col>
                        </Row>
                        <p className="lead">
                        <Row className="mt-2">
                          <Col>
                          Viele der Mitarbeiter*innen in der Gastronomie sind jung. Sie sind es gewohnt digitale Produkte und Services zu nutzen. Warum sollte das beim Schichtplan anders sein?  
                          <br/>
                          Über unsere App können sich Mitarbeiter*innen jederzeit in einen Schichtplan eintragen
                          </Col>
                      </Row>
                  </p>
                    </Col>
                    <Col className="">
                    <img
                    className=""
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage in der eine Schicht hinhugefügt wird."
                    src={SchichtplanÜbersicht}
                    title="Schicht hinzufuegen"
                    height="100%"
                    width="60%"
                  />
                    
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-6">
                  <Row>
                    <Col xs={isMobile ? {span:12, order: 2}: {span: 12, order: 1}} md="6">
                    <img
                    className=""
                    style={{borderRadius: "10px"}}
                    alt="Abbildung der Erstellung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanEintragen}
                    title="Erstellung Schichtplan Vorlage"
                    height="100%"
                    width="60%"
                  />
                    </Col>
                    <Col className="" xs={isMobile ? {span:12, order: 1}: {span: 12, order: 2}} md="6">
                    <Row className="mt-4 text-left">
                      <Col xs="12">
                      <h2 className="">2. In Schichtplan eintragen</h2>
                    <p className="lead">
                    <Row className="mt-2">
                      <Col>
                        In wenigen Klicks kannst du dich in einen zukünftigen Schichtplan eintragen
                    </Col>
                  </Row>
                  <Row className=" mt-4">
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Tag & Schicht auswählen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Direkt eintragen
                </Col>
              </Row>
              <Row>
                <Col className="mt-6">
                  Weitere Informationen findest du in unserem  Artikel <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                </Col>
              </Row>
            </p>
            </Col>
            </Row>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-8">
                  <Row>
                    <Col md="12" lg="6">
                        <Row className="mt-4">
                          <Col>
                            <h2 className="">3. Bei Bedarf tauschen</h2>
                          </Col>
                        </Row>
                        <p className="lead">
                        <Row className="mt-2">
                          <Col>
                          Mit unserer Lösung kann dein Team jederzeit und überall Tauschanfragen senden. Ohne WhatsApp-Nachrichten, E-Mails, Excel-Tabellen oder Papier. Egal ob vom Smartphone, Tablet oder Laptop.  
                          </Col>
                      </Row>
                      <Row className="justify-content-center mt-4">
                    <Col xs="1" className="mt-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Tag & Schicht auswählen
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="1" className="mt-0">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Tauschanfrage senden
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-6">
                      Weitere Informationen findest du in unserem Artikel <Link to="/themen/individueller-schichtplan">individuellen Schichtplan erstellen</Link>
                    </Col>
                  </Row>
                  </p>
                    </Col>
                    <Col className="">
                    <img
                    className=""
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage in der eine Schicht hinhugefügt wird."
                    src={SchichtTauschen}
                    title="Schicht hinzufuegen"
                    height="90%"
                    width="60%"
                  />
                    
                    </Col>
                  </Row>
                </Container>
                <ThemenSlider></ThemenSlider>
                </div>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default VorteileTeam;