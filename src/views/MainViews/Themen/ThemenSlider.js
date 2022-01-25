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
import VorlageThumbnail from "../../../assets/img/themen/SchichtplanVorlage/SchichtplanVorlageThumbnail.png"
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"
import CloudPicture from "../../../assets/img/themen/CloudService/CloudComputingImage.png"
import Calendar from "../../../assets/img/themen/Monatsplanung/CalendarImage.png"
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png";
import Possibilities from "../../../assets/img/themen/SchichtplanErstellen/Possibilities.png"
import Preise from "../../../assets/img/theme/ZeitGeld.png"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


function ThemenSlider (props) {
    return (
    <>
     <Container>
        <Carousel
        autoPlay
        autoFocus
        infiniteLoop
        interval="6000"
        axis="horizontal"
        >
            <Row className="mt-6" >
                <Col xs="12" md="6">
                    <Card>
                        <CardImg
                        className="p-4"
                        src={SchichtplanVorlage}
                        alt="Tablet mit Schichtplan"
                        ></CardImg>
                        <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                        <Link to="/schichtplan-erstellen" class="stretched-link">Einfache und unkomplizierte Schichtpläne</Link>
                        </CardTitle>
                        <CardSubtitle className="pl-4 p">
                            Mit Staffbite erstellst du deine Schichtpläne innerhalb kürzester Zeit.
                        </CardSubtitle>
                        <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                            Schaue dir hier an wie du mit Staffbite einen Schichtplan erstellen kannst.
                            Du kannst die Schichtpläne jederzeit online per Smartphone, Tablet oder Laptop einsehen und bearbeiten.
                        </CardText>
                    <br/>
                    </Card>
                </Col>
                <Col xs="12" md="6">
                    <Card>
                        <CardImg
                        className="p-4"
                        src={VorlageThumbnail}
                        alt="Vier Menschen am Tisch mit Zettel und Block"
                        ></CardImg>
                        <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                        <Link to="/themen/schichtplan-vorlage"class="stretched-link">Schichtplan Vorlage erstellen</Link>
                        </CardTitle>
                        <CardSubtitle className="pl-4 p">
                            Wie erstelle ich eine Schichtplan Vorlage?
                        </CardSubtitle>
                        <CardText className="pl-4 pt-4 pr-4" tag="p">
                                In diesem Artikel zeige ich dir, wie du mit Staffbite deine individuelle & wiederverwendbare Vorlage erstellen kannst. 
                                Schau dir hier unsere Schritt für Schritt Anleitung an. 
                        </CardText>
                        <br/>
                     </Card>
                </Col>
            </Row>
            <Row className="mt-6" >

                <Col xs="12" md="6">
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
                
                <Col xs="12" md="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Calendar}
                            alt="Bild eines Kalenders"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/themen/monatsplanung"class="stretched-link">Schichtplanung für einen ganzen Monat</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie erstelle ich die Schichtpläne für einen ganzen Monat?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    In diesem Artikel zeige ich dir, wie du mit Staffbite die Schichtplanung für einen ganzen Monat erledigen kannst. 
                                    Schau dir hier unsere Schritt für Schritt Anleitung an. 
                            </CardText>
                            <br/>
                        </Card>
                </Col>

                </Row>
                <Row className="mt-6" >

                <Col xs="12" md="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanPublish}
                  alt="Vollständig befüllter Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/fuer-dein-team" class="stretched-link">Vorteile für dein Team</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Noch nicht überzeugt?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                    Wir wollen dir UND deinem Team helfen.
                    Unsere digitalen Schichtpläne bieten sowohl dir als auch deinem Team jede Menge Vorteile. Schau dir hier die wichtigsten im Überblick an.
                  </CardText>
                  <br/>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="12" md="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={TeamÜbersicht}
                            alt="Übersicht der Teammitglieder"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/automatisierter-schichtplan"class="stretched-link">Automatisierte Befüllung</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Unsere Automatisierung spart dir jede Menge Zeit & Geld
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Normalerweise dauert die Schichtplanung jede Woche aufs Neue mehrere Stunden.
                                    Durch unsere Lösung kannst du deine Schichtpläne innerhalb weniger Sekunden befüllen lassen.
                            </CardText>
                            <br/>
                        </Card>
                </Col>

                </Row>
                <Row className="mt-6" >
                  

                <Col xs="12" md="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={Possibilities}
                            alt="Ein Mensch steht vor 3 Wegen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/themen/schichtplan-erstellen"class="stretched-link">Schichtplan mit Papier, Excel oder Software</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie viel kostet dich unsere Lösung nach dem Probemonat?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Wenn du Staffbite testen möchtest, erhälst du einen kostenlosen Probemonat. 
                                    Nachdem dieser abgelaufen ist, prüfen wir gemeinsam, welches Paket für dich passt.
                                    Bei uns gibt es keinen Preis pro Mitarbeiter*in, damit du nicht jeden Monat etwas anderes zahlen musst. 
                            </CardText>
                        </Card>
                </Col>
                  
                  <Col xs="12" md="6">
                          <Card>
                              <CardImg
                              className="p-4"
                              src={Preise}
                              alt="Eine Wage im Gleichgewicht mit einer Uhr und Geld"
                              ></CardImg>
                              <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                              <Link to="/pricing"class="stretched-link">Unsere Preise</Link>
                              </CardTitle>
                              <CardSubtitle className="pl-4 p">
                                  Wie viel kostet dich unsere Lösung nach dem Probemonat?
                              </CardSubtitle>
                              <CardText className="pl-4 pt-4 pr-4" tag="p">
                                      Wenn du Staffbite testen möchtest, erhälst du einen kostenlosen Probemonat. 
                                      Nachdem dieser abgelaufen ist, prüfen wir gemeinsam, welches Paket für dich passt.
                                      Bei uns gibt es keinen Preis pro Mitarbeiter*in, damit du nicht jeden Monat etwas anderes zahlen musst. 
                              </CardText>
                          </Card>
                  </Col>
  
                  </Row>
                </Carousel>
              </Container>
    </>
  );
};
export default ThemenSlider;