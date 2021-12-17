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
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import { ABOUTUS_DESCIPTION, ABOUTUS_TITLE } from "../../../constants/MetaTexts";

function CloudService (props) {
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = props.match.path;
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{ABOUTUS_TITLE}</title>
          <meta name="description" content={ABOUTUS_DESCIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/aboutus" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
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
                    <h2>Florian Zellmann</h2>
                    <p>
                          Florian Zellmann ist Mitgründer von Staffbite und verantwortlich für die technische Umsetzung. Er interessiert sich seit einigen Jahren für verschiedenste Aspekte der Softwareentwicklung. Neben einem breiten Wissen bezüglich künstlicher Intelligenz, Algorithmen und Datenverarbeitung liegt sein Schwerpunkt vor allem auf responsiven Programmiersprachen, um das Nutzererlebnis der Kunden stetig zu verbessern. Im Studium arbeitete Florian in der Gastronomiebranche und lernte die Herausforderungen der Betriebe selbst kennen.
                    </p>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default CloudService;