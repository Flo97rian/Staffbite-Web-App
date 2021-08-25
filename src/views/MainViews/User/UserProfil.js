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
} from "reactstrap";
// core components
import Header from "../../../components/Headers/Header.js";
import ProfilContainer from "../../../components/User/Profil/ProfilContainer.js";

export default class UserProfil extends React.Component {
  render() {
    return (
      <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <ProfilContainer></ProfilContainer>
      </Container>
    </>
    );
  }
}