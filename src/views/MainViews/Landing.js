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
import React from "react";
// nodejs library that concatenates classes
import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import daniel from "../../assets/img/theme/Daniel-Zellmann-Profilbild.jpg";
import florian from "../../assets/img/theme/Florian Zellmann Profilbild.jpg";
import app from "../../assets/img/theme/App-Ansicht2.png";
import laptop from "../../assets/img/theme/Schichtplan-Uebersicht.jpg";


// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  Container,
  Row,
  Col
} from "reactstrap";

// index page sections


// core components
import LandingFooter from "../../components/Footers/LandingFooter.js";


class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main" className="mt-5">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-hero section-shaped pb-250" style={{background: "linear-gradient(150deg,#7795f8 15%,#6772e5 70%,#555abf 94%)"}}>
            <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row className="mt-4">
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                      Müde vom stundenlangen Schichtplan puzzeln?{" "}
                      </h1>
                      <p className="lead text-white">
                      In einer Anwendung automatisiert Personal planen und verwalten. Einfach und übersichtlich. Speziell entwickelt für die benötigte Flexibilität in der Gastronomie.
                      </p>
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
          <br />
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h2 className="display-3 text-white">Unser Leistungsversprechen</h2>
                  <br />
                  <Row className="row-grid">
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            Einfach
                          </h6>
                          <p className="description mt-3">
                          Wir legen höchsten Wert auf eine einfache Bedienbarkeit. Diese Qualität stellen wir durch regelmäßige und umfangreiche Produkttests sicher.
                          </p>
                          <br />
                          <br />
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="fas fa-calendar" />
                          </div>
                          <h6 className="text-success text-uppercase">
                          Flexibel
                          </h6>
                          <p className="description mt-3">
                          Jedes Geschäft ist auf seine Weise einzigartig und so muss auch das Personal geplant werden. Aus diesem Grund bieten wir die Möglichkeit, in wenigen Minuten flexible Schichtpläne zu entwerfen und zu verwalten.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-settings-gear-65" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            Automatisiert
                          </h6>
                          <p className="description mt-3">
                          Zeit ist Geld – auch für unsere Kunden. Deshalb automatisieren wir die zeitfressende Zuordnung von Personal und Schichten. So können wir garantieren, dass stets genug Personal in Ihrem Geschäft bereit steht.
                          </p>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                            <i className="ni ni-tag" />
                          </div>
                          <h6 className="text-info text-uppercase">
                          Faire Preise
                          </h6>
                          <p className="description mt-3">
                          Transparente Preise sind die Grundlage für eine vertrauensvolle Zusammenarbeit. Deshalb gestalten wir unsere Preise nachvollziehbar und fair - besonders für kleine Geschäfte.
                          </p>
                          <br />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg mt-8" id={"sectionloesung"}>
            <Container>
            <h2 className="display-3">Unsere Softwarelösung</h2>
                  <br />
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    src={laptop}
                    style={{ width: "700px", height: "400px"}}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-laptop" />
                    </div>
                    <h3>Für die Personalplaner:innen</h3>
                    <p className="lead">
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. Ihre Wünsche und Vorstellungen sind dabei essenziell. Wir entwickeln die Benutzeroberfläche gemeinsam mit Personalplanern im Kieler Umland, um jene Funktionalität abzubilden, welche Woche für Woche auch tatsächlich benötigt wird.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <br />
          <section className="section bg-secondary mt-8">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="6">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={app}
                      top
                    />
                  </Card>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle mb-5">
                      <i className="ni ni-mobile-button" />
                    </div>
                    <h3>Für die Mitarbeiter:innen</h3>
                    <p className="lead">
                    Für Ihre Mitarbeiter:innen entwickeln wir eine kostenlose App, welche schlank und übersichtlich alle benötigten Informationen zur Bewerbung auf Schichten bündelt. Darüber hinaus werden wir eine Benachrichtigung implementieren, welche ihre Mitarbeiter:innen über Schichtplanänderungen informiert.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg mt-6" id={"aboutus"}>
            <Container className="mt-6 mb-6">
              <Row className="justify-content-center text-center mb-lg mb-4 mt6">
                <Col lg="8">
                  <h2 className="display-3">Über uns</h2>
                </Col>
              </Row>
              <Row>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={daniel}
                      style={{ width: "200px", height: "200px"}}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <h3 className="d-block mb-1">Daniel Zellmann</h3>
                        <small className="h6 lead">Masterstudent Business Management</small>
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={florian}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <h3 className="d-block mb-1">Florian Zellmann</h3>
                        <small className="h6 lead">
                          Bachelorstudent BWL
                        </small>
                      </h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg bg-secondary mb-2 mt-2">
            <br />
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3">Unsere Partner</h2>
                  <p className="lead">
                    Interessierte Unternehmen
                  </p>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-shop text-primary" />
                  </div>
                  <h5 className="lead mt-3">3</h5>
                  <p className="lead mt-3">
                    Restaurant
                  </p>
                </Col>
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-shop text-primary" />
                  </div>
                  <h5 className="lead mt-3">1</h5>
                  <p className="lead mt-3">
                    Café
                  </p>
                </Col>
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-bag-17  text-primary" />
                  </div>
                  <h5 className="lead mt-3">1</h5>
                  <p className="lead mt-3">
                    Einzelhändler
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
          </section>
          <section className="section section-lg pt-lg-0 section-contact-us mt-4 mb-4" id={"sectionkontakt"}>
            <Container className="mt-4 mb-4">
              <Row className="justify-content-center mt--300 mb-4 mt-4">
                <Col lg="8">
                  <Card className="bg-white shadow mb-4 mt-4">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Du hast noch Fragen?</h4>
                      <br />
                      <p className="mt-0">
                        Wir suchen nach Tester:innen für unsere Software-Lösung
                      </p>
                      <p className="mt-0">
                        Wir freuen uns auf deine Nachricht!
                      </p>
                      <p className="mt-0">
                        Kontakt: info@staffbite.de
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <LandingFooter/>
      </>
    );
  }
}

export default Landing;
