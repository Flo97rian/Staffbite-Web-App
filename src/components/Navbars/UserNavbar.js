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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Container,
} from "reactstrap";
import { useSelector } from "react-redux";
import store from "../../store";
import { Auth } from 'aws-amplify';
import { getUser } from "../../store/middleware/FetchUser";
import { userroutes } from "../../routes";

const UserNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const selectUser = state => state.DB.user

  const User = useSelector(selectUser);
    // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(getUser)
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}
        className="mr-4">
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName={"active"}
          >
            {activeRoute(prop.layout + prop.path) === "active" ?
            <p className="text-primary mt-2 mb-0">
              <i
              className={prop.icon + " " + prop.style + " " + "mr-2 text-primary"}
              />
              {prop.name}
              </p>
            :
            <p className="text-muted mt-2 mb-0">
              <i
              className={prop.icon + " " + "mr-2 text-muted"}
              />
              {prop.name}
              </p>
          }
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
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
      <Navbar className="navbar-top bg-white fixed-top mr-2 shadow" expand="md" id="navbar-main" sticky="top">
        <Container fluid>
         {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="40px"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
          <Nav navbar>{createLinks(userroutes)}</Nav>
          <Nav className="align-items-center text-primary d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
              <p className="text-muted mt-2 mb-0">
              <i className="fa fa-user-circle text-muted mr-2"
              />
              {User?.name ? <>{User.name["S"]}</> : <></>}
              </p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Willkommen!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/profil" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mein Profil</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default UserNavbar;
