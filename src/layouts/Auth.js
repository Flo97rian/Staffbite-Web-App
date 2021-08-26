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
import { Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// core components

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

  return (
    <>
    { authState === AuthState.SignedIn && user ? (
      console.log(authState),
      console.log(user),
      console.log(user.attributes),
      <div className="App">
          <div>Hello, {user.username}</div>
          <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              { user.attributes !== undefined ? (user.username === user.attributes["custom:TenantId"] ? <Redirect from="*" to="/admin/index" /> : <Redirect from="*" to="/user/index" />) : <Redirect from="*" to="/auth" />}
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
          { type: "password", label: "Passwort *", placeholder: "Geben Sie ein Passwort ein" },
        ]}
        amplify-footer="Moin"
        amplify-secondary-footer-content="1"
        amplify-primary-footer-content="2"
        ></AmplifySignUp>
        <AmplifyConfirmSignUp
        headerText="Bestätige deine Registrierung"
        slot="confirm-sign-up"
        formFields={[
          { type: "username", label: "Email *", placeholder: "Geben Ihre gültige Email ein" },
          { type: "code", label: "Bestätigungs-Code *", placeholder: "Geben Sie Ihren Bestätigungscode ein" },
        ]}
        footer="Moin"
        secondary-footer-content="1"
        primary-footer-content="2"
        >
        </AmplifyConfirmSignUp>
      </AmplifyAuthenticator>
  )}
    </>
    )
}

export default Auth;