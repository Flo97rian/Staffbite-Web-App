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
// core components
import LandingNavbar from "../Navbars/LandingNavbar"
import ReactGA from "react-ga";
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useNavigate, Link } from "react-router-dom";
import ResetPassword from "./AuthComponents/ResetPassword";
import SelectNewPassword from "./AuthComponents/SelectNewPassword";

const ForgotPassword = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [isValid, setIsValid] = useState(!1)
    const [resetted, setResetted] = useState(!1);
    const [err, setErr] = useState(null)
    const [msg, setMsg] = useState(null)
    const [authState, setAuthState] = useState(AuthState.ResetPassword);
    const [user, setUser] = useState();
    const [code, setCode] = useState("");
    const [reset, setReset] = useState(!1);
    const [tenant, setTenant] = useState(!1);
    const navigate = useNavigate()
    
    useEffect(() => {
        pageViewsTracking()
      },[])
    
      function pageViewsTracking () {
        const pathname = "/forgotpassword";
        let pageView;
        if(pathname === "*") pageView = "/not_found";
        else pageView = pathname;
      
        ReactGA.pageview(pageView);
      } 

async function resetPassword() {
    let whiteSpace = /\s/;
    let hasUsernameWhiteSpaces = whiteSpace.test(username);
    let currentUsername = username;
    currentUsername = hasUsernameWhiteSpaces ? currentUsername.replace(/\s/g, "") : currentUsername;
    await Auth.forgotPassword(currentUsername)
    .then(data => {
        console.log(data);
        setReset(!0);
    })
    .catch(err => {
        console.log(err)});
    
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


    async function checkUserExsists(username) {
        let response;
        try {
            await Auth.signIn(username, "Haus-123").then(
                data => response = data
            )
            .catch(err => response = err);
        } catch (err) {
            response = err;
        }
        return response;
    }
    
    if (resetted) {
        navigate("/auth")
        return null
    } else if(reset) {
        navigate("/setnewpassword")
        return null
    } else if(authState === AuthState.ResetPassword) {
        return (
            <ResetPassword
            handleInputChange={handleInputChange}
            resetPassword={resetPassword}
            ></ResetPassword>
        )
    } 
    return null;
  }

export default ForgotPassword;
