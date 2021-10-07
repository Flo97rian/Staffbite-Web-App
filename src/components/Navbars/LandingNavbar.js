import React from "react";
import { HashLink } from 'react-router-hash-link';
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const LandingNavBar = (props) =>  {
  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: HashLink,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
    return (
      <>
      <Navbar className="navbar-top navbar-horizontal fixed-top bg-white shadow" expand="md" sticky>
        <Container fluid>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="60px"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
            <Nav className="ml-2 float-right" navbar>
              <NavItem>
              <HashLink className="m-2" smooth to='/#sectionloesung' >
                  <span className="nav-link-inner--text text-muted">Lösung</span>
              </HashLink>
              </NavItem>
              <NavItem>
                <HashLink className="m-2" smooth to='/#aboutus' >
                  <span className="nav-link-inner--text text-muted">Team</span>
                </HashLink>
              </NavItem>
              <NavItem>
              <HashLink className="m-2" smooth to='/#sectionkontakt' >
                  <span className="nav-link-inner--text text-muted">Impressum</span>
                </HashLink>
              </NavItem>
            </Nav>
        </Container>
      </Navbar>
      </>
    );
  }

export default LandingNavBar;