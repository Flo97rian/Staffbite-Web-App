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
import React, {useEffect, useRef, useState} from "react";
// nodejs library that concatenates classes
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import BildSchichtplanErstellen from "../../assets/img/theme/Schichtplan-erstellen.png";
import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-befüllen.png"
import BefuellungStarten from "../../assets/img/landing/Befuellung-starten.png"
import LandingSchichtErstellen from "../../assets/img/landing/LandingSchichtErstellen.png"
import SchichtplanVeroeffentlichen from "../../assets/img/landing/Schichtplan-veroeffentlichen.png"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import LottieCalendar from '../../assets/json/animation/LottieCalendar.json';
import {isMobile} from 'react-device-detect';


// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Row,
  Badge,
  Col,
  Button,
  CardTitle,
  CardText,
  UncontrolledAlert,
  Alert,
  CardSubtitle
} from "reactstrap";
// core components
import LandingFooter from "../../components/Footers/LandingFooter.js";
import { pageview } from "react-ga";
import { LANDING_DESCRIPTION, LANDING_TITLE } from "../../constants/MetaTexts";
import ErstellenShow from "./sub/ErstellenShow";
import SchichtplanVorlage from "../../assets/img/theme/Vorlage-erstellen.png";
import LogoWTSH from "../../assets/img/landing/Netzwerk/LogoWTSH.png";
import LogoGS from "../../assets/img/landing/Netzwerk/LogoGS.png";
import LogoVentureWaerft from "../../assets/img/landing/Netzwerk/LogoVentureWaerft.png";
import SchichtEintragen from "../../assets/img/landing/VerfügbarkeitenEintragen/SchichtEintragenMitFinger.png";
import AppEintragen from "../../assets/img/app/App-eintragen-uebersicht-smartphone.png";
import ThemenSlider from "./Themen/ThemenSlider";
import TrialBanner from "./sub/TrialBanner";


const LandingCopy = (props) => {
  const [state, setState] = useState({})
  const SchichtplanSchritteRef = useRef()
  useEffect(() => {
    pageViewsTracking()
  },[])


  function setSchichtplanSchritteTop(event) {
    SchichtplanSchritteRef.current.focus()
    window.scrollTo({ behavior: 'smooth', top: SchichtplanSchritteRef.current.offsetTop})
  }

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
            <section className="section section-lg section-hero section-shaped pb-100 staffbite-bg-facebook-messenger">
              <div className="shape shape-style-1 shape-default">
              </div>

            <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
              <Container className="pt-5">
                  <Row>
                    <Col></Col>
                    <Col>
                    <Player 
                          className="shadow"
                          autoplay
                          keepLastFrame

                          src={LottieCalendar}>
                          </Player>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="staffbite-mt-4 staffbite-pt-6 text-center pt-2">
                    <Col md="12" lg="12" className="slide-from-left-30">
                      <h1 className="staffbite-display-3 text-white pb-0 mb-0">
                      Der einfachste Weg zum digitalen Schichtplan
                      {" "}
                      </h1>
                      </Col>
                  </Row>
                  <Row className="text-center">
                      <Col md="12" lg="12">
                        <h3 className="text-white lead">
                          Erstelle deinen Schichtplan innerhalb weniger Sekunden.
                          <br/>
                            Deine Alternative zu Excel. Ideal bis 50 Mitarbeiter.
                        </h3>
                        <Row className="">
                          <Col xs="12" lg="12" className="mt-4">
                        <Link to="/shiftplan">
                        <Button className="btn-icon" color="success" type="button"
                        onClick={
                            () => {
                            if(process.env.NODE_ENV !== "development") {    
                              ReactGA.event({
                                category: 'Demo',
                                action: 'Landing CTA Open MVP'
                              })}
                              }
                            }
                          ><p className="p-0 m-0">Schichtplan erstellen</p></Button>
                        </Link>
                        </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                          <small className="text-white">Ohne Anmeldung</small>
                          </Col>
                        </Row>
                    </Col>                    
                  </Row>
              </Container>

                <div className="separator separator-bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100 "
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-secondary"
                    points="2560 0 2560 250 0 100"
                  />
                </svg>
              </div>
            </section>
            </div>
            <div ref={SchichtplanSchritteRef}></div>
            <Container className="my-6">
                <Row className="text-center">
                  <Col>
                      <Row>
                        <h2 className="display-4">
                          Staffbite ist eine neue Art der Schichtplanung und funktioniert{" "}<a className="display-4 text-primary">wie ein Kalender.</a> 
                        </h2>
                      </Row>
                      <Row className="text-center">
                      <h2 className="display-4">
                        Es ist einfach und enthält viele hilfreiche Unterstützungen.
                      </h2>
                      </Row>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="4">
                      <h3>Kostenlos</h3>
                      <ul><i className="fas fa-check"></i>{" "}Digitaler Schichtplan</ul>
                      <ul><i className="fas fa-check"></i>{" "}Unbegrenzt Schichtpläne erstellen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Unbegrenzt Mitarbeiter einladen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Alternative zum Excel Schichtplan</ul>
                  </Col>
                  <Col xs="12" md="4">
                      <h3>Pro</h3>
                      <ul><i className="fas fa-check"></i>{" "}Automatisierter Schichtplan</ul>
                      <ul><i className="fas fa-check"></i>{" "}Mitarbeiter App</ul>
                      <ul><i className="fas fa-check"></i>{" "}Push-Benachrichtigungen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Tauschanfragen verwalten</ul>
                      <ul><i className="fas fa-check"></i>{" "}Urlaubsplaner (in Entwicklung)</ul>
                  </Col>
                  <Col xs="12" md="4">
                      <br/>
                      <ul><i className="fas fa-check"></i>{" "}Rollen & Berechtigungen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Automatische Team-Benachrichtigungen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Selbst eintragen</ul>
                      <ul><i className="fas fa-check"></i>{" "}Zeiterfassung (in Entwicklung)</ul>
                  </Col>
                </Row>
              </Container>
            <Container className="mt-2 mt-sm-0">
              <Row className=" text-center">
                <Col  xs="12" >
                  <h2 className="display-3 opacity-title">So funktioniert's - In nur vier Schritten</h2>
                </Col>
              </Row>
              <Row className="mt-4">
              <Col className="text-center" style={{ transform: "translateY(-50%)"}}>
                <i className="fas fa-angle-down fa-3x slide-down-up-x3" onClick={(event) => setSchichtplanSchritteTop(event)}></i>
                </Col>
              </Row>
              <Row className="pt-4 mx-4" >
                <Col xs="12">
                <Row className="text-center">
                    <Col xs={isMobile ? {span:12, order: 2}: {span: 12, order: 1}} md="6" className="order-sm-2 order-md-1">
                      <Card className="bg-transparent shadow-none mb-5 mt-5">
                      <img
                          className="shadow"
                          alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                          src={LandingSchichtErstellen}
                          title="Schichtplan Vorlage"
                          height="100%"
                          width="100%"
                          ></img>
                          </Card>
                    </Col>
                    <Col xs={isMobile ? {span:12, order: 1}: {span: 12, order: 2}} md="6" className={isMobile ? "order-0": ""}>
                      <Row className="pt-3" style={!isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-right">
                          <Col xs="2" className="">
                            <Badge color="primary" className="badge-lg lead-text badge-circle badge-outline badge-floating border-white mt-0 ">1</Badge>
                          </Col>
                          <Col xs="10" >
                            <h2 className="display-4 text-left">Erstelle deinen Schichtplan</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className={ isMobile ? "text-center mt-4" : ""} style={!isMobile ? { transform: "translateY(10%)"}: {}}>
                        <Col>
                          <p className="lead-text mt-2">
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
                              Name der Schicht festlegen
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="0" md="2"></Col>
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Benötigte Mitarbeiter angeben
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="0" md="2"></Col>
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Beginn & Ende auswählen
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
                            <Badge color="primary" className="badge-lg lead-text badge-circle badge-outline badge-floating border-white mt-0 ">2</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4">Dein Team trägt sich ein</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead-text mt-4" style={!isMobile ? { transform: "translateY(10%)"} : {}}>
                      <Row className="text-left">
                        <Col>Deine Mitarbeiter*innen tragen sich <Link to="/fuer-dein-team" className="stretched-link">online in deinen Schichtplan</Link> ein. Das geht jederzeit per Smartphone, Tablet oder Laptop.
                          </Col>
                      </Row>
                      <Row className="mt-4 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              Schichtplan auswählen
                            </Col>
                            </Row>
                            <Row className="mt-2 text-left">
                            <Col xs="1" className="mt-0">
                              <i className="fas fa-check-circle text-success"></i>
                            </Col>
                            <Col xs="9">
                              In Wunschschichten eintragen
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
                    <Card className="bg-transparent shadow-none">
                      <img
                          className="shadow"
                          alt="Abbildung eines Schichtplans von Staffbite"
                          src={SchichtEintragen}
                          title="Eintragen in den Schichtplan"
                          height="50%"
                          width="100%"
                          ></img>
                      </Card>
                    </Col>
                  </Row>
                  </Col>
                  </Row>
                  <Row className=" mx-4">
                <Col>
                <Row className="text-center mt-0">
                    <Col xs={isMobile ? {span:12, order: 2}: {span: 12, order: 1}} md="6">
                    <Card className="bg-transparent shadow-none">
                      <img
                          className="shadow mb-3"
                          alt="Abbildung der Befüllung des Schichtplans"
                          src={BefuellungStarten}
                          title="Automatisierte Befüllung starten"
                          height={isMobile ? "80%" : "50%"}
                          width="100%"
                          ></img>
                          </Card>
                    </Col>
                    <Col xs={isMobile ? {span:12, order: 1}: {span: 12, order: 2}} md="6">
                    <Row className="pt-3" style={isMobile ? { transform: "translateY(50%)"}: {}}>
                        <Col>
                        <Row className="text-right">
                          <Col xs="2" className="">
                            <Badge color="primary" className="badge-lg lead-text badge-circle badge-outline badge-floating border-white mt-0 ">3</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4 text-left">Automatisierte Befüllung</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead-text mt-4 ">
                      <Row className={ isMobile ? "text-left mt-5" : "text-left"} style={!isMobile ? { transform: "translateY(10%)"}: {}}>
                      {!isMobile ? <Col xs="2"></Col> : <></>}
                        <Col>
                          Dein Schichtplan wird per Mausklick innerhalb weniger Sekunden <Link to="/automatisierter-schichtplan">automatisiert befüllt</Link>. Auf diese Weise sparst du mehrere Stunden Arbeit jede Woche!
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
                            <Badge color="primary" className="badge-lg lead-text badge-circle badge-outline badge-floating border-white mt-0 ">4</Badge>
                          </Col>
                          <Col xs="10">
                            <h2 className="display-4 text-left">Schichtplan veröffentlichen</h2>
                          </Col>
                          </Row>
                        </Col>
                      </Row>
                      <p className="lead-text mt-4 pt-0">
                      <Row className="text-left mt-0 pt-0" style={isMobile ? { transform: "translateY(10%)"}: {}}>
                        <Col className="">
                          Nach der Befüllung kannst du entweder letzte Anpassungen vornehmen oder du veröffentlichst den <Link to="/schichtplan-veroeffentlichen">fertigen Schichtplan</Link> mit einem Klick.
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
                              Tauschanfragen direkt im Plan verwalten
                            </Col>
                            </Row>
                    </p>
                    </Col>
                    <Col xs="12" md="6">
                    <Card className="bg-transparent shadow-none">
                      <img
                            className="mb-3"
                            alt="Abbildung der Buttons zum Veröffentlichen des Schichtplans von Staffbite"
                            src={SchichtplanVeroeffentlichen}
                            title="Schichtplan veröffentlichen"
                            height={isMobile ? "70%" : "30%"}
                            width="100%"
                            ></img>
                      </Card>
                    </Col>
                  </Row>
                  </Col>
                  </Row>
              </Container>
            <section className="section section-lg pt-lg-0 mt-6">
            <Container>
            <Row>
              <h2 className="display-3 text-default">Unser Netzwerk</h2>
            </Row>
            <Row className="">
              <Col className="">
              <a href="https://wtsh.de">               
                <img
                  className=""
                  alt="Logo der WTSH"
                  src={LogoWTSH}
                  title="WTSH Logo"
                  height="90%"
                  width="80%"
                  ></img>
                  </a>
              </Col>

              <Col className="pt-sm-6">
              <a href="https://gruendungsstipendium-sh.de/"> 
                <img
                  className=""
                  alt="Logo des Gründungsstipendiums Schleswig-Holsein"
                  src={LogoGS}
                  title="Gründungsstipendium Logo"
                  height="50%"
                  width="90%"
                  ></img>
                  </a>
              </Col>
              
              <Col className="pt-sm-7">
              <a href="https://venturewaerft.com/de/"> 
                <img
                    className=""
                    alt="Logo der Venture Waerft Flensburg-Sonderborg"
                    src={LogoVentureWaerft}
                    title="Venture Waerft Logo"
                    height="40%"
                    width="80%"
                    ></img>
                    </a>
              </Col>

            </Row>
          </Container>
          </section>


          <section className="section section-lg pt-lg-0 mt-5 mt-sm-8">
            <Container>
              <Row>
              <Col md="12" lg="6">
              <Row className="">
                <Col>
                <h2 className="display-3 text-default">Vorteile für dein Team</h2>
                </Col>
              </Row>
              <p className="lead-text text-default">
              
              <Row className="mt-sm-6">
              <Col>
                        🕗 Jederzeit in den digitalen Schichtplan eintragen
              </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                        🌍 Von überall den fertigen Schichtplan einsehen
                </Col>
              </Row>
              <Row  className="mt-2">
              <Col>
                        ⚡ Tauschanfragen innerhalb von Sekunden stellen
              </Col>
              </Row>
              <Row className="mt-2">
                    <Col>
                        😇 Faire Verteilung der Schichten
                    </Col>
              </Row>
              <Row className="mt-2">
                        <Col>
                        👏 Transparente Schichtplanung
                        </Col>
              </Row>
              </p>
              
              <Row>
              <Col>
              <Link to="/fuer-dein-team">
                <Button className="btn-icon btn-3 mt-5" color="info" type="button"><p className="p-0 m-0">Weitere Informationen</p></Button>
              </Link>
              </Col>
              </Row>

            </Col>
            <Col md="12" lg="6">
            <img
                          className=""
                          alt="Abbildung der Mitarbeiter-App von Staffbite"
                          src={AppEintragen}
                          title="Mitarbeiter-App"
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
                  <p className="lead-text">
                  Wir helfen dir Zeit & Geld zu sparen. Wir entwickeln unsere Lösung stetig weiter und gehen dabei auf die Wünsche unserer Kunden ein. Somit erhälst du mit Staffbite die Lösung, die dir wirklich weiterhilft.
                  </p>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                <Link to="/contact">
                <Button className="btn-icon btn-3 mt-2" color="success" type="button"><p className="p-0 m-0">Persönliches Erstgespräch vereinbaren</p></Button>
              </Link>
                </Col>
              </Row>

              <Row className="mt-5">
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
                                <h3 className="lead-text mb-0 mt-0">
                                <a href="https://youtu.be/R0SpszGT0k8" className="stretched-link">Einfache Bedienbarkeit</a> <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
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
                                <h3 className="lead-text mb-0 mt-0">
                                <Link to="/schichtplan-erstellen" className="stretched-link">Flexible Schichtpläne</Link> <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
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
                                <h3 className="lead-text mb-0 mt-0">
                                  <Link to="/automatisierter-schichtplan" className="stretched-link">Automatisierte Zuordnung </Link><i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
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
                          <Col  xs="12" md="2">
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
                                <h3 className="lead-text mb-0 mt-0">
                                <Link to="/pricing" className="stretched-link">Faire Preise</Link>  <i className="float-right mt-1 fas fa-arrow-right icon-size-sm text-default"></i>
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
                    alt="Fertiger Schichtplan für dich und dein Team"
                    src={SchichtplanBeispiel}
                    title="Beispiel eines vollständigen Schichtplans"
                    height="100%"
                    width="100%"
                  />
                </Col>
              </Row>
            </Container>
          <ThemenSlider></ThemenSlider>
        </main>
        <LandingFooter/>
      </>
    );
}

export default LandingCopy;
