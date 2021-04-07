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
import React, { useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  CardHeader,
  CardBody,
  Container,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'

const Maps = () => {
  const [copiedText, setCopiedText] = useState();
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan erstellen</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                    <span className="ni ni-bold-left"></span>
                  </Col>
                  <Col xs={10} className="text-center">
                    <Button variant="primary">Schichtplan befüllen</Button>{''}
                  </Col>
                  <Col xs={1}>
                    <span className="ni ni-bold-right"></span>
                  </Col>
                </Row>
                <br />
                <Row className="text-center" noGutters={true}>
                  <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Row className="text-center" noGutters={true}>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                            Datum
                            <br />
                            Wochentag
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                            29.03.21
                            <br />  
                            Montag
                          </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                            30.03.21
                              <br />
                            Dienstag
                        </div>
                      </Col>                    
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          31.03.21
                            <br />
                          Mittwoch
                        </div>
                      </Col>                    
                    </Row>
                  </Col>
                  <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Row className="text-center" noGutters={true}>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          01.04.21
                            <br />
                          Donnerstag
                        </div>
                      </Col>                    
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          02.04.21
                          <br />
                          Freitag
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          03.04.21
                            <br />
                          Samstag
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          04.04.21
                            <br />
                          Sonntag
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  </Row>
                  <br />
                  <Row className="text-center" noGutters={true}>
                  <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Row className="text-center" noGutters={true}>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          Summe
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>                    
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>                    
                    </Row>
                  </Col>
                  <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Row className="text-center" noGutters={true}>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>                    
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>
                      <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                        <div>
                          0
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
