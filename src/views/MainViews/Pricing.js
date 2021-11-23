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
  CardFooter,
  CardHeader,
  CardBody,
  Card,
  Col,

} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";
import { Helmet } from "react-helmet";

function Pricing () {
    return (
    <>
        <Helmet>
          <title>Preise</title>
          <meta name="description" content="Preise & Vertragsbedingungen. Kostenloser Probemonat" />
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
                    <Row className="justify-content-left ml-1 mt-8">
                        <h1> Unsere Preise</h1>
                    </Row>
                </Container>
        <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-4">
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-white zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h1 className="ls-1 text-info lead py-3 mb-0">Bis 25 Mitarbeiter</h1>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h1 className="text-info display-2">
                        50€
                      </h1>
                      <span class="text-info ls-1 p">pro Monat</span>
                      <ul class="list-unstyled text-center ml-2 mt-5">
                        <li>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-check fa-lg pb-2 text-success"></i>
                                <p class="text-muted  m-0 mb-2 pl-3 lead ">Kostenloser Probemonat</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-success"></i>
                                <p class="text-muted pl-3 m-0 mb-2 lead">Automatisierte Befüllung</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-success"></i>
                                <p class="text-muted pl-3 m-0 mb-2 lead">Reporting</p>
                             </div>
                        </li>
                      </ul>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 mt-0 pt-0">
                    <span class="text-info ls-1 p">10% sparen</span>
                    <h1 className="text-info display-3">
                      540€
                    </h1>
                    <span class="text-info ls-1 p">pro Jahr</span>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-info zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h1 className="ls-1 text-white lead py-3 mb-0">Bis 50 Mitarbeiter</h1>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h1 className="text-white display-2">
                        100€
                      </h1>
                      <span class="text-white ls-1 p">pro Monat</span>
                      <ul class="list-unstyled ml-2 mt-5">
                        <li>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white  m-0 mb-2 pl-3 lead ">Kostenloser Probemonat</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white pl-3 m-0 mb-2 lead">Automatisierte Befüllung</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white pl-3 m-0 mb-2 lead">Reporting</p>
                             </div>
                        </li>
                      </ul>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 pt-0">
                    <span class="text-white ls-1 p">10% sparen</span>
                    <h1 className="text-white display-3">
                      1.080€
                    </h1>
                    <span class="text-white ls-1 p">pro Jahr</span>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4 card">
                  <CardHeader className="bg-transparent card-header">
                      <h1 className="ls-1 text-white lead py-3 mb-0">Ab 51 Mitarbeiter</h1>
                    </CardHeader>
                    <CardBody className="p-lg-4">
                    <h1 className="text-white display-2">
                        150€
                      </h1>
                      <span class="text-white ls-1 p">pro Monat</span>
                      <ul class="list-unstyled ml-2 mt-5">
                        <li>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white  m-0 mb-2 pl-3 lead ">Kostenloser Probemonat</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white pl-3 m-0 mb-2 lead">Automatisierte Befüllung</p>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center">
                            <i class="fas fa-check fa-lg pb-2 text-white"></i>
                                <p class="text-white pl-3 m-0 mb-2 lead">Reporting</p>
                             </div>
                        </li>
                      </ul>
                    </CardBody>
                    <CardFooter className="bg-transparent card-footer p-lg-5 pt-0">
                    <span class="text-white ls-1 p">10% sparen</span>
                    <h1 className="text-white display-3">
                      1.620€
                    </h1>
                    <span class="text-white ls-1 p">pro Jahr</span>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Pricing;