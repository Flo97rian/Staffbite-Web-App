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
import React, { useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import StaffbiteLogo from "../../assets/img/brand/Staffbite_Logo.png"
import CloudPicture from "../../assets/img/themen/CloudComputingImage.png"
import Paperwork from "../../assets/img/themen/PaperworkImage.png"
import Possibilities from "../../assets/img/themen/Possibilities.png"
import VorlageThumbnail from "../../assets/img/themen/SchichtplanVorlageThumbnail.png"
import Calendar from "../../assets/img/themen/CalendarImage.png"
import LandingFooter from "../../components/Footers/LandingFooter";
import { THEMEN_DESCRIPTION, THEMEN_TITLE } from "../../constants/MetaTexts";

function Themen (props) {
    let mainContent = useRef("mainContent")
  useEffect(() => {
    pageViewsTracking()
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  function pageViewsTracking () {
    const pathname = "/themen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <div ref={mainContent}>
        <Helmet>
          <title>{THEMEN_TITLE}</title>
          <meta name="description" content={THEMEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      <Container className="pt-5 pb-2" fluid>
            <Container className="mt-8">
                    <Row className="justify-content-center ml-1 mt-4">
                        <h1 className="display-3">Themen</h1>
                    </Row>
                    <Row className="justify-content-center ml-1 mt-2">
                        <p className="lead">
                            Entdecke spanndende Artikel rund um das Thema: Schichtplan online erstellen.
                        </p>
                    </Row>
            </Container>
            
            <Container className="mb-4 pt-4">
            
            
            <Row className="mt-4">
                                
            <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Calendar}
                            alt="Bild eines Kalenders"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichtplanung für einen ganzen Monat
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie kann ich Schichtpläne für einen ganzen Monat erstellen?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel zeige ich dir, wie du mit Staffbite deine individuelle Vorlage nutzen kannst, um die Schichtplanung für einen ganzen Monat zu erledigen. 
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/themen/monatsplanung">Schichtplan für einen ganzen Monat</Link>
                            </CardText>
                        </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-2"
                            src={VorlageThumbnail}
                            alt="Vier Menschen am Tisch mit Zettel und Block"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichtplan Vorlage erstellen
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie erstelle ich eine Schichtplan Vorlage?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel zeige ich dir, wie du mit Staffbite deine individuelle & wiederverwendbare Vorlage erstellen kannst. Schau dir hier unsere Schritt für Schritt Anleitung an. 
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/themen/schichtplanvorlage" >Schichtplan Vorlage</Link>
                            </CardText>
                        </Card>
                </Col>
                
                </Row>
                
                
                <Row className="mt-4" >
                
                <Col xs="6">
                    <Card>
                            <CardImg
                            className="p-2"
                            src={Possibilities}
                            alt="Bild von drei unterschiedlichen Wegen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichtplan erstellen
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie erstelle ich meinen Schichtplan? 
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Es gibt viele verschiedene Möglichkeiten die Schichtplanung umzusetzen. In diesem Beitrag zeige ich dir drei davon und gehe kurz auf Vor- und Nachteile ein.
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/themen/schichtplanerstellen" >Papier, Excel oder Software?</Link>
                            </CardText>
                        </Card>
                </Col>

                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-2"
                            src={Paperwork}
                            alt="Schreibtisch mit Kaffee, Zettel und Stift"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                Automatisierte Befüllung deines Schichtplans
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Kann die Befüllung deines Schichtplans automatisiert werden?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                Erfahre in diesem Beitrag wie du die Befüllung deines Schichtplans durch unseren intelligenten Algorithmus innerhalb weniger Sekunden abbilden kannst. 
                            </CardText>
                            <CardText className="pl-4 pb-4" tag="p">
                                <Link to="/themen/automatisierung" >Zeit & Geld sparen?</Link>
                            </CardText>
                        </Card>
                </Col>

                </Row>


                <Row className="mt-4" >
                <Col xs="6">
                <Card>
                            <CardImg
                            className="p-2"
                            src={CloudPicture}
                            alt="Schichtplan online erstellen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                Schichtplanung als Cloud Service
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Warum ist Staffbite ein Cloud Service und was ist das eigentlich?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                In diesem Beiträg beantworten wir eine kürzlich gestellte Frage und gehen weiter auf die Vorteile von Cloud Services für unsere Kunden ein. 
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/themen/cloudservice" >Online Schichtplanung</Link>
                            </CardText>
                        </Card>
                </Col>
                

                <Col xs="6">
                <Card>
                            <CardImg
                            className="p-2"
                            src={StaffbiteLogo}
                            alt="Schichtplan online erstellen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichtplan veröffentlichen
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Was ist bei der Veröffentlichtung von einem Schichtplan zu beachten?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel klären wir worauf zu achten ist, wenn ein fertiger Plan veröffentlicht wird. Welche Aufgaben fallen danach noch an?
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/" >In kürze verfügbar: Schichtplan Vorlage erstellen</Link>
                            </CardText>
                        </Card>
                </Col>

                </Row>

                <Row className="mt-4" >
                
                <Col xs="6">
                <Card>
                            <CardImg
                            className="p-2"
                            src={StaffbiteLogo}
                            alt="Schichtplan online erstellen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Schichplanung per App
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie unterscheide ich eine gute von einer schlechten App?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Wir haben und uns durch die bekanntesten Schichplanungs-Apps gesucht. Und das haben wir dabei gelernt.
                                    <br/>
                                    <br/>
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/" >In kürze verfügbar: Schichtplanung App</Link>
                            </CardText>
                        </Card>
                </Col>

                

                <Col xs="6">
                <Card>
                            <CardImg
                            className="p-2"
                            src={StaffbiteLogo}
                            alt="Schichtplan online erstellen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                Schichtplan kostenlos
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Welcher kostenloser Schichtplan ist der Beste?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                Kostenlose Schichtpläne. Für wen sind sie geeignet und wer sollte lieber die Finger von ihnen lassen? Diese Frage und mehr, untersuchen wir in diesem Artikel.
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/" >In kürze verfügbar: Schichtplan kostenlos</Link>
                            </CardText>
                        </Card>
                </Col>

                </Row>


            </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Themen;