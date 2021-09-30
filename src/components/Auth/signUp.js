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
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Switch, Redirect, Link } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    const [code, setCode] = useState();
    const [tenant, setTenant] = useState(!1);

async function signUp() {
    try {
        console.log(username, password)
        const { user } = await Auth.signUp({
            username,
            password,
        });
        setUser(user)
        console.log(user)
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      setTenant(!0)
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}
    useEffect(() => {
       if(authState === undefined) {
                  Auth.currentAuthenticatedUser().then(authData => {
                    setAuthState(AuthState.SigningUp);
                    setUser(authData);
                  });
            }
        console.log(authState, user)
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    useEffect(() => {
     }, [user]);

     useEffect(() => {
         console.log(authState)

    }, [authState]);

    const handleInputChange = (event) => {
        let key = event.target.name;
        let val = event.target.value;
        if(key === "username" ) {
            setUsername(val)
        } else if ( key === "password") {
            setPassword(val)
        } else if ( key === "code") {
            setCode(val)
        }
        console.log(key, val)
      }

    return (
      <>
        {user ? 
        (
        tenant ? <Switch><Redirect from="*" to="/auth" /></Switch> :
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
            <SimpleFooter/>
            </>
        ) 
        :
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
            <SimpleFooter/>
            </>
            }
        </>
    );
  }

export default SignUp;
