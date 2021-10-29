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
import AuthFooter from "../Footers/AuthFooter"
import AuthNavbar from "../Navbars/AuthNavbar"
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState("");
    const [isValid, setIsValid] = useState(!1);
    const [err, setErr] = useState(null)
    const [newpassword, setNewPassword] = useState("");
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
       if(authState === undefined) {
                  Auth.currentAuthenticatedUser().then(authData => {
                    setAuthState(AuthState.SignedIn);
                    setUser(authData);
                  });
            }
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, [authState]);

     useEffect(() => {
    }, [user]);

    
    async function signIn() {
        try {
            const user = await Auth.signIn(username, password);
            if ("challengeName" in user && !newpassword) {
                setAuthState(AuthState.ResetPassword);
                setUser(user);
            } else if ("challengeName" in user && newpassword !== null) {
                changePassword(password, newpassword);
                setAuthState();
            } else {
                setAuthState(AuthState.SignedIn);
                setUser(user);
            }
        } catch (error) {
            setErr(error);
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
        } else if ( key === "passwordAgain") {
            setPasswordAgain(val)
        } 
      }
    
      async function changePassword(password, newpassword) {
        Auth.signIn(username, password)
        .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                if (isValid) {

                }
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    newpassword,       // the new password
                ).then(user => {
                    setUser(user);
                }).catch(e => {
                });
            } else {
                // other situations
            }
        }).catch(e => {
        });
    };

    const SignInAuthState = () => {
        if (authState === AuthState.ResetPassword && user) {
            return (
                <>
                            <AuthNavbar 
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
                                onChange={(e) => handleInputChange(e)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <PasswordChecklist
                                rules={["minLength","specialChar","number","capital","match"]}
                                minLength={8}
                                value={newpassword}
                                valueAgain={passwordAgain}
                                onChange={(isValid) => setIsValid(isValid)}
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
                            </Col>
                        </Row>
                            </CardBody>
                        </Card>
                        </Col>
                        </Row>
                    </Container>
                </section>
                </main>
                <AuthFooter/>
                </>
            )
        } else if (authState === AuthState.SignedIn && user) {
            if("challengeParam" in user ) {
                if(user.username === user.challengeParam.userAttributes["cutom:TenantId"]) {
                    return (
                        <Switch>
                            <Redirect from="*" to="/admin/index" />
                        </Switch>
                    )
                } else if (user.username !== user.challengeParam.userAttributes["cutom:TenantId"]) {
                    return (
                        <Switch>
                            <Redirect from="*" to="/user/index" />
                        </Switch>
                    )
                }
            } else if (user.username === user.attributes["custom:TenantId"]) {
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
            return (
                <>
            <AuthNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
                { err !== null && err.code === "NotAuthorizedException" ? 
                <div>
                <Alert color="warning">
            <Row>
              <Col xs="10">
                <p className="mb-0">{err.message}</p> 
              </Col>
              <Col xs="2">
                <i className="fas fa-times float-right mb-2 mr-2 mt-2 pt-0" onClick={() => setErr({...err, code: !1})}></i>
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
            <AuthFooter/>
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
