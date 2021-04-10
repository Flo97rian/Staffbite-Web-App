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
import classnames from "classnames";
import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";
import promo1 from "../../assets/img/theme/promo-1.png";
import img1 from "../../assets/img/theme/img-1-1200x1000.jpg";
import ill2 from "../../assets/img/ill/ill-2.svg";
import team1 from "../../assets/img/theme/team-1-800x800.jpg";
import team2 from "../../assets/img/theme/team-2-800x800.jpg";
import team3 from "../../assets/img/theme/team-3-800x800.jpg";
import team4 from "../../assets/img/theme/team-4-800x800.jpg";
import daniel from "../../assets/img/theme/Daniel Zellmann Profilbild.png";
import florian from "../../assets/img/theme/Florian Zellmann Profilbild.jpg";
import app from "../../assets/img/theme/App-Ansicht2.png";
import laptop from "../../assets/img/theme/Schichtplan Uebersicht.jpeg";


// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// index page sections


// core components
import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import CardsFooter from "../../components/Footers/CardsFooter.js";

// index page sections
import Download from "../IndexSections/Download.js";
import Hero from "../IndexSections/Hero.js";
import Buttons from "../IndexSections/Buttons.js";
import Inputs from "../IndexSections/Inputs.js";
import CustomControls from "../IndexSections/CustomControls.js";
import Menus from "../IndexSections/Menus.js";
import Navbars from "../IndexSections/Navbars.js";
import Tabs from "../IndexSections/Tabs.js";
import Progress from "../IndexSections/Progress.js";
import Pagination from "../IndexSections/Pagination.js";
import Pills from "../IndexSections/Pills.js";
import Labels from "../IndexSections/Labels.js";
import Alerts from "../IndexSections/Alerts.js";
import Typography from "../IndexSections/Typography.js";
import Modals from "../IndexSections/Modals.js";
import Datepicker from "../IndexSections/Datepicker.js";
import TooltipPopover from "../IndexSections/TooltipPopover.js";
import Carousel from "../IndexSections/Carousel.js";
import Icons from "../IndexSections/Icons.js";
import Login from "../IndexSections/Login.js";

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
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-hero section-shaped pb-250" style={{background: "linear-gradient(150deg,#7795f8 15%,#6772e5 70%,#555abf 94%)"}}>
              <DemoNavbar/>
              <div className="shape shape-style-1 shape-default">
                <span className="span-150"></span> <span className="span-50"></span>
                <span className="span-50"></span> <span className="span-75"></span>
                <span className="span-100"></span> <span className="span-75"></span>
                <span className="span-50"></span> <span className="span-100"></span>
                <span className="span-50"></span> <span className="span-100"></span>
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
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
                    className="fill-white"
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
                            <i className="ni ni-calendar-grid-58" />
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
          <br />
          <br />
          <br />
          <section className="section section-lg" id={"sectionloesung"}>
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
                    <p>
                    Bei uns stehen Sie als Kunde im Mittelpunkt. Wir möchten, dass Sie eine einfache und übersichtliche Benutzeroberfläche erhalten. Ihre Wünsche und Vorstellungen sind dabei essenziell. Wir entwickeln die Benutzeroberfläche gemeinsam mit Personalplanern im Kieler Umland, um jene Funktionalität abzubilden, welche Woche für Woche auch tatsächlich benötigt wird.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <br />
          <section className="section bg-secondary">
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
          <br />
          <br />
          <section className="section section-lg" >
            <br />
            <Container>
              <Row className="justify-content-center text-center mb-lg">
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
                        <span className="d-block mb-1">Daniel Zellmann</span>
                        <small className="h6 text-muted">Masterstudent Business Management</small>
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
                        <span className="d-block mb-1">Florian Zellmann</span>
                        <small className="h6 text-muted">
                          Bachelorstudent BWL
                        </small>
                      </h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <br />
          <section className="section section-lg bg-gradient-default">
            <br />
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3 text-white">Unsere Partner</h2>
                  <p className="lead text-white">
                    Interessierte Unternehmen
                  </p>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-shop text-primary" />
                  </div>
                  <h5 className="text-white mt-3">1</h5>
                  <p className="text-white mt-3">
                    Restaurant
                  </p>
                </Col>
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-shop text-primary" />
                  </div>
                  <h5 className="text-white mt-3">1</h5>
                  <p className="text-white mt-3">
                    Café
                  </p>
                </Col>
                <Col lg="4" className="text-center">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-bag-17  text-primary" />
                  </div>
                  <h5 className="text-white mt-3">1</h5>
                  <p className="text-white mt-3">
                    Einzelhändler
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
          </section>
          <br />
          <section className="section section-lg pt-lg-0 section-contact-us" id={"sectionkontakt"}>
            <Container>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Du hast noch Fragen?</h4>
                      <br />
                      <p className="mt-0">
                        Wir suchen nach Tester:innen für unsere Software-Lösung
                      </p>
                      <p className="mt-0">
                        Kontakt: mail@staffbite.de
                      </p>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Dein Name"
                            type="text"
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Deine E-Mail Adresse"
                            type="email"
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Schreib uns eine Nachricht.."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Nachricht senden
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Landing;
