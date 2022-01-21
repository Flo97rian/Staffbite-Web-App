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
// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";
import AccountProfil from "../../components/Profil/AccountProfil.js"


export default class Profil extends React.PureComponent {
  render() {
    return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <AccountProfil></AccountProfil>
        </Row>
      </Container>
    </>
  );
};
}
