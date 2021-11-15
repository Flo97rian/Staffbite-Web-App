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
import { Switch, Redirect, Route} from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// core components

import Amplify from 'aws-amplify';
import { Authenticator} from 'aws-amplify-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../aws-exports';
import { authroutes } from "../routes"
import AuthFooter from "../components/Footers/AuthFooter"

Amplify.configure(awsconfig);

const AuthUI = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    const getRoutes = (adminroutes) => {
      return authroutes.map((prop, key) => {
        if (prop.layout === "/auth") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
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
            <Switch>
              { user.attributes !== undefined ? (user.username === user.attributes["custom:TenantId"] ? <Redirect from="*" to="/admin/index" /> : <Redirect from="*" to="/user/index" />) : <Redirect from="*" to="/auth" />}
            </Switch>
          </Row>
        </Container>
      </div>
    ) : (
      <Authenticator hideDefault={true}>
        <div className="pt-8">
        <Switch>
          {getRoutes(authroutes)}
          <Redirect from="*" to="/auth" />
        </Switch>
        </div>
      </Authenticator>
  )}
    <AuthFooter></AuthFooter>
    </>
    )
}

export default AuthUI;