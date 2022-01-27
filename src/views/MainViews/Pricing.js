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
import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  CardFooter,
  CardHeader,
  CardBody,
  CardImg,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  Col,
  Button

} from "reactstrap";
// core components
import { pageview } from "react-ga";
import ReactGA from "react-ga";
import Paperwork from "../../assets/img/themen/PaperworkImage.png"
import Possibilities from "../../assets/img/themen/Possibilities.png"
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";
import { Helmet } from "react-helmet";

const Pricing = (props) => {
  let mainContent = useRef("mainContent")
  useEffect(() => {
    pageViewsTracking()
  },[])




  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  function pageViewsTracking () {
    const pathname = "/pricing";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

    return (
    <div ref={mainContent}>
        <Helmet>
          <title>Preise</title>
          <meta name="description" charSet="utf-8" content="Preise & Vertragsbedingungen. Kostenloser Probemonat" />
          <link rel="canonical" href="https://www.staffbite.de/pricing" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite.",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
                <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1> Unsere Preise</h1>
                    </Row>
                </Container>
                <Container className="mb-4 pt-4">
                  <Card className="shadow">
                    <h2 className="h3 pl-3 pt-3 pb-0 mb-0">Diese Funktionalitäten sind in allen Paketen enthalten!</h2>
                    <Row className="align-items-center p-1 pt-3">
                      <Col xs="12" lg="6">
                      <Row className="align-items-center">
                      <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                      <p class="text-muted lead m-0 p-0">Digitaler Dienstplan</p>
                      </Row>
                      </Col>
                      <Col xs="12" lg="6">
                      <Row className="align-items-center">
                      <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                      <p class="text-muted lead m-0 p-0">Kostenloser Probemonat</p>
                      </Row>
                      </Col>
                    </Row>
                    <Row className="align-items-center p-1">
                      <Col xs="12" lg="6">
                        <Row className="align-items-center"> 
                        <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                        <p class="text-muted lead m-0 p-0">Automatisierte Befüllung der Dienstpläne</p>
                        </Row>
                      </Col>
                      <Col xs="12" lg="6">
                        <Row className="align-items-center">
                        <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                        <p class="text-muted lead m-0 p-0">Nur zwei Wochen Kündigungsfrist</p>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="align-items-center p-1 pb-2">
                      <Col xs="12" lg="6">
                        <Row className="align-items-center">
                          <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                          <p class="text-muted lead m-0 p-0">Support per E-Mail und Telefon</p>
                        </Row>
                      </Col>
                      <Col xs="12" lg="6">
                      <Row className="align-items-center">
                      <i class="fas fa-check ml-3 pl-3 pr-3 text-success"></i>
                      <p class="text-muted lead m-0 p-0">Dein ganzes Team auf einen Blick</p>
                      </Row>
                      </Col>
                      <Col xs="12" lg="6">
                        <Row className="align-items-center">
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Container>
        <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-4">
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-white zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-info lead py-3 mb-0">Bis 25 Mitarbeiter</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-info display-2">
                        50€
                      </h3>
                      <span class="text-info ls-1 p">pro Monat</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button" onClick={
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Auswahl Kategorie bis 25'
                            })}
                            ><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 mt-0 pt-0">
                    <span class="text-info ls-1 p">10% sparen</span>
                    <h3 className="h1 text-info display-3">
                      540€
                    </h3>
                    <span class="text-info ls-1 p">bei jährlicher Zahlweise</span>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-info zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Bis 50 Mitarbeiter</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-white display-2">
                        100€
                      </h3>
                      <span class="text-white ls-1 p">pro Monat</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button" 
                          onClick={
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Auswahl Kategorie bis 50'
                            })}><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 pt-0">
                    <span class="text-white ls-1 p">10% sparen</span>
                    <h3 className="h1 text-white display-3">
                      1.080€
                    </h3>
                    <span class="text-white ls-1 p">bei jährlicher Zahlweise</span>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Ab 51 Mitarbeiter</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-white display-2">
                        150€
                      </h3>
                      <span class="text-white ls-1 p">pro Monat</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="primary" type="button" 
                          onClick={

                            
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Auswahl Kategorie ab 51'
                            })}
                            ><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 pt-0">
                    <span class="text-white ls-1 p">10% sparen</span>
                    <h3 className="h1 text-white display-3">
                      1.620€
                    </h3>
                    <span class="text-white ls-1 p">bei jährlicher Zahlweise</span>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
      </Container>
      <Container className="pt-5" fluid>
          <Container className="mt-6">
              <Row className="justify-content-left ml-1 mt-4">
                  <h2>Noch unschlüssig? Hier findest du einige Beispiele zum Schichtplan erstellen.</h2>
              </Row>
          </Container>
          <Container className="mb-4 pt-0">
              <Row className="align-items-center p-1 pt-0">
              <Container className="mb-0 pt-0">
            <Row className="mt-0" >
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-2"
                            src={Possibilities}
                            alt="Bild von drei unterschiedlichen Wegen"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2 h2" tag="h3">
                                    Schichtplan erstellen
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie erstelle ich meinen Schichtplan?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Es gibt viele verschiedene Möglichkeiten die Schichtplanung umzusetzen. In diesem Beitrag zeige ich dir drei davon und gehe kurz auf Vor- und Nachteile ein.
                            </CardText>
                            <CardText className="pl-4 pb-4 pr-4" tag="p">
                                <Link to="/themen/schichtplanerstellen" >Schichtplan erstellen</Link>
                            </CardText>
                        </Card>
                </Col>
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-2"
                            src={Paperwork}
                            alt="Schreibtisch mit Kaffee, Zettel und Stift"
                            ></CardImg>
                             <CardTitle className="pl-4 pt-4 mb-2 h2" tag="h3">
                                Automatisierte Befüllung deines Schichtplans
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Kann die Befüllung deines Schichtplans automatisiert werden?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                Erfahre in diesem Beitrag wie du die Befüllung deines Schichtplans durch unseren intelligenten Algorithmus innerhalb weniger Sekunden abbilden kannst. 
                            </CardText>
                            <CardText className="pl-4 pb-4" tag="p">
                                <Link to="/themen/automatisierung" >Automatisierte Befüllung</Link>
                            </CardText>
                        </Card>
                </Col>
            </Row>
            </Container>
            </Row>
          </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Pricing;