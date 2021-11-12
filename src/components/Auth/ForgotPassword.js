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
import LandingNavbar from "../Navbars/LandingNavbar"
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const ForgotPassword = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [isValid, setIsValid] = useState(!1)
    const [resetted, setResetted] = useState(!1);
    const [err, setErr] = useState(null)
    const [msg, setMsg] = useState(null)
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    const [code, setCode] = useState("");
    const [reset, setReset] = useState(!1);
    const [tenant, setTenant] = useState(!1);


async function resetPassword() {
    Auth.forgotPassword(username)
    .then(data => {
        console.log(data);
        setReset(!0);
    })
    .catch(err => console.log(err));

}

async function confirmResetPassword() {
    console.log(username, code, password)
    Auth.forgotPasswordSubmit(username, code, password)
    .then( user => {
        setResetted(!0);
    })
    .catch(err => console.log(err));

}
    useEffect((authState) => {
       if(authState === undefined) {
                  Auth.currentAuthenticatedUser().then(authData => {
                    setAuthState(AuthState.SigningUp);
                    setUser(authData);
                  });
            }
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    useEffect(() => {
     }, [user]);

     useEffect(() => {
    }, [authState]);

    const handleInputChange = (event) => {
        let key = event.target.name;
        let val = event.target.value;
        if(key === "username" ) {
            setUsername(val)
        } else if ( key === "password") {
            setPassword(val)
        } else if ( key === "passwordAgain") {
            setPasswordAgain(val)
        } else if ( key === "code") {
            setCode(val)
        }
      }

    return (
      <>
      {msg !== null && msg.changedPassword ? 
            <Alert color="sucess">
            <Row>
              <Col xs="10">
                <p className="mb-0">Du hast dein Passwort erfolgreich geändert!</p> 
              </Col>
              <Col xs="2">
                <i className="fas fa-times float-right mb-2 mr-2 mt-2 pt-0" onClick={() => setMsg({...msg, changedPassword: !1})}></i>
              </Col>
            </Row>
            </Alert>
            :
            <></>}

            {resetted ? 
                <Switch>
                    <Redirect from="*" to="/auth"></Redirect>
                </Switch>
                :
                <></>
            }
        {reset ? 
            <>
            <LandingNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
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
                                <Input placeholder="Email" type="email" name="username" onChange={(e) => handleInputChange(e)}/>
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
                                onChange={(e) => handleInputChange(e)}
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
                                <Input placeholder="Bestätigungcode" type="number" name="code" onChange={(e) => handleInputChange(e)}/>
                            </InputGroup>
                            </FormGroup>
                            <PasswordChecklist
                                rules={["minLength","number"]}
                                minLength={6}
                                value={code}
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
                                onClick={() => confirmResetPassword()}
                            >
                                Bestätigungscode senden
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
                                onClick={() => resetPassword()}
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
            :
            <>
            <LandingNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
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
                            <h3>Passwort vergessen</h3>
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
                                <Input placeholder="Email" type="email" name="username" onChange={(e) => handleInputChange(e)}/>
                            </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => resetPassword()}
                            >
                                Password zurücksetzen
                            </Button>
                            </div>
                        </Form>
                        <Row className="mt-3">
                        <Col xs="6">
                        <Link to="/auth" className=""><small>Zurück zur Anmeldung</small></Link>
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
            }
        </>
    );
  }

export default ForgotPassword;
