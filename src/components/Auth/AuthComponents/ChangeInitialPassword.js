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
  Alert, 
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import LandingNavbar from "../../Navbars/LandingNavbar"
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const ChangeInitalPassword = (props) => {
    return (
        <>
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
                <Card className="bg-secondary shadow border-0 mb-4">
                    <CardHeader className="bg-secondary pb-2">
                    <div className="text-muted text-center pt-4">
                        <h3>Neues Passwort wählen</h3>
                    </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                        <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Altes Passwort" type="password" name="password" onChange={(e) => props.handleInputChange(e)}/>
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
                            placeholder="Neues Passwort"
                            type="password"
                            name="newpassword"
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
                        value={props.newpassword}
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
                        <div className="text-center">
                        <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={() => props.signIn()}
                        >
                            Passwort ändern
                        </Button>
                        </div>
                    </Form>
                    <Row className="mt-3">
                    <Col xs="6">
                        <Link to="/forgotpassword" className=""><small>Passwort vergessen?</small></Link>
                    </Col>
                    <Col className="text-right" xs="6">
                        <Link to="/auth" className=""><small>Zurück zur Anmeldung</small></Link>
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
    )
  }

export default ChangeInitalPassword;
