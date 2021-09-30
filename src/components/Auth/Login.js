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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";

// core components
import DemoNavbar from "../Navbars/DemoNavbar";
import SimpleFooter from "../Footers/SimpleFooter.js";
import { Link } from "react-router-dom";
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [newpassword, setNewPassword] = useState(null);
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
       if(authState === undefined) {
                  Auth.currentAuthenticatedUser().then(authData => {
                    setAuthState(AuthState.SignedIn);
                    setUser(authData);
                    console.log(authData)
                  });
            }
        console.log(authState, user)
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
            console.log(authData)
        });
    }, []);

    useEffect(() => {
     }, [authState]);

     useEffect(() => {
    }, [user]);

    
    async function signIn() {
        try {
            console.log(username, password)
            const user = await Auth.signIn(username, password);
            console.log("neues passwort", newpassword)
            console.log("neues passwort", !newpassword)
            if (Object.keys(user).includes("challengeName") && !newpassword) {
                console.log("want to change", user)
                setAuthState(AuthState.ResetPassword);
                setUser(user);
            } else if (Object.keys(user).includes("challengeName") && newpassword !== null) {
                changePassword(password, newpassword)
                setAuthState();
            } else {
                console.log(user)
                setAuthState(AuthState.SignedIn);
                setUser(user);
                console.log(AuthState)
                console.log(authState)
            }
        } catch (error) {
            console.log('error signing in', error);
        }   
    }

    const handleInputChange = (event) => {
        let key = event.target.name;
        let val = event.target.value;

        if (key === "username") {
            setUsername(val)
        } else if ( key === "password") {
            setPassword(val)
        } else if ( key === "newpassword") {
            setNewPassword(val)
        }
      }
    
      async function changePassword(password, newpassword) {
        Auth.signIn(username, password)
        .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    newpassword,       // the new password
                ).then(user => {
                    setUser(user);
                    console.log(user);
                }).catch(e => {
                  console.log(e);
                });
            } else {
                // other situations
            }
        }).catch(e => {
            console.log(e);
        });
      }

    const SignInAuthState = () => {
        if (authState === AuthState.ResetPassword && user) {
            console.log("changetry")
            return (
                <>
                <DemoNavbar />
                <main className="bg-white">
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
                                    <Input placeholder="Altes Passwort" type="password" name="password" onChange={(e) => handleInputChange(e)}/>
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
                                    onChange={(e) => handleInputChange(e)}
                                    />
                                </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => signIn()}
                                >
                                    Passwort ändern
                                </Button>
                                </div>
                            </Form>
                            <Row className="mt-3">
                            <Col xs="6">
                            <Link to="/auth" className=""><small>Zurück zur Anmeldung</small></Link>
                            </Col>
                            <Col className="text-right" xs="6">
                            <Link className="" to="/auth"><small>Passwort vergessen?</small></Link>
                            </Col>
                        </Row>
                            </CardBody>
                        </Card>
                        </Col>
                        </Row>
                    </Container>
                </section>
                </main>
                <SimpleFooter/>
                </>
            )
        } else if (authState === AuthState.SignedIn && user) {
            console.log("signtry")
            if (user.username === user.attributes["custom:TenantId"]) {
                return (
                    <Switch>
                        <Redirect from="*" to="/admin/index" />
                    </Switch>
                )
            } else {
                return (
                    <Switch>
                        <Redirect from="*" to="/user/index" />
                    </Switch>
                )}
        } else {
            console.log("standard")
            return (
                <>
            <DemoNavbar />
            <main className="bg-white">
            <section className="section section-shaped section-lg">
                <Container className="pt-lg-7">
                <Row className="justify-content-center">
                    <Col lg="5">
                    <Card className="bg-secondary shadow border-0 mb-4">
                        <CardHeader className="bg-secondary pb-2">
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
                                placeholder="Password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                                className="custom-control-input"
                                id=" customCheckLogin"
                                type="checkbox"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor=" customCheckLogin"
                            >
                                <span>Anmeldedaten merken</span>
                            </label>
                            </div>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => signIn()}
                            >
                                Anmelden
                            </Button>
                            </div>
                        </Form>
                        <Row className="mt-3">
                        <Col xs="6">
                        <Link className="" to="/signup"><small>Passwort vergessen?</small></Link>
                        </Col>
                        <Col className="text-right" xs="6">
                        <Link to="/signup" className=""><small>Erstelle einen Account</small></Link>
                        </Col>
                    </Row>
                        </CardBody>
                    </Card>
                    </Col>
                    </Row>
                </Container>
            </section>
            </main>
            <SimpleFooter/>
            </>
            )
        }
    }
    return (        
    <>
        {SignInAuthState()}
    </>
    );
  }

export default Login;
