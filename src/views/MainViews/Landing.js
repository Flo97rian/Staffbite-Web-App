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
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                      Müde vom stundenlangen Schichtplan puzzeln?{" "}
                      </h1>
                      <p className="lead text-white">
                      In einer Anwendung automatisiert dein Team planen und verwalten. Einfach und übersichtlich. Speziell entwickelt für die benötigte Flexibilität in der Gastronomie.
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
        </main>
        <LandingFooter/>
      </>
    );
  }
}

export default Landing;
