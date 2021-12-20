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
import store from "../../store"
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
import LandingNavbar from "../Navbars/LandingNavbar"
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Navigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import ChangeInitalPassword from "./AuthComponents/ChangeInitialPassword";
import VerifyEmployeeMail from "./AuthComponents/VerifyEmployeeMail";
import LogIn from "./AuthComponents/LogIn";
import { off } from "process";
import ConfirmTenant from "./AuthComponents/ConfirmTenant";

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState("");
    const [code, setCode] = useState("");
    const [ErrMsng, setErrMsng] = useState({WrongLogInData: !1});
    const [isValid, setIsValid] = useState(!1);
    const [msg, setMsg] = useState(null);
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


    async function confirmUserAttribute() {
        // To verify attribute with the code
        Auth.verifyCurrentUserAttributeSubmit("email", code)
        .then(() => {
            setAuthState(AuthState.SignedIn);
            console.log('email verified');
        }).catch(e => {
            console.log('failed with error', e);
        });
    }

    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username, code);
          setAuthState(AuthState.SignUp)
        } catch (error) {
            console.log(error);
        }
    }

    async function signIn() {
        try {
            const user = await Auth.signIn(username, password);
            let userAttributes = user.attributes;
            console.log(user)
            // neuer MA hat challengeName "NEW_PASSWORD_REQUIRED"
            if ("challengeName" in user) {
                if(!newpassword) {
                    setAuthState(AuthState.ResetPassword);
                    setUser(user);
                } else if (newpassword !== null) {
                    changePassword(password, newpassword);
                    setAuthState();
                }
            } else if (userAttributes !== undefined && !("email_verified" in userAttributes)) {
                sendVerifyCurrentUserAttribute()
            }else {
                setAuthState(AuthState.SignedIn);
                setUser(user);
                store.dispatch({type:"currentUser", payload: user.attributes})
                
            }
        } catch (error) {
            setErr(error);
            setErrMsng({...ErrMsng, WrongLogInData: !0})
            handleError(error);
            console.log(error)
        }   
    }

    async function handleError(error) {
        let code = error.code;
        if (code === "UserNotConfirmedException") {
            setAuthState(AuthState.ConfirmSignUp)
        }
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    async function sendVerifyCurrentUserAttribute() {
        Auth.verifyCurrentUserAttribute("email")
        .then(() => {
        console.log('a verification code is sent');
        setAuthState(AuthState.VerifyingAttributes)
        })
        .catch((e) => {
            console.log('failed with error', e);
        });
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
        } else if ( key === "code") {
            setCode(val)
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
                    setAuthState(AuthState.VerifyingAttributes);
                    signInAfterChangePassword(username, newpassword);
                }
                ).catch(e => {
                    console.log(e);
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
      };

    async function signInAfterChangePassword() {
        Auth.verifyCurrentUserAttribute("email")
        .then(() => {
            console.log('a verification code is sent');
            setAuthState(AuthState.VerifyingAttributes)
        })
        .catch((e) => {
            console.log('failed with error', e);
        });
    }

        if (authState === AuthState.ResetPassword && user) {
            return (
                <ChangeInitalPassword
                handleInputChange={handleInputChange}
                signIn={signIn}
                newpassword={newpassword}
                passwordAgain={passwordAgain}
                setIsValid={setIsValid}
                ></ChangeInitalPassword>
            )
        } else if (authState === AuthState.VerifyingAttributes) {
            return (
                <VerifyEmployeeMail
                handleInputChange={handleInputChange}
                confirmUserAttribute={confirmUserAttribute}
                sendVerifyCurrentUserAttribute={sendVerifyCurrentUserAttribute}
                code={code}
                ></VerifyEmployeeMail>
            )
        } else if (authState === AuthState.ConfirmSignUp) {
            return (
                <ConfirmTenant
                handleInputChange={handleInputChange}
                confirmSignUp={confirmSignUp}
                resendConfirmationCode={resendConfirmationCode}
                setMsg={setMsg}
                msg={msg}
                code={code}
                ></ConfirmTenant>
            )
        } else if (authState === AuthState.SignedIn && user) {
            if("challengeParam" in user ) {
                if(user.username === user.challengeParam.userAttributes["cutom:TenantId"]) {
                    return (
                            <Navigate from="*" to="/admin/index" />
                    )
                } else if (user.username !== user.challengeParam.userAttributes["cutom:TenantId"]) {
                    return (
                            <Navigate from="*" to="/user/index" />
                    )
                }
            } else if (user.username === user.attributes["custom:TenantId"]) {
                return (
                        <Navigate from="*" to="/admin/index" />
                )
            } else {
                return (
                        <Navigate from="*" to="/user/index" />
                )}
        } else {
            return (
                <LogIn
                handleInputChange={handleInputChange}
                password={password}
                err={err}
                setErrMsng={setErrMsng}
                ErrMsng={ErrMsng}
                setErr={setErr}
                signIn={signIn}
                ></LogIn>
            )
        }
  }

export default Login;
