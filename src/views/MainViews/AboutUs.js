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
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"
import LandingFooter from "../../components/Footers/LandingFooter";

function Pricing () {
    return (
    <>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-8">
                        <h1> Über uns</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={Team}
                    />
                    <div className="pt-4 text-center">
                    <h5 className="title">
                      <Row>
                        <Col xs="6">
                          <h3 className="d-block mb-1">Florian Zellmann</h3>
                          <small className="h6 lead">Bachelorstudent BWL</small>
                        </Col>
                        <Col xs="6">
                          <h3 className="d-block mb-1 ">Daniel Zellmann</h3>
                          <small className="h6 lead">Masterstudent Business Management</small>
                        </Col>
                      </Row>
                      </h5>
                    </div>
                  </div>
                </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Pricing;