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
  CardSubtitle,
  CardText
} from "reactstrap";

import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLANERSTELLEN_TITLE, SCHICHTPLANERSTELLEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import SchichtplanVorlage from "../../../assets/img/theme/SchichtplanVorlageShiftplan-min.png"

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
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-4 pt-6">
                        <h1>Einfache und unkomplizierte Schichtpläne für dich und dein Team</h1>
                    </Row>
      </Container>
                
            <Container className="pb-2"fluid>
              <Row className="justify-content-center ml-0 mt-4">
                <p>
                  
                  <br/>
                  
                </p>
                      
                <Col md="12" lg="9">
                  <img
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanVorlage}
                    title="Schichtplan Vorlage erstellen"
                    height="100%"
                    width="100%"
                  />
                </Col>
                </Row>

                <Container className="pb-2">
                <Row className="text-center ml-0 mt-4">
                <Col md="12" lg="12">
                  <br/>
                  <p>
                    Mit unserer Lösung kannst du in kürzester Zeit deine Schichtpläne digital erstellen. 
                    <br/>
                    Du kannst mit wenigen Klicks die wichtigsten Informationen zu deinen Schichten angeben. 
                    <br/>
                    Den vorbereiteten Plan gibst du anschließend deinem Team frei.
                    <br/>
                    Jetzt musst du nur noch abwarten, bis dein Team sich in den Plan eingetragen hat.
                    <br/> 
                    Dein Team bekommt ebenfalls einen Zugang zu Staffbite und kann sich jederzeit per Smartphone, Tablet oder Laptop in den Plan eintragen. 
                    <br/>
                    Über unser Reporting kannst du außerdem nachschauen wer sich noch nicht eingetragen hat.
                  </p>
                     
                </Col>

                </Row>
                </Container>
                <Container className="pb-2 pt-6 px-9" fluid>
                <Row className="mt-2" >
                <Col xs="6">
                <Card>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Automatisierter Schichtplan
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Einen Schichtplan automatisiert Befüllen? Wie geht das?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-2 pr-4 lead" tag="p">
                                     Mit wenigen Klicks kannst du deinen <Link to="/automatisierter-schichtplan" class="stretched-link">Schichtplan automatisiert</Link> für dich befüllen lassen.
                                    <br/>
                                    <br/>
                            </CardText>
                        </Card>
                </Col>

                

                <Col xs="6">
                <Card>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                    Verfügbarkeiten eintragen
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie trage ich mich in einen Schichtplan ein?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-2 pr-4 lead" tag="p">
                                     Mit wenigen Klicks kann dein Team ihre <Link to="/verfuegbarkeiten-eintragen" class="stretched-link">Verfügbarkeiten eintragen</Link>.
                                    <br/>
                                    <br/>
                            </CardText>
                        </Card>
                </Col>
                </Row>
                </Container>
            </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default SchichtplanErstellen;