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
import { HashLink } from 'react-router-hash-link';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
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

const Register = (props) => {
    return (
<>
            <LandingNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
                  { props.err !== null && props.err.code === "UsernameExistsException" ? 
                <div>
                <Alert color="warning">
            <Row>
              <Col xs="10">
                <p className="mb-0">{props.err.message}</p> 
              </Col>
              <Col xs="2">
                <i className="fas fa-times float-right mb-2 mr-2 mt-2 pt-0" onClick={() => props.setMsg({...props.err, code: !1})}></i>
              </Col>
            </Row>
            </Alert>
                </div>
                : <></>
                }
            <main className="bg-secondary">
            <section className="section section-shaped section-lg">
                <Container className="pt-lg-7">
                <Row className="justify-content-center">
                    <Col lg="5">
                    <Card className="bg-white shadow border-0 mb-4">
                        <CardHeader className="bg-white pb-2">
                        <div className="text-muted text-center pt-4">
                            <h3>Deine Anmeldung zum Probemonat!</h3>
                            <p className="p-0 m-0">
                            Registriere dich hier und es geht sofort los.
                            </p>
                            <p className="p-0 m-0">
                            Du erhälst einen vollständigen Account und kannst unsere Lösung in Ruhe ausprobieren.
                            </p>
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
                                placeholder="Password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onChange={(e) => props.handleInputChange(e)}
                                />
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
                                placeholder="Password wiederholen"
                                type="password"
                                name="passwordAgain"
                                autoComplete="off"
                                onChange={(e) => props.handleInputChange(e)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <PasswordChecklist
                                rules={["minLength","specialChar","number","capital","match"]}
                                minLength={8}
                                value={props.password}
                                valueAgain={props.passwordAgain}
                                onChange={(isValid) => props.setIsValid(isValid)}
                                messages={{
                                    minLength: "Mindestlänge 8",
                                    specialChar: "Sonderzeichen",
                                    number: "Zahl",
                                    capital: "Großbuchstabe",
                                    match: "Passwörter stimmen überein",
                                }}
                            />
                            <FormGroup className="p-4">
                                <Input type="checkbox" onChange={(e) => props.checkChanged(e)}/>
                                <Label check>
                                    <a>Ich bin einverstanden mit den </a>
                                    <HashLink className="p text-muted p-0" to="/impressum/#sectionagb">
                                        AGB's.
                                    </HashLink>
                                </Label>
                            </FormGroup>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => props.signUp()}
                            >
                                Registrieren
                            </Button>
                            </div>
                        </Form>
                        <Row className="mt-3">
                        <Col xs="6">
                        <Link to="/auth" className=""><small>Zurück</small></Link>
                        </Col>
                        <Col className="text-right" xs="6">
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

export default Register;

