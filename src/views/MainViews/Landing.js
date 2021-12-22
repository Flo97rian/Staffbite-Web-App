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
import React, {useEffect, useState, useRef} from "react";
// nodejs library that concatenates classes
import { Helmet } from "react-helmet";
import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import BildSchichtplanErstellen from "../../assets/img/theme/Schichtplan-erstellen.png";
import MitarbeiterAppBeispiel from "../../assets/img/theme/Schichtplan-App-Mitarbeiter.png"
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"


// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  Container,
  CardHeader,
  Row,
  Col,
  CardFooter
} from "reactstrap";

// index page sections


// core components
import LandingFooter from "../../components/Footers/LandingFooter.js";
import { pageview } from "react-ga";
import { LANDING_DESCRIPTION, LANDING_TITLE } from "../../constants/MetaTexts";
import SchichtplanErstellen from "../../components/Admin/Schichtplan/Form/SchichtplanErstellen";


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
          <meta property="og:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="og:url" content="https://www.staffbite.de"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image" content={BildSchichtplanErstellen}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Digitale Schichtplanung jederzeit online und per App."/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="twitter:url" content="https://www.staffbite.de"></meta>
          <meta property="twitter:image" content={BildSchichtplanErstellen}></meta>
          <meta property="twitter:type" content="website"></meta>
          <link rel="canonical" href="https://www.staffbite.de" />
        </Helmet>
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-hero section-shaped pb-250 bg-gradient-info">
            <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row className="mt-6">
                    <Col md="12" lg="10">
                      <h1 className="display-3 text-white pb-5">
                      Müde vom stundenlangen Schichtplan puzzeln?{" "}
                      </h1>
                      <div>
                        <i className="fas fa-check fas-lg mr-2 text-white float-left pt-2" />
                        <p className="lead text-white m-1">
                            Mit unserer Lösung erstellst du mit wenigen Klicks deinen digitalen Schichtplan 
                        </p>
                      </div>
                      <div>
                        <i className="fas fa-check fas-lg mr-2 text-white float-left pt-2" />
                        <p className="lead text-white m-1">
                            Einfach und übersichtlich  
                        </p>
                      </div>
                      <div>
                        <i className="fas fa-check fas-lg mr-2 text-white float-left pt-2" />
                        <p className="lead text-white m-1">
                            Wir bieten die benötigte Flexibilität für die Gastronomie, Hotellerie und den Einzelhandel  
                        </p>
                      </div>
                      <div>
                        <i className="fas fa-check fas-lg mr-2 text-white float-left pt-2" />
                        <p className="lead text-white m-1">
                          Probiere es direkt aus - im kostenlosen Probemonat!
                        </p>
                      </div>
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
            <Container className="">
              <Row className="justify-content-center">
                <Col lg="12">
                  <h2 className="display-3 text-white">So funktioniert's</h2>
                  <Row className="row-grid">
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5 pb-6">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="fas fa-laptop" />
                          </div>
                          <h3 className="h6 text-primary text-uppercase">
                             1. Schichtplan erstellen
                          </h3>
                          <p className="description mt-3">
                            Mit wenigen Klicks erstellst du deinen digitalen Schichtplan für dich und dein Team. 
                          </p>
                          <a href="/schichtplan/#sectioncreate" class="stretched-link"></a>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5 pb-2">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="far fa-edit" />
                          </div>
                          <h3 className="h6 text-success text-uppercase">
                          2. Verfügbarkeiten eintragen
                          </h3>
                          <p className="description mt-3">
                            Deine Mitarbeiter*innen tragen ihre Verfügbarkeiten ein. Das geht jederzeit per Smartphone oder Laptop.
                          </p>
                          <a href="/schichtplan/#sectionapp" class="stretched-link"></a>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5 pb-2">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="far fa-grin-hearts" />
                          </div>
                          <h3 className="h6 text-warning text-uppercase">
                            3. Automatisierte Befüllung
                          </h3>
                          <p className="description mt-3">
                            Unsere Lösung befüllt deinen Schichtplan automatisiert innerhalb weniger Sekunden.
                          </p>
                          <a href="/schichtplan/#sectionalg" class="stretched-link"></a>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="pt-5 pl-4 pr-4 pb-0">
                          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                            <i className="fas fa-cloud" />
                          </div>
                          <h3 className="h6 text-info text-uppercase">
                            4. Schichtplan veröffentlichen
                          </h3>
                          <p className="description mt-3">
                            Bei Bedarf kannst du noch Anpassungen vornehmen. Anschließend veröffentlichst du den fertigen Schichtplan mit einem Klick.
                          </p>
                          <a href="/schichtplan/#sectionalg" class="stretched-link"></a>
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
                    <Row className="mt-6">
                        <i className="fas fa-check fas-lg mr-2 text-success float-left pt-2" />
                        <p className="lead text-default m-1">
                            Jederzeit in den Schichtplan eintragen
                        </p>
              </Row>
              <Row>
                        <i className="fas fa-check fas-lg mr-2 text-success float-left pt-2" />
                        <p className="lead text-default m-1">
                            Von überall fertigen Schichtplan einsehen
                        </p>
              </Row>
              <Row>
                        <i className="fas fa-check fas-lg mr-2 text-success float-left pt-2" />
                        <p className="lead text-default m-1">
                            Tauschanfragen innerhalb von Sekunden stellen
                        </p>
              </Row>
              <Row>
                        <i className="fas fa-check fas-lg mr-2 text-success float-left pt-2" />
                        <p className="lead text-default m-1">
                            Faire Verteilung der Schichten
                        </p>
              </Row>
              <Row>
                        <i className="fas fa-check fas-lg mr-2 text-success float-left pt-2" />
                        <p className="lead text-default m-1">
                            Transparenz im Prozess der Schichtplanung
                        </p>
              </Row>
            </Col>
            <Col md="12" lg="6">
            </Col>          
          </Container>
          </section>
          <section className="section section-lg pt-lg-0 mt-8">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h2 className="display-3 text-default">Unser Leistungsversprechen</h2>
                  <Row className="row-grid">
                    <Col lg="3">
                      <Card className="card-lift--hover border-1 border-ocean">
                        <CardBody className="py-5 pb-6">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h3 className="h6 text-primary text-uppercase">
                            Einfach
                          </h3>
                          <p className="description mt-3">
                          Wir legen höchsten Wert auf eine einfache Bedienbarkeit. Diese Qualität stellen wir durch regelmäßige und umfangreiche Produkttests sicher.
                          </p>
                          <a href="https://youtu.be/R0SpszGT0k8" class="stretched-link"></a>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="pt-5 pl-4 pr-4 pb-1">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="fas fa-calendar" />
                          </div>
                          <h3 className="h6 text-success text-uppercase">
                          Flexibel
                          </h3>
                          <p className="description mt-3">
                          Jedes Geschäft ist auf seine Weise einzigartig und so muss auch das Personal geplant werden. Aus diesem Grund bieten wir die Möglichkeit, in wenigen Minuten flexible Schichtpläne zu entwerfen und zu verwalten.
                          </p>
                          <a href="https://youtu.be/fHdCLhBIYIA" class="stretched-link"></a>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="pt-5 pl-4 pr-4 pb-6">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-settings-gear-65" />
                          </div>
                          <h3 className="h6 text-warning text-uppercase">
                            Automatisiert
                          </h3>
                          <p className="description mt-3">
                          Zeit ist Geld – auch für unsere Kunden. Deshalb automatisieren wir die zeitfressende Zuordnung von Personal und Schichten.
                          </p>
                          <a href="/schichtplan/#sectionalg" class="stretched-link"></a>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card border="primary" className="card-lift--hover shadow border-4">
                        <CardBody className="pt-5 pl-4 pr-4 pb-1">
                          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                            <i className="ni ni-tag" />
                          </div>
                          <h3 className="h6 text-info text-uppercase">
                          Faire Preise
                          </h3>
                          <p className="description mt-3">
                          Transparente Preise sind die Grundlage für eine vertrauensvolle Zusammenarbeit. Deshalb gestalten wir unsere Preise nachvollziehbar und fair - besonders für kleine Geschäfte.
                          </p>
                          <a href="/pricing" class="stretched-link"></a>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <LandingFooter/>
      </>
    );
}

export default Landing;
