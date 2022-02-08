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
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col,
  CardTitle,
  Card,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLANERSTELLEN_TITLE, SCHICHTPLANERSTELLEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"
import Schichthinzufuegen from "../../../assets/img/themen/SchichtplanVorlage/Schichtdetailseintragen.png"
import SchichtplanVorlageVerwenden from "../../../assets/img/landing/SchichtplanErstellen/Schichtplan-vorlage-verwenden.png"
import SchichtplanVorlageFertig from "../../../assets/img/themen/SchichtplanVorlage/SchichtplanVorlageFertig.png"
import { isMobile } from "react-device-detect";
import ThemenSlider from "../Themen/ThemenSlider";
import TrialBanner from "../sub/TrialBanner";


function SchichtplanErstellen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/schichtplan-erstellen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/schichtplan-erstellen" />
        </Helmet>
        <TrialBanner></TrialBanner>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="text-center mt-4 pt-6">
                      <Col>
                        <h1>Dein digitaler Schichtplan - Schichtplan erstellen</h1>
                        </Col>
                    </Row>
      </Container>
                
      <Container className="mt-3">
        <Row >
        <Col className="mt-4" md="12" lg="5">

          <Row>
            <Col>
            <h2 className="">Digitale Schichtpläne für dich und dein Team</h2>
            </Col>
          </Row>


          <p className="lead m-0">
          <Row className="mt-2">
            <Col>
              Mit unserer Lösung kannst du in kürzester Zeit deine Schichtpläne digital erstellen. 
            </Col>
          </Row>
              
              <Row className="mt-2 justify-content-center">
                <Col xs="1" className="mt-0 ml-2">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                Beginn & Ende der Schicht bestimmen
                </Col>
              </Row>

              <Row>
                <Col xs="1" className="mt-0 ml-2">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                Notizen für dein Team
                </Col>
              </Row>

              <Row>
                <Col xs="1" className="mt-0 ml-2">
                  <i className="fas fa-check-circle text-success"></i>
                </Col>
                <Col>
                Position & Rechte festlegen
                </Col>
              </Row>
              
              </p>  
                      
                </Col>
                <Col md="12" lg="7">
                  <img
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    className="mt-2"
                    src={SchichtplanVorlage}
                    title="Schichtplan Vorlage"
                    height="80%"
                    width="100%"
                  />
                </Col>

                </Row>
                </Container>
      
      <Container>
        <Row className="text-center mt-4">
          <Col>
            <h2 className="display-4">In zwei Schritten zur Schichtplanvorlage</h2>
          </Col>
        </Row>
    
        <Row className="mt-4 text-left">
          <Col xs="12" lg="6">
          
        <Row>
        <Col>
          <h2 className="">1. Erstelle deine Vorlagen</h2>
        </Col>
        </Row>

        <p className="lead">
        <Row className="mt-2">
          <Col>
          In wenigen Klicks kannst du die wichtigsten Informationen zu deiner wiederverwendbaren Vorlage angeben.
          </Col>
          </Row>
          
          <Row className=" mt-4">
            <Col xs="1" className="mt-0 ml-2">
              <i className="fas fa-check-circle text-success"></i>
            </Col>
            <Col>
              Name der Vorlage
            </Col>
          </Row>

          <Row>
            <Col xs="1" className="mt-0 ml-2">
              <i className="fas fa-check-circle text-success"></i>
            </Col>
            <Col>
              Anzahl der Schichten pro Tag
            </Col>
          </Row>

          <Row>
            <Col xs="1" className="mt-0 ml-2">
              <i className="fas fa-check-circle text-success"></i>
            </Col>
            <Col>
              Ruhetage auswählen
            </Col>
          </Row>                

          <Row>
            <Col className="mt-4">
              Weitere Informationen findest du in unserem  Artikel <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen.</Link>
            </Col>
          </Row>
            </p>
            </Col>

            
            <Col xs="12" md="6">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlageVerwenden}
                    title="Erstellung Schichtplan Vorlage"
                    height="100%"
                    width="100%"
                  />
            </Col>
            </Row>
            
          
            <Row className="mt-6 text-left">
            

            <Col xs="12" md="6">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage in der eine Schicht hinzugefügt wird."
                    src={Schichthinzufuegen}
                    title="Schicht hinzufuegen"
                    height="100%"
                    width="100%"
                  />
            </Col>

            <Col  className="mt-4" xs="12" lg="6">

              <Row>
                <Col>
                  <h2 className="">2. Erstelle weitere Schichten</h2>
                </Col>
              </Row>


              <p className="lead">
                <Row className="">
                  <Col>
                    Im letzten Schritt gibst du die wichtigsten Informationen zu deinen Schichten an. 
                  </Col>
              </Row>

              <Row className="justify-content-center mt-4">
                    <Col xs="1" className="mt-0 ml-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Name der Schicht
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="1" className="mt-0 ml-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Position
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="1" className="mt-0 ml-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Beginn & Ende
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="1" className="mt-0 ml-2">
                      <i className="fas fa-check-circle text-success"></i>
                    </Col>
                    <Col>
                      Anzahl benötigter Mitarbeiter 
                    </Col>
                  </Row>

                  <Row>
                    <Col className="mt-4">
                      Weitere Informationen findest du in unserem Artikel <Link to="/themen/individueller-schichtplan">individuellen Schichtplan erstellen</Link>
                    </Col>
                  </Row>
                  </p>

              </Col>                
              </Row>

            </Container>

            <Container className="mt-6">
              <Row className="text-center">
                <Col>
                  <h2 className="m-0 p-0">Fertige Schichtplan Vorlage verwenden</h2>
                </Col>
                </Row>

              <Row className="mt-2 mb-4 text-center">
                <Col>
                  <p className="lead">
                    Deine neue Schichtplanvorlage kannst du nun verwenden. In unserem Artikel <Link to="/themen/individueller-schichtplan">individuellen Schichtplan erstellen</Link> erfährst du, wie du deinen Schichtplan genau auf deinen Betrieb anpassen kannst.
                  </p>
                </Col>
              </Row>

                  <Row>
                    <Col md="12" lg="12">
                    <img
                    className="shadow"
                    style={{borderRadius: "10px"}}
                    alt="Abbildung einer fertigen Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlageFertig}
                    title="Fertige Schichtplan Vorlage"
                    height="100%"
                    width="100%"
                  />
                    
                    </Col>
                  </Row>
                </Container>
                <ThemenSlider></ThemenSlider>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default SchichtplanErstellen;