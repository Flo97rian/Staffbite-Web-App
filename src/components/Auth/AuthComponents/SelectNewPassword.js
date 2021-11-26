/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Alert,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import LandingNavbar from "../../Navbars/LandingNavbar"
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const SelectNewPassword = (props) => {
    return (
      <>
      {props.msg !== null && props.msg.changedPassword ? 
            <Alert color="sucess">
            <Row>
              <Col xs="10">
                <p className="mb-0">Du hast dein Passwort erfolgreich geändert!</p> 
              </Col>
              <Col xs="2">
                <i className="fas fa-times float-right mb-2 mr-2 mt-2 pt-0" onClick={() => props.setMsg("changedPassword", !1)}></i>
              </Col>
            </Row>
            </Alert>
            :
            <></>}
            <LandingNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
            <main className="bg-secondary">
            <section className="section section-shaped section-lg">
                <Container className="pt-lg-7">
                <Row className="justify-content-center">
                    <Col lg="5">
                    <Card className="bg-white shadow border-0 mb-4">
                        <CardHeader className="bg-white pb-2">
                        <div className="text-muted text-center pt-4">
                            <h3>Neues Passwort festlegen</h3>
                        </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-email-83" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Email" type="email" name="username" onChange={(e) => props.handleInputChange(e)}/>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                placeholder="neues Passwort"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onChange={(e) => props.handleInputChange(e)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fas fa-paper-plane" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Bestätigungcode" type="number" name="code" onChange={(e) => props.handleInputChange(e)}/>
                            </InputGroup>
                            </FormGroup>
                            <PasswordChecklist
                                rules={["minLength","number"]}
                                minLength={6}
                                value={props.code}
                                messages={{
                                    minLength: "Länge 6",
                                    number: "Zahlen",
                                }}
                            />
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => props.confirmResetPassword()}
                            >
                                Passwort festlegen
                            </Button>
                            </div>
                        </Form>
                        <Row className="mt-3">
                        <Col xs="6">
                        <Link to="/auth" className=""><small>Zurück zur Anmeldung</small></Link>
                        </Col>
                        <Col className="text-right" xs="6">
                        <Button
                                size="sm"
                                color=""
                                type="button"
                                onClick={() => props.resetPassword()}
                            >
                                Erneut senden
                            </Button>
                        </Col>
                    </Row>
                        </CardBody>
                    </Card>
                    </Col>
                    </Row>
                </Container>
            </section>
            </main>
            </>
    );
  }

export default SelectNewPassword;
