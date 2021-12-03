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
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Navbar,
  Container,
} from "reactstrap";
import { HashLink } from "react-router-hash-link";
const LandingFooter = () => {
    return (
      <>
      <Navbar className="navbar-bottom bg-white mt-6 pb-4 bottom" expand="md">
      <Container fluid>
         <Nav className="ml-2 position-left" navbar vertical>
                  <h2 
                  className="h4 pt-0 mt-0"
                  >
                    Rechtliches
                  </h2>
                  <NavLink className="nav-link-icon pl-0 pb-0 mb-0">
                    <p className="nav-link-inner--text text-muted mb-0 pb-0">
                    © {new Date().getFullYear()}{" "}
                      Staffbite
                    </p>
                  </NavLink>
                <Link
                  className="text-muted"
                    to="/impressum/#sectiondatasecurity"
                    target="_blank"
                  >
                    <p className="mb-0">
                    Datenschutz
                    </p>
                </Link>
                <Link
                  className="text-muted"
                    to="/impressum/#sectionimpressum"
                    target="_blank"
                  >
                    <p className="mb-0">
                    Impressum
                    </p>
                </Link>
                </Nav>
            <Nav className="position-center align-items-top mt-0 pt-0" navbar vertical>
                <h2 className="h4 pt-0 mt-0">Folgen Sie uns</h2>
                      <NavLink
                        className="text-muted ml-0 pl-0 float-left"
                          href="https://www.instagram.com/staffbite_de"
                          target="_blank"
                        >
                        <p className="mb-0">
                        Instagram
                        </p>
                      </NavLink>
                      <NavLink
                        className="text-muted ml-0 pl-0 float-left"
                          href="https://www.youtube.com/channel/UCGpprwCbFvAfKhCtg0DUX3g/featured"
                          target="_blank"
                        >
                        <p className="mb-0">
                        Youtube
                        </p>
                      </NavLink>
            </Nav>
            <Nav className="ml-2 position-right" navbar vertical>
                <NavItem className="ml-2 text-muted">
                      <h2 className="h4 ">Kontaktieren Sie uns</h2>
                      <p>
                      Zellmann GbR.
                      <br/>
                      Möllingstraße 8, 24103 Kiel
                      <br/>
                      Tel.: 0172 7018493
                      </p>
                </NavItem>
            </Nav>
        </Container>
      </Navbar>
      </>
    );
  }

export default LandingFooter;
