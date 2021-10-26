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
/*eslint-disable*/
import React from "react";
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
   Col
} from "reactstrap";

const AuthFooter = () => {
  return (
    <>
      <Navbar className="navbar-bottom bg-white mt-6 fixed-bottom" expand="md" sticky="bottom">
      <Container fluid>
         <Nav className="ml-2" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon">
                    <span className="nav-link-inner--text text-muted">
                    © {new Date().getFullYear()}{" "}
                      Staffbite
                    </span>
                  </NavLink>
                </NavItem>
                </Nav>
            <Nav className="ml-2 float-right" navbar>
              <NavItem className="ml-2 float-right">
                      <NavLink
                      className="text-muted"
                        href="https://www.instagram.com/staffbite_de"
                        target="_blank"
                      >
                        Instagram
                      </NavLink>
                </NavItem>
                <NavItem className="ml-2 float-right">
                      <NavLink
                      className="text-muted"
                        to="/impressum"
                        target="_blank"
                      >
                        Impressum
                      </NavLink>
                </NavItem>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthFooter;
