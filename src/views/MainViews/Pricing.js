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
import {
  Container,
  Row,
  CardHeader,
  CardBody,
  Card,
  Col,
  Button

} from "reactstrap";
// core components
import ReactGA from "react-ga";
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
                <Col xs="12" md="6" className="px-4">
                  <Card className="card-pricing bg-gradient-white zoom-in shadow-lg rounded border-0 text-center mx-6 mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-info lead py-3 mb-0">Bis 25 Mitarbeitende</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-info display-2">
                        2,50€
                      </h3>
                      <br/>
                      <span class="text-info ls-1 p">pro Person</span>
                      
                      <br/>
                      <br/>
                      <span class="text-info ls-1 p">+ 9,90€ Grundgebühr</span>
                      
                      <br/>
                      <br/>
                      <span class="text-info ls-1 p">monatlich</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button"
                          onClick={
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Auswahl Variabel bis 25 MA'
                            })}
                          ><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>

                  </Card>
                </Col>
                <Col xs="12" md="6"  className="px-4">
                  <Card className="card-pricing bg-gradient-info zoom-in shadow-lg rounded border-0 text-center mx-6 mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Ab 26 Mitarbeitende</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-white display-2">
                        74,90€
                      </h3>
                      <br/>
                      <br/>
                      <br/>
                      <span class="text-white ls-1 p">Festpreis</span>
                      
                      <br/>
                      <br/>
                      
                      <span class="text-white ls-1 p">monatlich</span>
                      <Row className="align-items-center justify-content-center mt-6">
                        <Link to="/signup">
                          <Button className="btn-icon btn-3" color="success" type="button"
                          onClick={
                            () => 
                            ReactGA.event({
                              category: 'Pricing',
                              action: 'Auswahl Festpreis ab 26 MA'
                            })}
                          ><p className="p-0 m-0">Auswählen</p></Button>
                        </Link>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Row className="mt-6"><p classname="lead">Unsere Preise verstehen sich als Nettopreise zzgl. Mehrwertsteuer.</p></Row>
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
                      <h2 className="h1 ls-1 text-white lead py-3 mb-0">Grundgebühr 9,90€</h2>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h3 className="h1 text-white display-2">
                        + 2,50€
                      </h3>
                      <span class="text-white ls-1 p">pro Mitarbeiter*in pro Monat</span>
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
                      <p class="text-muted lead m-0 p-0">Kostenlose Mitarbeitenden-App für dein Team</p>
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
        
        {showFixPricing()}
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