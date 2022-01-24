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
  CardTitle,
  Card,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLANERSTELLEN_TITLE, SCHICHTPLANERSTELLEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import VorlageErstellen from "../../../assets/img/theme/Vorlage-erstellen.png"
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"
import Schichthinzufuegen from "../../../assets/img/theme/Schicht-hinzufuegen.png"
import SchichtplanVorlageVerwenden from "../../../assets/img/theme/Schichtplan-vorlage-verwenden.png"
import CloudPicture from "../../../assets/img/themen/CloudService/CloudComputingImage.png"
import Calendar from "../../../assets/img/themen/Monatsplanung/CalendarImage.png"


function SchichtplanErstellen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/schichtplan-erstellen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/schichtplan-erstellen" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-4 pt-6">
                        <h1>Erstelle deinen Schichtplan online</h1>
                    </Row>
      </Container>
                
      <Container fluid className="mt-3 mx-6">
        <Row className="ml-0">
        <Col className="mt-4">
          <Row className="mt-6">
            <h2 className="m-3 ml-2 p-0">Digitale Schichtpläne für dich und dein Team</h2>
          </Row>
          <Row className="mt-2">
            <Col xs="12">
          <p className="lead m-0">
              Mit unserer Lösung kannst du in kürzester Zeit deine Schichtpläne digital erstellen. 
              <Row className="mt-2 justify-content-center">
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Position & Rechte festlegen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Beginn & Ende bestimmen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Notizen für dein Team
                </Col>
              </Row>
              </p>
              {/*<Row className="mt-6">
              <p>
              Du kannst mit wenigen Klicks die wichtigsten Informationen zu deinen Schichten angeben. 
              <br/>
              Den vorbereiteten Plan gibst du anschließend deinem Team frei.
              <br/>
              <br/>
              Jetzt musst du nur noch abwarten, bis dein Team sich in den Plan eingetragen hat.
              <br/> 
              Dein Team bekommt ebenfalls einen Zugang zu Staffbite und kann sich jederzeit per Smartphone, Tablet oder Laptop in den Plan eintragen. 
              <br/>
              Über unser Reporting kannst du außerdem nachschauen wer sich noch nicht eingetragen hat.
            </p>
            </Row>*/}
            </Col>
          </Row>
                </Col>
                      
                <Col md="12" lg="7">
                  <img
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlage}
                    title="Schichtplan Vorlage erstellen"
                    height="80%"
                    width="100%"
                  />
                </Col>
      </Row>
      <Container>
        <Row className="text-center">
          <Col>
            <h2 className="display-4">In zwei Schritten zur Schichtplanvorlage</h2>
          </Col>
        </Row>
      </Container>
      </Container>
                <Container className="mt-6">
                  <Row>
                    <Col md="12" lg="6">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung der Erstellung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={VorlageErstellen}
                    title="Erstellung Schichtplan Vorlage"
                    height="100%"
                    width="100%"
                  />
                    </Col>
                    <Col className="ml-6">
                    <Row className="mt-4">
                      <h2 className="m-0 p-0">1. Erstelle deine Vorlagen</h2>
                    </Row>
                    <Row className="mt-2">
                    <CardSubtitle className="lead">In wenigen Klicks kannst du die wichtigsten Informationen zu deinem Schichtplan angeben. </CardSubtitle>
                  </Row>
                  <p className="m-0 lead">
                  <Row className="justify-content-center mt-4">
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Namen festlegen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Schichten bestimmen
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="mt-0">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                  Ruhetage auswählen
                </Col>
              </Row>
              </p>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-8">
                  <Row>
                    <Col md="12" lg="6">
                        <Row className="mt-4">
                          <h2 className="m-0 p-0">2. Erstelle weitere Schichten</h2>
                        </Row>
                        <Row className="mt-2">
                        <CardSubtitle className="lead">Als letzten Schritt gibst du die wichtigsten Informationen zu deinen Schichten an. </CardSubtitle>
                      </Row>
                      <p className="m-0 lead">
                      <Row className="justify-content-center mt-4">
                    <Col xs="1" className="mt-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Namen festlegen
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="1" className="mt-0">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Position auswählen
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="1" className="mt-0">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Beginn & Ende bestimmen
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="1" className="mt-0">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Anzahl benötigter Mitarbeiter eintragen
                    </Col>
                  </Row>
                  </p>
                    </Col>
                    <Col className="">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage in der eine Schicht hinhugefügt wird."
                    src={Schichthinzufuegen}
                    title="Schicht hinzufuegen"
                    height="100%"
                    width="100%"
                  />
                    
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-8">
                  <Row className="mt-4 text-center">
                    <Col>
                          <h2 className="m-0 p-0">Fertigen Schichtplan benutzen</h2>
                          </Col>
                </Row>
                      <Row className="mt-4 mb-4 text-center">
                        <Col>
                          <p className="m-0">
                            Deine neue Schichtplanvorlage kannst du nun verwenden. In unserem Artikel <Link to="/themen/individueller-schichtplan">individuellen Schichtplan erstellen</Link> erfährst du, wie du deinen Schichtplan genau auf deinen Betrieb anpassen kannst.
                          </p>
                        </Col>
                      </Row>
                  <Row>
                    <Col md="12" lg="12">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer fertigen Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlageVerwenden}
                    title="Fertige Schichtplan Vorlage"
                    height="100%"
                    width="100%"
                  />
                    
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-4">
                <Row className="mt-6" >

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
                
                <Col xs="6">
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
                </Container>


                
      <LandingFooter></LandingFooter>
    </>
  );
};
export default SchichtplanErstellen;