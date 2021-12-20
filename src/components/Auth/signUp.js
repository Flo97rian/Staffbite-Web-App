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
import ReactGA from 'react-ga';

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
import { Navigate, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import ConfirmTenant from "./AuthComponents/ConfirmTenant";
import VerifyTenant from "./AuthComponents/VerifyTenant";
import Register from "./AuthComponents/Register";

const SignUp = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [isValid, setIsValid] = useState(!1)
    const [checkValid, setCheckValid] = useState(!1);
    const [err, setErr] = useState(null)
    const [ErrMsng, setErrMsng] = useState({MissingAGB: !1, MissingMail: !1, MissingPassword: !1, MailAlreadyUsed: !1});
    const [msg, setMsg] = useState(null)
    const [authState, setAuthState] = useState(AuthState.SigningUp);
    const [user, setUser] = useState();
    const [code, setCode] = useState("");
    const [tenant, setTenant] = useState(!1);
    
    useEffect(() => {
        pageViewsTracking()
      },[])
    
      function pageViewsTracking () {
        const pathname = "/register";
        let pageView;
        if(pathname === "*") pageView = "/not_found";
        else pageView = pathname;
      
        ReactGA.pageview(pageView);
      } 
async function signUp() {
    if(checkValid) {
        if(isValid && checkValid) {
            setErr(null);
            try {
                const { user } = await Auth.signUp({
                    username,
                    password,
                });
                ReactGA.event({
                    category: 'User',
                    action: 'Created a Tenant'
                });
                setUser(user)
                setAuthState(AuthState.ConfirmSignUp)
            } catch (error) {
                console.log(error);
                if(error.code === "UsernameExistsException") {
                    setErrMsng({...ErrMsng, MailAlreadyUsed: !0})
                }
                setErr(error)
            }
        }
    } else {
        setErrMsng({...ErrMsng, MissingAGB: !0})
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

function checkChanged(event) {
    setCheckValid(event.target.checked);
}

async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      setTenant(!0)
      setMsg({...msg, changedPassword: !0})
      setAuthState(AuthState.SignUp)
    } catch (error) {
        console.log(error);
    }
}
    useEffect((authState) => {
       if(authState === undefined) {
                  Auth.currentAuthenticatedUser().then(authData => {
                    setAuthState(AuthState.SignUp);
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

    if(authState === AuthState.SigningUp) {
        //Tenant registrieren
        return (
            <Register
            handleInputChange={handleInputChange}
            username={username}
            password={password}
            code={code}
            err={err}
            setErrMsng={setErrMsng}
            ErrMsng={ErrMsng}
            checkChanged={checkChanged}
            setIsValid={setIsValid}
            signUp={signUp}
            passwordAgain={passwordAgain}
            ></Register>
        )
    } else if(authState === AuthState.ConfirmSignUp) {
        //Tenant verfizieren
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
    } else if(authState === AuthState.SignUp) {
        return (
                <Navigate from="*" to="/auth" />
        )
    }
    return null;
  }

export default SignUp;
