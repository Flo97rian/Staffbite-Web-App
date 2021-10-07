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
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import landing from "../../assets/img/theme/landing.jpg";
import profile from "../../assets/img/theme/profile.jpg";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Navbar,
  Container,
} from "reactstrap";
const LandingFooter = () => {
    return (
      <>
      <Navbar className="navbar-bottom bg-white mt-6 pb-4" expand="md">
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
  }

export default LandingFooter;
