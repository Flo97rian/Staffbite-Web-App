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
import React, { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Collapse,
  Container,
  NavItem,
  NavLink,
  NavbarText,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import { useSelector } from "react-redux";
import store from "../../store";
import { Auth } from 'aws-amplify';
import { FetchOrg } from "../../store/middleware/FetchOrg";
import {adminroutes} from "../../routes"

const AdminNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectMeta = state => state.Meta;

  const Meta = useSelector(selectMeta);
    // Initiales laden der aktuellen Users
    
useEffect(() => {
  store.dispatch(FetchOrg);
}, []);

useEffect(() => {
}, [Meta]);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggle = () => setIsOpen(!isOpen);

  // closes the collapse
  const closeCollapse = () => {
    setIsOpen(false);
  };
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}
        className="mr-4  ml-2">
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName={"active"}
          >
            {activeRoute(prop.layout + prop.path) === "active" ?
            <p className="text-primary mt-2 mb-0">
              <i
              className={prop.icon + " " + prop.style + " mr-2 text-primary"}
              />
              {prop.name}
              </p>
            :
            <p className="text-muted mt-2 mb-0">
              <i
              className={prop.icon + " mr-2 text-muted"}
              />
              {prop.name}
              </p>
          }
          </NavLink>
        </NavItem>
      );
    });
  };

  const { logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

      return (
    <>
    <Container className="ml-2 mr-2 ">
      <Navbar 
      light
      className="navbar-top bg-white shadow " 
      expand="lg" 
      >
          <NavbarBrand className=" ml-2" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="40px"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        <NavbarToggler onClick={toggle} className="align-items-center"></NavbarToggler>
        <Collapse className="ml-2 mr-2" isOpen={isOpen} navbar>
          <Nav navbar> {createLinks(adminroutes)}</Nav>
        </Collapse>
        <NavbarText className="mr-2">
        <UncontrolledDropdown className="mr-4">
              <DropdownToggle className="pr-0" nav>
              <p className="text-muted mt-2 mb-0">
              <i className="fa fa-user-circle text-muted mr-2"
              />
              {Meta ? Meta.name : <></>}
              </p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Willkommen!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/einstellungen" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Einstellungen</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/auth" onClick={() => signOut()}>
                  <i className="ni ni-user-run" />
                  <span>Ausloggen</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        </NavbarText>
        </Navbar>
      </Container>
    </>
  );
};
export default AdminNavbar
