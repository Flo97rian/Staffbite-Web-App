/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// core components
import Amplify from 'aws-amplify';
import { Authenticator} from 'aws-amplify-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../aws-exports';
import { authroutes } from "../routes"
import AuthFooter from "../components/Footers/AuthFooter"
import ReactGA from "react-ga";
import Login from "../components/Auth/Login";

Amplify.configure(awsconfig);

const AuthUI = (props) => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    const navigate = useNavigate()
    useEffect(() => {
      pageViewsTracking()
    },[])
  
    function pageViewsTracking () {
      const pathname = "/auth";
      let pageView;
      if(pathname === "*") pageView = "/not_found";
      else pageView = pathname;
    
      ReactGA.pageview(pageView);
    } 

    const getRoutes = (authroutes) => {
      return authroutes.map((prop, key) => {
        if (prop.layout === "/auth" && prop.path === "") {
          return (
            <Login/>
          );
        } else {
          return null;
        }
      });
    };

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return (
    <>
    { authState === AuthState.SignedIn && user ? (
      <div className="App bg-white">
          <div>Hello, {user.username}</div>
          <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
              { user.attributes !== undefined ? (user.username === user.attributes["custom:TenantId"] ? navigate("/admin/index") : navigate("/user/index")) : navigate("/auth")}
          </Row>
        </Container>
      </div>
    ) : (
      <Authenticator hideDefault={true}>
        <div className="pt-8">
          {getRoutes(authroutes)}
        </div>
      </Authenticator>
  )}
    <AuthFooter></AuthFooter>
    </>
    )
}

export default AuthUI;