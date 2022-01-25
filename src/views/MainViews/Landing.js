/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import BildSchichtplanErstellen from "../../assets/img/theme/Schichtplan-erstellen.png";
import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-befüllen.png"
import BefuellungStarten from "../../assets/img/landing/Befuellung-starten.png"
import SchichtplanVeroeffentlichen from "../../assets/img/landing/Schichtplan-veroeffentlichen.png"
import {isMobile} from 'react-device-detect';


// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Badge,
  Col,
  CardTitle,
  CardText,
  CardSubtitle
} from "reactstrap";
// core components
import LandingFooter from "../../components/Footers/LandingFooter.js";
import { pageview } from "react-ga";
import { LANDING_DESCRIPTION, LANDING_TITLE } from "../../constants/MetaTexts";
import ErstellenShow from "./sub/ErstellenShow";
import SchichtplanVorlage from "../../assets/img/theme/Vorlage-erstellen.png"
import SchichtEintragen from "../../assets/img/landing/VerfügbarkeitenEintragen/SchichtEintragenMitFinger.png"
import AppEintragen from "../../assets/img/app/App-eintragen-uebersicht-smartphone.png"
import ThemenSlider from "./Themen/ThemenSlider";


const Landing = (props) => {
  const [state, setState] = useState({})

  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    pageview(pageView);
  } 

    return (
      <>
        <main className="mt-5">
        <Helmet>
          <title>{LANDING_TITLE}</title>
          <meta name="description" charSet="utf-8" content={LANDING_DESCRIPTION}/>
          <meta property="og:title" content={LANDING_TITLE}/>
          <meta property="og:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatisiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="og:url" content="https://www.staffbite.de"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image" content={BildSchichtplanErstellen}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Digitale Schichtplanung jederzeit online und per App."/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatisiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="twitter:url" content="https://www.staffbite.de"></meta>
          <meta property="twitter:image" content={BildSchichtplanErstellen}></meta>
          <meta property="twitter:type" content="website"></meta>
          <link rel="canonical" href="https://www.staffbite.de" />
        </Helmet>
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-hero section-shaped pb-250 bg-gradient-info">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
            <Row>
              <Container className="py-lg-md-sm d-flex">
                  <Row className="mt-6 ">
                    <Col md="12" lg="8">
                      <h1 className="display-3 text-white pb-5">
                      Müde vom stundenlangen Schichtplan puzzeln?{" "}
                      </h1>
                        <p className="lead text-white mt-2">
                        💻 Mit wenigen Klicks zu deinem digitalen Schichtplan 
                        <br/>
                        ✅ Einfach und übersichtlich  
                        <br/>
                        🥇 Hohe Flexibilität für verschiedene Branchen 
                        <br/>
                        🔐 Hoher Datenschutz nach DSGVO
                        <br/>
                        🤝 Probiere es direkt aus - im kostenlosen Probemonat!
                        </p>
                    </Col>
                    <Col className="justify-content-center" md="12" lg="4">
                          <ErstellenShow></ErstellenShow>
                    </Col>                    
                  </Row>
              </Container>
              </Row>
              <Row className={isMobile ? "pt-9": ""}>
                <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-secondary"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
              </Row>
            </section>
            </div>
            <Row>
            <Container className={isMobile ? "pt-9 mt-9": ""}>
              <Row className="mt-4 text-center">
                <Col className="" xs="12">
                  <h2 className="display-3">So funktioniert's - in nur vier Schritten</h2>
                </Col>
              </Row>
              <Row className="pt-6 mx-4">
                <Col xs="12">
                <Row className="text-center">
                    <Col xs={isMobile ? {span:12, order: 2}: {span: 12, order: 1}} md="6" className="order-sm-2 order-md-1">
                      <Row>
                    <img
                          className="shadow mb-3"
                          alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                          src={SchichtplanVorlage}
                          title="Schichtplan Vorlage erstellen"
                          height="70%"
                          width="100%"
                          ></img>
                    </Row>
                    </Col>
                    <Col xs={isMobile ? {span:12, order: 1}: {span: 12, order: 2}} md="6" className={isMobile ? "order-0": ""}>
                      <Row className="pt-3" style={!isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-right">
                          <Col xs="2" className="">
                            <Badge color="primary" className="badge-lg lead badge-circle badge-outline badge-floating border-white mt-0 ">1</Badge>
                          </Col>
                          <Col xs="10" >
                            <h2 className="display-4 text-left">Schichtplan erstellen</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className={ isMobile ? "text-center mt-4" : ""} style={!isMobile ? { transform: "translateY(10%)"}: {}}>
                        <Col>
                          <p className="lead mt-2">
                            <Row className="text-left">
                            <Col xs="0" md="2"></Col>
                              <Col xs="10">
                                Mit wenigen Klicks erstellst du deinen <Link to="/schichtplan-erstellen"> digitalen Schichtplan</Link> für dich und dein Team.
                              </Col>
                            </Row>
                            <Row className="mt-4 text-left">
                            <Col xs="0" md="2"></Col>
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Namen festlegen
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="0" md="2"></Col>
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Schichten pro Tag bestimmen
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="0" md="2"></Col>
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Ruhetage auswählen
                            </Col>
                            </Row>
                            </p>
                          </Col>
                      </Row>
                      { isMobile ? 
                      <></>
                      :
                       <Row>
                      <svg height="300" width="300">
                        <path d=" M 0 100 A 200 200 0 0 1 150 300" stroke="Gainsboro" stroke-width="3" fill="none" stroke-dasharray="10, 10" />
                    </svg>
                      </Row>
                      }
                    </Col>
                  </Row>
                </Col>
                </Row>
                <Row className="mx-4">
                <Col>
                <Row className="text-center">
                    <Col xs="12" md="6">
                    <Row className="pt-3" style={!isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-left">
                          <Col xs="2" className="text-center">
                            <Badge color="primary" className="badge-lg lead badge-circle badge-outline badge-floating border-white mt-0 ">2</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4">Für dein Team</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead mt-4" style={!isMobile ? { transform: "translateY(10%)"} : {}}>
                      <Row className="text-left">
                        <Col>Deine Mitarbeiter*innen tragen sich in deinen <Link to="/fuer-dein-team" class="stretched-link">online Schichtplan</Link> ein. Das geht jederzeit per Smartphone oder Laptop.
                          </Col>
                      </Row>
                      <Row className="mt-4 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Schicht auswählen
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              In Wunschschicht eintragen
                            </Col>
                            </Row>
                      </p>
                      { isMobile ? 
                      <></>
                      :
                       <Row className="float-right">
                      <svg height="300" width="300">
                        <path d=" M 300 100 A 200 200 200 0 0 150 300" stroke="Gainsboro" stroke-width="3" fill="none" stroke-dasharray="10, 10" />
                    </svg>
                      </Row>
                      }
                    </Col>
                    <Col xs="12" md="6" className="px-0 pt-5">
                    <img
                          className="shadow"
                          alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                          src={SchichtEintragen}
                          title="Schichtplan Vorlage erstellen"
                          height="50%"
                          width="100%"
                          ></img>
                    </Col>
                  </Row>
                  </Col>
                  </Row>
                  <Row className=" mx-4">
                <Col>
                <Row className="text-center mt-0">
                    <Col xs={isMobile ? {span:12, order: 2}: {span: 12, order: 1}} md="6">
                    <img
                          className="shadow mb-3"
                          alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                          src={BefuellungStarten}
                          title="Schichtplan Vorlage erstellen"
                          height={isMobile ? "80%" : "50%"}
                          width="100%"
                          ></img>
                    </Col>
                    <Col xs={isMobile ? {span:12, order: 1}: {span: 12, order: 2}} md="6">
                    <Row className="pt-3" style={isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-right">
                          <Col xs="2" className="">
                            <Badge color="primary" className="badge-lg lead badge-circle badge-outline badge-floating border-white mt-0 ">3</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4 text-left">Automatisierte Befüllung</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead mt-4 ">
                      <Row className={ isMobile ? "text-left mt-5" : "text-left"} style={!isMobile ? { transform: "translateY(10%)"}: {}}>
                      {!isMobile ? <Col xs="2"></Col> : <></>}
                        <Col>
                          Unsere Lösung befüllt deinen <Link to="/automatisierter-schichtplan">Schichtplan automatisiert</Link> innerhalb weniger Sekunden.
                          </Col>
                      </Row>
                      <Row className="text-left mt-4">
                          {!isMobile ? <Col xs="2"></Col> : <></>}
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Schichtplan auswählen
                            </Col>
                            </Row>
                            <Row className="text-left">
                            {!isMobile ? <Col xs="2"></Col> : <></>}
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Befüllung starten
                            </Col>
                            </Row>
                      </p>
                      { isMobile ? 
                      <></>
                      :
                       <Row>
                      <svg height="200" width="200">
                        <path d=" M 0 0 A 300 300 0 0 1 200 300" stroke="Gainsboro" stroke-width="3" fill="none" stroke-dasharray="10, 10" />
                    </svg>
                      </Row>
                      }
                    </Col>
                  </Row>
                  </Col>
                  </Row>
                  <Row className="mx-4">
                <Col>
                <Row className="text-center mt-3">
                    <Col xs="12" md="6">
                    <Row className="pt-0" style={isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-center">
                          <Col xs="2" className="">
                            <Badge color="primary" className="badge-lg lead badge-circle badge-outline badge-floating border-white mt-0 ">4</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4 text-left">Schichtplan veröffentlichen</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead mt-4 pt-0">
                      <Row className="text-left mt-0 pt-0" style={isMobile ? { transform: "translateY(10%)"}: {}}>
                        <Col className="">
                          Bei Bedarf kannst du noch Anpassungen vornehmen. Anschließend veröffentlichst du den <Link to="/schichtplan-veroeffentlichen">fertigen Schichtplan</Link> mit einem Klick.
                          </Col>
                      </Row>
                      <Row className="mt-4 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Jederzeit einsehbar
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Tauschanfragen genehmigen
                            </Col>
                            </Row>
                    </p>
                    </Col>
                    <Col xs="12" md="6">
                      <img
                            className="mb-3"
                            alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                            src={SchichtplanVeroeffentlichen}
                            title="Schichtplan Vorlage erstellen"
                            height={isMobile ? "70%" : "30%"}
                            width="100%"
                            ></img>
                    </Col>
                  </Row>
                  </Col>
                  </Row>
              </Container>
              </Row>
          <section className="section section-lg pt-lg-0 mt-8">
            <Container>
              <Row>
              <Col md="12" lg="6">
              <Row className="">
                <h2 className="display-3 text-default">Vorteile für dein Team</h2>
              </Row>
              <p className="lead text-default">
                    <Row className="mt-6">
                        🕗 Jederzeit in den digitalen Schichtplan eintragen
              </Row>
              <Row className="mt-2">
                        🌍 Von überall fertigen Schichtplan einsehen
              </Row>
              <Row  className="mt-2">
                        ⚡ Tauschanfragen innerhalb von Sekunden stellen
              </Row>
              <Row className="mt-2">
                        😇 Faire Verteilung der Schichten
              </Row>
              <Row className="mt-2">
                        👏 Transparente Schichtplanung
              </Row>
              </p>
            </Col>
            <Col md="12" lg="6">
            <img
                          className=""
                          alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                          src={AppEintragen}
                          title="Schichtplan Vorlage erstellen"
                          height="100%"
                          width="60%"
                          ></img>
            </Col>  
            </Row>        
          </Container>
          </section>
          <Container className="mt-6">
              <Row className="justify-content-center text-center">
                <Col md="12">
                  <h2 className="display-3 text-default">Unser Leistungsversprechen</h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center mb-4">
                <Col md="10">
                  <p className="lead">
                  Wir helfen dir Zeit & Geld zu sparen. Deshalb entwickeln unsere Lösung stetig weiter und gehen dabei die Wünsche unserer Kunden ein. Somit erhälst du mit Staffbite die Lösung, die dir wirklich weiterhilft.
                  </p>
                </Col>
              </Row>
              <Row className="mt-4">
                    <Col xs="12" sm="4">
                    <div>
                        <Row className="">
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
                                <a href="https://youtu.be/R0SpszGT0k8" class="stretched-link">Einfache Bedienbarkeit</a> <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
                                </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className="description mt-0">
                                  Wir legen höchsten Wert auf eine einfache Bedienbarkeit.
                                  </p>
                                </Col>
                              </Row>      
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr className="m-2"/>
                      <div>
                        <Row className="">
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
                                <Link to="/schichtplan-erstellen" class="stretched-link">Flexible Schichtpläne</Link> <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
                                </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className="description mt-0">
                                  Erstelle digitale, flexible Schichtpläne für deine Bedürfnisse in wenigen Minuten.
                                  </p>
                                </Col>
                              </Row>      
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr className="m-2"/>
                      <div>
                        <Row className="">
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
                                  <Link to="/automatisierter-schichtplan" class="stretched-link">Automatisierte Zuordnung </Link><i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
                                </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className="description mt-0">
                                  Nutze unsere automatisierte Zuordnung von Personal und Schichten.
                                  </p>
                                </Col>
                              </Row>      
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr className="m-2"/>
                    <div>
                        <Row className="">
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
                                <Link to="/pricing" class="stretched-link">Faire Preise</Link>  <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
                                </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className="description mt-0">
                                  Schau dir hier unsere Preise an - ideal für kleine Geschäfte.
                                  </p>
                                </Col>
                              </Row>      
                          </Col>
                          </Row>
                          </Col>
                        </Row>
                      </div>
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
          <Container>
              <Row className="justify-content-center mt-4 mb-4">
                <Col lg="12">
                  <h2 className="display-3 text-default">Alles auf einen Blick</h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary">
                        <Link to="/schichtplan-erstellen">Vorlagen erstellen</Link>
                      </CardTitle>
                      <CardText>
                        Wiederverwendbare Vorlagen
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary">
                      <Link to="/themen/schichtplan-erstellen">Jederzeit Einsehbar</Link>
                      </CardTitle>
                      <CardText>
                        Online via Computer & App
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary">
                      <Link to="/verfuegbarkeiten-eintragen">Schichten tauschen</Link>
                      </CardTitle>
                      <CardText>
                        Tauschanfragen schnell genehmigen
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary bold">
                      <Link to="/automatisierter-schichtplan">Automatisch</Link>
                      </CardTitle>
                      <CardText>
                        Automatisiere deinen Schichtplan
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary">
                      <Link to="/team-verwalten">Rollen & Positionen</Link>
                      </CardTitle>
                      <CardText>
                        Behalte dein Team im Blick
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Card>
                    <CardBody>
                      <CardTitle className="lead mt-0 mb-0 text-primary">
                      <Link to="/schichtplan-veroeffentlichen">Selbst eintragen</Link>
                      </CardTitle>  
                      <CardText>
                        Trage dich bei Bedarf einfach selbst ein
                      </CardText>                  
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          </Container>
          <ThemenSlider></ThemenSlider>
        </main>
        <LandingFooter/>
      </>
    );
}

export default Landing;
