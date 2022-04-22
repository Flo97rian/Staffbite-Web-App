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
import { useNavigate, Switch, Redirect, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import ReactGA from "react-ga";
import NotificationAlert from "react-notification-alert";
import { WARNING_WRONG_MAIL_OR_PASSWORD, WARNING_PASSWORD_NO_CAPITAL_CHAR, WARNING_PASSWORD_NO_LOWER_CHAR, WARNING_PASSWORD_NO_NUMBER, WARNING_PASSWORD_NO_SPECIAL_CHAR, WARNING_PASSWORD_TOO_SHORT, WARNING_EMAIL_NOT_CORRECT, WARNING_CODE_MISSMATCH } from "../../../constants/Alerts";

const SelectNewPassword = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [isValid, setIsValid] = useState(!1)
    const [ErrMsng, setErrMsng] = useState({WrongLogInData: !1, PasswordRequirementsLength: !1, PasswordRequirementsLower: !1, PasswordRequirementsCapital: !1, PasswordRequirementsSpecial:!1, PasswordRequirementsNumber: !1, EMailNotCorrect: !1, CodeMismatchException: !1});
    const [resetted, setResetted] = useState(!1);
    const [err, setErr] = useState(null)
    const [msg, setMsg] = useState(null)
    const [authState, setAuthState] = useState(AuthState.ResetPassword);
    const [user, setUser] = useState();
    const [code, setCode] = useState("");
    const [reset, setReset] = useState(!1);
    const [tenant, setTenant] = useState(!1);
    const navigate = useNavigate()


    function pageViewsTracking () {
        const pathname = "/forgotpassword";
        let pageView;
        if(pathname === "*") pageView = "/not_found";
        else pageView = pathname;
      
        ReactGA.pageview(pageView);
      } 

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

async function resetPassword() {
    Auth.forgotPassword(username)
    .then(data => {
        setReset(!0);
    })
    .catch(err => console.log(err));

}
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            confirmResetPassword()
        }
      }

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
          setErrMsng({...ErrMsng, [err]: !1})
        };

        function showErrorExceeded () {
            if(err === null) return null;
            return (
                <p className="text-danger">Die maximale Anzahl deiner Zurücksetzungsversuche ist erreicht. <br/> Für die nächsten 15 Minuten kannst du keinen weiteren Anmeldeversuch durchführen. <br/> Melde dich gerne per Mail an info@staffbite.de oder kontaktiere uns unter: 0157 30 64 46 50</p>
            )
        }
      async function confirmResetPassword() {
        console.log(username, code, password)
        let capitals = /[A-Z]/
        let numbers =  /[0-9]/
        let lower = /[a-z]/
        let specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let whiteSpace = /\s/;
        let hasUsernameWhiteSpaces = whiteSpace.test(username);
        let currentUsername = username;
        currentUsername = hasUsernameWhiteSpaces ? currentUsername.replace(/\s/g, "") : currentUsername;
        let hasMinEightLetters = password.length >= 8;
        let hasCapitalLetter = capitals.test(password)
        let hasNumber = numbers.test(password);
        let hasLowerChar = lower.test(password);
        let hasSpecialChar = specialChars.test(password)
        if (hasCapitalLetter && hasMinEightLetters && hasNumber && hasSpecialChar && hasLowerChar) {
            Auth.forgotPasswordSubmit(currentUsername, code, password)
            .then( user => {
                setResetted(!0);
                navigate("/auth")
            })
            .catch(err => {
                if(err.code === "LimitExceededException") {
                    setErr("LimitExceededException")}
                else if(err.code === "ExpiredCodeException") {
                    setErrMsng({...ErrMsng, EMailNotCorrect: !0}) 
                } else if ( err.code === "CodeMismatchException") {
                    setErrMsng({...ErrMsng, CodeMismatchException: !0}) 
                }
                console.log(err)
            });
            }
        if(hasMinEightLetters === false) {
            setErrMsng({...ErrMsng, PasswordRequirementsLength: !0})
        }
        if(hasCapitalLetter === false) {
            setErrMsng({...ErrMsng, PasswordRequirementsCapital: !0}) 
        }
        if(hasLowerChar === false) {
            setErrMsng({...ErrMsng, PasswordRequirementsLower: !0}) 
        }
        if(hasNumber === false) {
            setErrMsng({...ErrMsng, PasswordRequirementsNumber: !0}) 
        }
        if(hasSpecialChar === false) {
            setErrMsng({...ErrMsng, PasswordRequirementsSpecial: !0}) 
        }
        setAuthState(AuthState.ResetPassword);

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

    return (
      <>
      {msg !== null && msg.changedPassword ? 
            <Alert color="sucess">
            <Row>
              <Col xs="10">
                <p className="mb-0">Du hast dein Passwort erfolgreich geändert!</p> 
              </Col>
              <Col xs="2">
                <i className="fas fa-times float-right mb-2 mr-2 mt-2 pt-0" onClick={() => setMsg("changedPassword", !1)}></i>
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
        { ErrMsng.PasswordRequirementsLength ? Notify("warning", WARNING_PASSWORD_TOO_SHORT, "PasswordRequirementsLength") : null}
        { ErrMsng.PasswordRequirementsCapital ? Notify("warning", WARNING_PASSWORD_NO_CAPITAL_CHAR, "PasswordRequirementsCapital") : null}
        { ErrMsng.PasswordRequirementsLower ? Notify("warning", WARNING_PASSWORD_NO_LOWER_CHAR, "PasswordRequirementsLower") : null}
        { ErrMsng.PasswordRequirementsSpecial ? Notify("warning", WARNING_PASSWORD_NO_SPECIAL_CHAR, "PasswordRequirementsSpecial") : null}
        { ErrMsng.PasswordRequirementsNumber ? Notify("warning", WARNING_PASSWORD_NO_NUMBER, "PasswordRequirementsNumber") : null}
        { ErrMsng.WrongLogInData ? Notify("warning", WARNING_WRONG_MAIL_OR_PASSWORD, "WrongLogInData") : null}
        { ErrMsng.EMailNotCorrect ? Notify("warning", WARNING_EMAIL_NOT_CORRECT, "EMailNotCorrect") : null}
        { ErrMsng.CodeMismatchException ? Notify("warning", WARNING_CODE_MISSMATCH, "CodeMismatchException") : null}
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
                            <h3>Neues Passwort festlegen</h3>
                            {showErrorExceeded()}
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
                                <Input 
                                placeholder="Bestätigungcode" 
                                type="number" 
                                name="code" 
                                onChange={(e) => handleInputChange(e)}
                                onKeyPress={(event) => handleKeyPress(event)}
                                />
                            </InputGroup>
                            </FormGroup>
                            <p>
                                Mindestanforderungen für dein Passwort:
                            </p>
                            <PasswordChecklist
                                rules={["minLength","specialChar","number","capital"]}
                                minLength={8}
                                value={password}
                                messages={{
                                    minLength: "Mindestlänge 8",
                                    specialChar: "Sonderzeichen",
                                    number: "Zahl",
                                    capital: "Großbuchstabe",
                                }}
                            />
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => confirmResetPassword()}
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
                        <small className="text-primary" style={{"cursor": "pointer"}} onClick={() => resetPassword()}>Code erneut senden</small>
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
