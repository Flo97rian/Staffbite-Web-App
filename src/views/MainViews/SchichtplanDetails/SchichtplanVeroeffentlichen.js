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
  CardImg,
  CardText,
  CardSubtitle,
  Card,
  CardTitle
} from "reactstrap";
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLAN_VEROEFFENTLICHEN_TITLE, SCHICHTPLAN_VEROEFFENTLICHEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png";


function SchichtplanVeroeffentlichen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/schichtplan-veroeffentlichen";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{SCHICHTPLAN_VEROEFFENTLICHEN_TITLE}</title>
          <meta name="description" content={SCHICHTPLAN_VEROEFFENTLICHEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/schichtplan-veroeffentlichen" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-8">
                        <h1 className="display-3">Deinen Schichtplan veröffentlichen</h1>
                    </Row>
      </Container>    
            <Container className="pb-2"fluid>
            <Row className="justify-content-center ml-0 mt-4">
                <Col className="mt-6">
                <Row className=" justify-content-center mt-4 ml-6">
                    <Col>
                        <h2 class="display-4">Fertigen Schichtplan veröffentlichen</h2>
                        <p className="lead">
                            Nachdem dein Schichtplan automatisch befüllt wurde, kannst du noch letzte Änderungen vornehmen.
                            Anschließend veröffentlichst du den fertigen Plan mit nur einem Klick für dein gesamtes Team.
                        </p>  
                    </Col>
                </Row>
                    
                </Col>
                <Col className="col-xs-12 text-center"  md="6" lg="6">
                <img
                    alt="Fertiger Schichtplan bereit zur Veröffentlichung"
                    src={SchichtplanPublish}
                    title="Fertiger Schichtplan"
                    height="100%"
                    width="100%"
                  />
                </Col>
                  <br/>
                </Row>
                </Container>
                <div>
                
                <Container mt-4>
                <Row className="mt-6" >

                <Col xs="6">
                <Card>
                <CardImg
                  className="p-4"
                  src={SchichtplanPublish}
                  alt="Vollständig befüllter Schichtplan"
                  ></CardImg>
                  <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                  <Link to="/fuer-dein-team" class="stretched-link">Vorteile für dein Team</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Noch nicht überzeugt?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                    Wir wollen dir UND deinem Team helfen.
                    Unsere digitalen Schichtpläne bieten sowohl dir als auch deinem Team jede Menge Vorteile. Schau dir hier die wichtigsten im Überblick an.
                  </CardText>
                  <br/>
                  <br/>
                  </Card>
                </Col>
                
                <Col xs="6">
                        <Card>
                            <CardImg
                            className="p-4"
                            src={TeamÜbersicht}
                            alt="Übersicht der Teammitglieder"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/automatisierter-schichtplan"class="stretched-link">Automatisierte Befüllung</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Unsere Automatisierung spart dir jede Menge Zeit & Geld
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Normalerweise dauert die Schichtplanung jede Woche aufs Neue mehrere Stunden.
                                    Durch unsere Lösung kannst du deine Schichtpläne innerhalb weniger Sekunden befüllen lassen.
                            </CardText>
                            <br/>
                        </Card>
                </Col>

                </Row>
                </Container>
                

                
                </div>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default SchichtplanVeroeffentlichen;