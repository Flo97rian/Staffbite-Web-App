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
import SchichtplanBeispiel from "../../../assets/img/theme/Schichtplan-befüllen.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {ERSTEANMELDUNG_TITLE, ERSTEANMELDUNG_DESCRIPTION, AUTOMATISIERTE_SCHICHTPLANUNG_TITLE, AUTOMATISIERTE_SCHICHTPLANUNG_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import TeamÜbersicht from "../../../assets/img/theme/MAÜbersicht-min.png"
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"

function AutomatisierteBefüllung (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/automatisierter-schichtplan";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{AUTOMATISIERTE_SCHICHTPLANUNG_TITLE}</title>
          <meta name="description" content={AUTOMATISIERTE_SCHICHTPLANUNG_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/automatisierter-schichtplan" />
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
                        <h1 className="display-3">Dein automatisierter Schichtplan</h1>
                    </Row>
      </Container>    
            <Container className="pb-2"fluid>
            <Row className="justify-content-center ml-0 mt-4">
                <Col className="mt-6">
                <Row className=" justify-content-center mt-4 ml-6">
                    <Col>
                        <h2 class="display-4">Deine Zeit ist zu wertvoll, um sie mit der Schichtplanung zu verbringen</h2>
                        <p className="lead">
                        Nachdem dein Team sich in deinen Schichtplan eingetragen hat, kannst du die automatisierte Befüllung starten. Dafür reicht ein Klick aus. Wenige Sekunden später ist dein Schichtplan fertig. Dein Team wird ausschließlich in Schichten eingeteilt, in die sie sich eingetragen haben. Somit entsteht ein fairer Schichtplan für dein ganzes Team. 
                        </p>
                        <p className="lead">
                        Bisher hast du wahrscheinlich stundenlang per Hand mit Papier und einer Excel-Tabelle deinen Schichtplan befüllt. Mit unserer Lösung ist das Vergangenheit! Wir wollen dir helfen sowohl Zeit als auch Nerven zu sparen. 
                        </p>
                        <p className="lead">
                        Schau dir einfach an wie unsere <Link to="/themen/automatisierung">automatisierte Schichtplanung</Link> funktioniert.
                        </p> 
                    </Col>
                </Row>
                    
                </Col>
                <Col className="col-xs-12 text-center"  md="6" lg="6">
                <img
                    alt="Abbildung eines automatisiert erstellen Schichtplans von Staffbite"
                    title="Schichtplan automatisiert erstellen"
                    src={SchichtplanBeispiel}
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
                  <Link to="/schichtplan-veroeffentlichen" class="stretched-link">Schichtplan veröffentlichen</Link>
                  </CardTitle>
                  <CardSubtitle className="pl-4 p">
                      Wie teile ich den fertigen Schichtplan mit meinem Team?
                  </CardSubtitle>
                  <CardText className="pl-4 pt-4 pr-4 pr-4" tag="p">
                    Nachdem du den Schichtplan befüllt hast, musst du den fertigen Plan nur noch mit deinem Team teilen.
                    Hierfür ist nur ein Klick nötig. Wie das funktioniert zeige ich dir hier.
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
                            alt="Bild eines Kalenders"
                            ></CardImg>
                            <CardTitle className="pl-4 pt-4 mb-2" tag="h2">
                            <Link to="/team-verwalten"class="stretched-link">Behalte dein Team im Blick!</Link>
                            </CardTitle>
                            <CardSubtitle className="pl-4 p">
                                Wie können meine Mitarbeiter*innen sich in den Schichtplan eintragen?
                            </CardSubtitle>
                            <CardText className="pl-4 pt-4 pr-4" tag="p">
                                    Unsere Lösung gibt dir die Möglichkeit dein Team einfach und unkompliziert zu überblicken.
                                    Du kannst mit wenigen Klicks deine Mitarbeiter*innen einladen und die wichtigsten Informationen erhalten.
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
export default AutomatisierteBefüllung;