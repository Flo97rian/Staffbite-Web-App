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
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
// core components

import routes from "../routes.js";
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifyConfirmSignUp} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const Auth = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
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

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/index" />
            </Switch>
          </Row>
        </Container>
          <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignUp
        headerText="Registrierung"
        slot="sign-up"
        formFields={[
          { type: "username", label: "Email *", placeholder: "Geben Sie eine gültige Email ein" },
          { type: "password", label: "Passwort *", playceholder: "Geben Sie ein Passwort ein" }
        ]}
        ></AmplifySignUp>
        <AmplifyConfirmSignUp
        headerText="Bestätige deine Registrierung"
        slot="confirm-sign-up"
        >
        </AmplifyConfirmSignUp>
      </AmplifyAuthenticator>
  );
}

export default Auth;