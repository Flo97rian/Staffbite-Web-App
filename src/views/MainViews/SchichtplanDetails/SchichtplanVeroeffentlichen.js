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
import StaffbiteLogo from "../../../assets/img/brand/Staffbite_Logo.png"
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"
import SchichtplanBeispiel from "../../../assets/img/theme/Schichtplan-befüllen.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {ERSTEANMELDUNG_TITLE, ERSTEANMELDUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";

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
          <title>{ERSTEANMELDUNG_TITLE}</title>
          <meta name="description" content={ERSTEANMELDUNG_DESCRIPTION}/>
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
                                     Mit wenigen Klicks kannst du deinen <Link to="/schichtplan-veroeffentlichen" class="stretched-link">Schichtplan automatisiert</Link> für dich befüllen lassen.
                                    <br/>
                                    <br/>
                            </CardText>
                        </Card>
                </Col>

                

                <Col xs="6">
                <Card>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                                Vorteile für dein Team
                            </CardTitle>
                            <CardSubtitle className="pl-4">
                                Wie profitiert mein Team von der Umstellung auf eine digitale Schichtplanung?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-2 pr-4 lead" tag="p">
                                Siehe hier, welche <Link to="/fuer-dein-team" >Vorteile für dein Team</Link> in einer digitalen Schichtplanung stecken.
                                <br/>
                                <br/>
                            </CardText>
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