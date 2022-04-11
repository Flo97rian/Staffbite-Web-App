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
import { Link } from "react-router-dom";
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
    <Navbar className="navbar-bottom bg-white mt-6 pb-4 bottom" expand="md">
    <Container fluid>
       <Nav className="ml-2" navbar vertical>
       <h4 className="ml-1 pt-0 mt-0">Rechtliches</h4>
                <NavLink className="nav-link-icon pl-0 pb-0 mb-0">
                  <span className="nav-link-inner--text text-muted mb-0 pb-0">
                  © {new Date().getFullYear()}{" "}
                    Staffbite
                  </span>
                </NavLink>
              <Link
                className="text-muted"
                  to="/impressum/#sectionimpressum"
                  target="_blank"
                >
                  Impressum
              </Link>
              <Link
                className="text-muted"
                  to="/impressum/#sectionagb"
                  target="_blank">
                  AGB
              </Link>
              <Link
                className="text-muted"
                  to="/impressum/#sectiondatasecurity"
                  target="_blank">
                  Datenschutz
              </Link>
              </Nav>
          <Nav className="ml-2 mt-0 pt-0" navbar vertical>
          <h4 className="ml-4 pt-0 mt-0">Folg uns auf Social Media</h4>
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
                          href="https://www.youtube.com/channel/UCGpprwCbFvAfKhCtg0DUX3g/featured"
                          target="_blank"
                        >
                        <p className="mb-0">
                        Youtube
                        </p>
                      </NavLink>
              </NavItem>
          </Nav>

          <Nav className="ml-2 position-right" navbar vertical>
                <NavItem className="ml-2 text-muted">
                      <h2 className="h4 ">Nimm direkt Kontakt auf</h2>
                      <p>
                      Zellmann GbR.
                      <br/>
                      Möllingstraße 8
                      <br/>
                      24103 Kiel
                      <br/>
                      Tel.: 0157 30 64 46 50
                      </p>
                </NavItem>
            </Nav>
      </Container>
    </Navbar>
    </>
  );
};

export default AuthFooter;
