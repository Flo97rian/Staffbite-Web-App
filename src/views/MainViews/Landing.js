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
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
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

              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row className="mt-6">
                    <Col md="12" lg="6">
                      <h1 className="display-3 text-white pb-5">
                      Müde vom stundenlangen Schichtplan puzzeln?{" "}
                      </h1>
                      
                      <div>
                        <p className="lead text-white m-1">
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
                      </div>
                      
                      
                    </Col>
                    <Col className="order-md-2" md="6" lg="5">
                      <Container>
                        <Row className="align-center">
                          <ErstellenShow></ErstellenShow>
                        </Row>
                      </Container>
                    </Col>                    
                  </Row>
                </div>
              </Container>
              
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
            </section>
          </div>
          <section className="section section-lg pt-lg-0 mt--150">
            <Container className="mt-4">
              <Row className="justify-content-center">
                <Col lg="12">
                  <h2 className="display-3 text-white">So funktioniert's - in nur vier Schritten</h2>
                  <Row className="row-grid">
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5 pb-6">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          👩‍💻
                          </div>
                          <CardTitle className="h5 text-primary text-uppercase">
                             <Link to="/schichtplan-erstellen">1. Schichtplan erstellen</Link>
                          </CardTitle>
                          <CardSubtitle className="description mt-3" tag="p">
                            Mit wenigen Klicks erstellst du deinen <Link to="/schichtplan-erstellen" class="stretched-link">digitalen Schichtplan</Link> für dich und dein Team. 
                          </CardSubtitle>
                          
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5 pb-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          📲
                          </div>
                          <CardTitle className="h5 text-success text-uppercase">
                          <Link to="/fuer-dein-team" class="stretched-link">2. In Schichtplan Eintragen</Link>
                          </CardTitle>
                          <CardSubtitle className="description mt-3" tag="p">
                            Deine Mitarbeiter*innen tragen sich in deinen <Link to="/fuer-dein-team" class="stretched-link">online Schichtplan</Link>ein. Das geht jederzeit per Smartphone oder Laptop.
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-4 pb-5">
                          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                          🤩
                          </div>
                          <CardTitle className="h5 text-warning text-uppercase">
                            <Link to="/automatisierter-schichtplan" class="stretched-link">3. Automatisierte Befüllung</Link>
                          </CardTitle>
                          <CardSubtitle className="description mt-3" tag="p">
                            Unsere Lösung befüllt deinen <Link to="/automatisierter-schichtplan" class="stretched-link">Schichtplan automatisiert</Link> innerhalb weniger Sekunden.
                          </CardSubtitle>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="pt-4 pb-0">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          🎉
                          </div>
                          <CardTitle className="h5 text-info text-uppercase">
                            <Link to="/schichtplan-veroeffentlichen" class="stretched-link">4. Schichtplan veröffentlichen</Link>
                          </CardTitle>
                          <CardSubtitle className="description mt-3" tag="p">
                            Bei Bedarf kannst du noch Anpassungen vornehmen. Anschließend veröffentlichst du den <Link to="/schichtplan-veroeffentlichen" class="stretched-link">fertigen Schichtplan</Link> mit einem Klick.
                          </CardSubtitle>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          
          <section className="section section-lg pt-lg-0 mt-8">
            <Container>
              <Row className="justify-content-center">
                <h2 className="display-3 text-default">Vorteile für dein Team</h2>
              </Row>
              
              <Col md="12" lg="6">
              <p className="lead text-default m-1">
                    <Row className="mt-6">
                        🕗 Jederzeit in den Schichtplan eintragen
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
            </Col>          
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
                                  Erstelle flexible Schichtpläne für deine Bedürfnisse in wenigen Minuten.
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
                <Col>
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
                <Col>
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
                <Col>
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
                <Col>
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
                <Col>
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
                <Col>
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
        </main>
        <LandingFooter/>
      </>
    );
}

export default Landing;
