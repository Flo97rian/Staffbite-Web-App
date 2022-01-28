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
import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import classnames from "classnames";
import {
  Container,
  Row,
  CardFooter,
  CardHeader,
  CardBody,
  CardImg,
  Card,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  CardText,
  CardSubtitle,
  Col,
  Button

} from "reactstrap";
// core components
import { pageview } from "react-ga";
import ReactGA from "react-ga";
import Paperwork from "../../assets/img/themen/AutomatisierteBefüllung/PaperworkImage.png"
import Possibilities from "../../assets/img/themen/SchichtplanErstellen/Possibilities.png"
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";
import { Helmet } from "react-helmet";
import ThemenSlider from "./Themen/ThemenSlider";


const Pricing = (props) => {
  const [navIndex, setNavIndex] = useState(1);
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

  function setNavPill() {
    if (navIndex === 1) {
        return(showFixPricing())
      } else if (navIndex === 2){
      return( showFlexiblePricing())
    }
  }


  function showFixPricing() {
    return(
      <Row className="justify-content-center mb-4 mt-6">
                <Col xs="12" md="4">
                  <Card className="card-pricing bg-gradient-white zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-info lead py-3 mb-0">Bis 25 Mitarbeiter*innen</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-info display-2">
                        50€
                      </h3>
                      <span class="text-info ls-1 p">pro Monat</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button"
                          onClick={
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
                <Col xs="12" md="4">
                  <Card className="card-pricing bg-gradient-info zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Bis 50 Mitarbeiter*innen</h2>
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
                            })}
                          ><p className="p-0 m-0">Auswählen</p></Button>
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
                <Col xs="12" md="4">
                  <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Ab 51 Mitarbeiter*innen</h2>
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
                              action: 'Auswahl Kategorie ab 50'
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
    )
  }

  function showFlexiblePricing() {
    return(
      <Row className="justify-content-center mb-4 mt-6">
        <Col lg="3"></Col>
         <Col lg="6">
                  <Card className="card-pricing bg-gradient-info zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Grundgebühr 10 €</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-white display-2">
                        + 2,50 €
                      </h3>
                      <span class="text-white ls-1 p">pro Mitarbeiter pro Monat</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button"
                          onClick={
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Variabler Preis'
                            })}
                          ><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
            <Col lg="3"></Col>
      </Row>
    )
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
                <Container className="mt-4 pb-4">
        <Nav
          className="nav-fill flex-column flex-sm-row"
          id="tabs-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={navIndex === 1}
              className={classnames("mb-sm-3 mb-md-0 text-muted nav_betrieb", {
                active: navIndex === 1
              })}
              onClick={() => setNavIndex(1)}
              href="#pablo"
              role="tab"
            >
              {navIndex === 1 ? 
              <p className="m-0 text-white">Festpreis</p>
              :
              <p className="m-0 text-muted">Festpreis</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={navIndex === 2}
              className={classnames("mb-sm-3 mb-md-0 nav_shiftplan", {
                active: navIndex === 2
              })}
              onClick={() => setNavIndex(2)}
              href="#pablo"
              role="tab"
            >
              {navIndex === 2 ? 
              <p className="m-0 text-white">Variable Preise</p>
              :
              <p className="m-0 text-muted">Variable Preise</p>
              }
            </NavLink>
          </NavItem>
        </Nav>
        {setNavPill()}
      </Container>
      </Container>
      <Container className="pt-5" fluid>
          <Container className="mt-6">
              <Row className="justify-content-left ml-1 mt-4">
                  <h2>Noch unschlüssig? Hier findest du einige Beispiele wie du deinen individuellen Schichtplan erstellen kannst.</h2>
              </Row>
          </Container>
          <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Pricing;