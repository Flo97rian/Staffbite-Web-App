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
import React, { useState, useEffect, useRef } from "react";
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
import NotificationAlert from "react-notification-alert";
import { WARNING_WRONG_MAIL_OR_PASSWORD } from "../../../constants/Alerts";

const LogIn = (props) => { 
    let notificationAlert = useRef(null)
    function Notify (type, title, err) {
        let options = {
          place: "tc",
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {" "}
              </span>
              <span data-notify="message">
                {title}
              </span>
            </div>
          ),
          type: type,
          icon: "ni ni-bell-55",
          autoDismiss: 7
        };
        notificationAlert.current.notificationAlert(options);
        props.setErrMsng({...props.ErrMsng, [err]: !1})
      };
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            props.signIn()
        }
      }

            return (
                <>
            <LandingNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
                 { props.ErrMsng.WrongLogInData ? Notify("warning", WARNING_WRONG_MAIL_OR_PASSWORD, "WrongLogInData") : null}
                <div className="rna-wrapper">
                    <NotificationAlert ref={notificationAlert} />
                </div>
            <main className="bg-secondary">
            <section className="section section-shaped section-lg">
                <Container className="pt-lg-7">
                <Row className="justify-content-center">
                    <Col lg="5">
                    <Card className="bg-white shadow border-0 mb-4">
                        <CardHeader className="bg-white pb-2">
                        <div className="text-muted text-center pt-4">
                            <h3>Anmeldung</h3>
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
                                <Input 
                                placeholder="Email" 
                                type="email" 
                                name="username" 
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
                                placeholder="Password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onKeyPress={(event) => handleKeyPress(event)}
                                onChange={(e) => props.handleInputChange(e)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => props.signIn()}
                            >
                                Anmelden
                            </Button>
                            </div>
                        </Form>
                        <Row className="mt-3">
                        <Col xs="6">
                            <Link to="/forgotpassword" className=""><small>Passwort vergessen?</small></Link>
                        </Col>
                        <Col className="text-right" xs="6">
                        <Link to="/signup" className=""><small>Registrierung</small></Link>
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

export default LogIn;
