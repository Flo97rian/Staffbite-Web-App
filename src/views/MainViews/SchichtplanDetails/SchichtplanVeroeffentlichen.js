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
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";
import SchichtplanPublish from "../../../assets/img/theme/PlanVeröffentlichen-min.png"
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import {SCHICHTPLAN_VEROEFFENTLICHEN_TITLE, SCHICHTPLAN_VEROEFFENTLICHEN_DESCRIPTION} from "../../../constants/MetaTexts"
import LandingFooter from "../../../components/Footers/LandingFooter";
import ThemenSlider from "../Themen/ThemenSlider";
import TrialBanner from "../sub/TrialBanner";


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
        <TrialBanner></TrialBanner>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="mt-6">
                    <Row className="justify-content-center ml-0 mt-8">
                        <h1 className="display-3">Deinen Schichtplan veröffentlichen</h1>
                    </Row>
      </Container>    
            <Container className="pb-2">
            <Row className="mt-4">
                <Col className="">
                <Row className="mt-5">
                    <Col>
                        <h2 class="display-4">Fertigen Schichtplan veröffentlichen</h2>
                        <p className="lead">
                            Nachdem dein Schichtplan automatisch befüllt wurde, kannst du noch letzte Änderungen vornehmen.
                            Anschließend veröffentlichst du den fertigen Plan mit nur einem Klick für dein gesamtes Team.
                        </p>  
                    </Col>
                </Row>
                    
                </Col>
                <Col className="col-xs-12"  md="6" lg="6">
                <Card className="bg-transparent shadow-none">
                <img
                    alt="Fertiger Schichtplan bereit zur Veröffentlichung"
                    src={SchichtplanPublish}
                    title="Fertiger Schichtplan"
                    height="100%"
                    width="100%"
                  />
                  </Card>
                </Col>
                </Row>
                </Container>
                <ThemenSlider></ThemenSlider>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default SchichtplanVeroeffentlichen;