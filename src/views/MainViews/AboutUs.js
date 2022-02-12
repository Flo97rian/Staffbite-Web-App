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
import { Helmet } from "react-helmet";
import {Link } from "react-router-dom";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Button,
  CardImg,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import CloudPicture from "../../assets/img/themen/CloudService/CloudComputingImage.png"
import Paperwork from "../../assets/img/themen/AutomatisierteBefüllung/PaperworkImage.png"
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"
import LandingFooter from "../../components/Footers/LandingFooter";
import { ABOUTUS_DESCRIPTION, ABOUTUS_TITLE } from "../../constants/MetaTexts";
import ThemenSlider from "./Themen/ThemenSlider";


function Pricing (props) {
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
    const pathname = "/aboutus";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <div ref={mainContent}>
        <Helmet>
          <title>{ABOUTUS_TITLE}</title>
          <meta name="description" charSet="utf-8" content={ABOUTUS_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/aboutus" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1> Über uns</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <img
                      alt="Abbildung der Gründer von Staffbite. Links steht Florian Zellmann. Rechts steht Daniel Zellmann."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={Team}
                      height="800px"
                      width="1000px"
                    />
                    <div className="pt-4 text-center">
                    <h2 className="title">
              <Row className="text-center">
                <Col>
                  <Link to="/contact">
                    <Button className="btn-icon btn-3 mt-2" color="success" type="button"><p className="p-0 m-0">Persönliches Erstgespräch vereinbaren</p></Button>
                  </Link>
                </Col>
              </Row>
                      <Row className="mt-4 mt-sm-5">
                        <Col xs="6">
                          <h3 className="d-block mb-1">Florian Zellmann</h3>
                        </Col>
                        <Col xs="6">
                          <h3 className="d-block mb-1 ">Daniel Zellmann</h3>
                        </Col>
                      </Row>
                      </h2>
                    </div>
                    <Row className="mt-sm-6">
                      <h2 className="mt-2">Florian Zellmann</h2>
                      <p>
                      Florian Zellmann ist Mitgründer von Staffbite und verantwortlich für die technische Umsetzung. Er interessiert sich seit einigen Jahren für verschiedenste Aspekte der Softwareentwicklung. Neben einem breiten Wissen bezüglich künstlicher Intelligenz, Algorithmen und Datenverarbeitung liegt sein Schwerpunkt vor allem auf responsiven Programmiersprachen, um das Nutzererlebnis unserer Kunden stetig zu verbessern. Im Studium arbeitete Florian in der Gastronomiebranche und lernte die Herausforderungen der Betriebe selbst kennen.
                      </p>
                    </Row>
                    <Row className="mt-sm-3">
                      <h2>Daniel Zellmann</h2>
                      <p>
                      Daniel Zellmann (M.A. Business Management) ist Mitgründer von Staffbite. Er ist verantwortlich für die operativen Geschäfte. Vor der Gründung von Staffbite arbeitete er mehrere Jahre als IT-Berater. Während der verschiedenen Kundenprojekte in ganz Deutschland sammelte er viel Erfahrung im Aufbau von skalierbaren Cloud-Infrastrukturen, Datenanalyse und der Automatisierung von Arbeitsabläufen. Sein Schwerpunkt liegt derzeit auf der kundenzentrierten Produktentwicklung. 
                      </p>
                    </Row>
                    <Row className="mt-sm-4">
                      <Link to="/impressum">Hier gehts zum Impressum</Link>
                    </Row>
                  </div>
                </Col>
              </Row>
        </Container>
      </Container>
      <Container className="pt-sm-5" fluid>
          <Container className="mt-sm-6">
              <Row className="justify-content-left ml-1 sm-mt-4">
                  <h2>Finde spanndende Artikel rund um die Entstehung von Staffbite</h2>
              </Row>
          </Container>
          <ThemenSlider></ThemenSlider>
        </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Pricing;