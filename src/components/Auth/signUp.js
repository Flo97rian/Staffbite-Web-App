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
import AuthNavbar from "../Navbars/AuthNavbar"
import AuthFooter from "../Footers/AuthFooter"
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [isValid, setIsValid] = useState(!1)
    const [err, setErr] = useState(null)
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    const [code, setCode] = useState();
    const [tenant, setTenant] = useState(!1);

async function signUp() {
    if(isValid) {
    setErr(null);
    try {
        const { user } = await Auth.signUp({
            username,
            password,
        });
        setUser(user)
    } catch (error) {
        console.log('error signing up:', error);
        setErr(error)
    }
    }
}

async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      setTenant(!0)
    } catch (error) {
    }
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
        {user ? 
        (
        tenant ? <Switch><Redirect from="*" to="/auth" /></Switch> :
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
                    <Card className="bg-white shadow border-0 mb-4">
                        <CardHeader className="bg-white pb-2">
                        <div className="text-muted text-center pt-4">
                            <h3>Bestätigungscode eingeben</h3>
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
                                <Input placeholder="Bestätigungscode" type="number" name="code" onChange={(e) => handleInputChange(e)}/>
                            </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => confirmSignUp()}
                            >
                                Senden
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
        :
            <>
            <AuthNavbar 
                logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
                  { err !== null && err.code === "UsernameExistsException" ? 
                <div>
                <Alert color="warning" isOpen={!0} fade={false}>
                    {err.message}
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
                            <h3>Registrieren</h3>
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
                                value={password}
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
                                onClick={() => signUp()}
                            >
                                Registrieren
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
            }
        </>
    );
  }

export default SignUp;
