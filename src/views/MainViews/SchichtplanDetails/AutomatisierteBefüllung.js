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
import SchichtplanBeispiel from "../../../assets/img/theme/Schichtplan-befüllen.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {AUTOMATISIERTE_SCHICHTPLANUNG_TITLE, AUTOMATISIERTE_SCHICHTPLANUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import SchichtplanPublish from "../../../assets/img/themen/AutomatisierteBefüllung/BefüllterPlan.png"
import { isMobile } from "react-device-detect";
import ThemenSlider from "../Themen/ThemenSlider";


function AutomatisierteBefüllung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/automatisierter-schichtplan";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{AUTOMATISIERTE_SCHICHTPLANUNG_TITLE}</title>
          <meta name="description" content={AUTOMATISIERTE_SCHICHTPLANUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/automatisierter-schichtplan" />
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
                    <h1 class="text-center">Dein digitaler Schichtplan - Automatisierte Befüllung</h1>
                    </Row>
      </Container>    

            <Container className="pb-2">
            <Row className="mt-4">
                <Col className="mt-6">
                <h2 class="display-4">Deine Zeit ist zu wertvoll, um sie mit der Schichtplanung zu verbringen</h2>   
                </Col>
                </Row>

                <Row>
                  <Col>

                
                <p className="lead">
                <Row className="mt-4">
                    <Col>
                      Nachdem dein Team sich in deinen Schichtplan eingetragen hat, kannst du die automatisierte Befüllung starten. Dafür reicht ein Klick aus. Wenige Sekunden später ist dein Schichtplan fertig. Dein Team wird ausschließlich in Schichten eingeteilt, in die sie sich eingetragen haben. Somit entsteht ein fairer Schichtplan für dein ganzes Team. 
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                      Bisher hast du wahrscheinlich stundenlang per Hand mit Papier und einer Excel-Tabelle deinen Schichtplan befüllt. Mit Staffbite ist das Vergangenheit! Wir wollen dir helfen sowohl Zeit als auch Nerven zu sparen. 
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                      Schau dir einfach an wie unsere <Link to="/themen/automatisierung">automatisierte Schichtplanung</Link> funktioniert.
                    </Col>
                </Row>
                </p>
                </Col>

                <Col className={isMobile ? "" : "pt-4"}  md="12" lg="6">
                <img
                    alt="Abbildung eines automatisiert erstellen Schichtplans von Staffbite"
                    title="Schichtplan automatisiert erstellen"
                    src={SchichtplanPublish}
                    height="80%"
                    width="100%"
                  />
                </Col>
                </Row>
            </Container>


              <Container className="mt-6">
              <Row className="text-center">
                <Col md="12">
                  <h2 className="display-3 text-default">In wenigen Schritten zum automatisierten Schichtplan</h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center mb-4">
                <Col md="12">
                  <p className="lead">
                  Wir helfen dir Zeit & Geld zu sparen. Deshalb entwickeln unsere Lösung stetig weiter und gehen dabei die Wünsche unserer Kunden ein. Somit erhälst du mit Staffbite die Lösung, die dir wirklich weiterhilft.
                  </p>
                </Col>
              </Row>
              <Row className="mt-4">
                    <Col xs="12" md="4">

                    <Row className="mt-6">
                          <Col  xs="2">
                            <Row className="justify-content-center">
                              <div className=" mb-0 icon icon-shape font-size-700 p-0 justify-content-center text-center mb-0">
                              🎯
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Row className="justify-content-center">
                              <Col>
                              <Row>
                                <Col>
                                <h3 className="lead mb-0 mt-0">
                                <Link to="/schichtplan-erstellen">1. Schichtplan auswählen <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i></Link>
                                </h3>
                                </Col>
                              </Row>   
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      <hr className=""/>
                        <Row className="mt-4">
                          <Col  xs="2">
                            <Row className="justify-content-center">
                              <div className=" mb-0 icon icon-shape icon-size-lg p-0 justify-content-center text-center mb-0">
                              📈
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Row className="justify-content-center">
                              <Col>
                              <Row>
                                <Col>
                                <h3 className="lead mb-0 mt-0">
                                <Link to="/themen/automatisierte-befuellung-starten">2. Automatisierte Befüllung starten <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i></Link>
                                </h3>
                                </Col>
                              </Row>  
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      <hr className=""/>
                      <Row className="mt-4">
                          <Col  xs="2">
                            <Row className="justify-content-center">
                              <div className=" mb-0 icon icon-shape icon-size-lg p-0 justify-content-center text-center mb-0">
                              🚀
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Row className="justify-content-center">
                              <Col>
                              <Row>
                                <Col>
                                <h3 className="lead mb-0 mt-0">
                                  <Link to="/themen/anpassungen-vornehmen">3. Letzte Änderungen vornehmen <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i></Link>
                                </h3>
                                </Col>
                              </Row>     
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      <hr className=""/>
                      <Row className="mt-4">
                          <Col  xs="2">
                            <Row className="justify-content-center">
                              <div className=" mb-0 icon icon-shape icon-size-lg p-0 justify-content-center text-center mb-0">
                              🤑
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Row className="justify-content-center">
                              <Col>
                              <Row>
                                <Col>
                                <h3 className="lead mb-0 mt-0">
                                <Link to="/schichtplan-veroeffentlichen">4. Schichtplan veröffentlichen <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i></Link>
                                </h3>
                                </Col>
                              </Row>    
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                        <hr className=""/>
                    </Col>
                <Col className="" xs="12" sm="8">
                <img
                    className="pt-0 pb-0"
                    alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                    src={SchichtplanBeispiel}
                    title="Team erstellen und verwalten"
                    height="100%"
                    width="100%"
                  />
                </Col>
              </Row>
              </Container>
              <ThemenSlider></ThemenSlider>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default AutomatisierteBefüllung;