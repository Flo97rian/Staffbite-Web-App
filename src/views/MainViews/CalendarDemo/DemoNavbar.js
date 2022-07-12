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
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link, useLocation, useNavigate } from "react-router-dom";
// reactstrap components
import StaffbiteLogo from "../../../assets/img/brand/Staffbite_Logo.png"
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
import { useSelector, useDispatch } from "react-redux";
import { Auth } from 'aws-amplify';
import _ from "lodash";
import { differenceInDays, differenceInMonths } from "date-fns";

const DemoNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState(["Schichtplan", "Team"]);
  const [currentRoute, setCurrentRoute] = useState("Schichtplan");
  let location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
    // Initiales laden der aktuellen Users

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return routeName === currentRoute ? "active" : "";
  };

  const toggle = () => setIsOpen(!isOpen);

  // closes the collapse
  const closeCollapse = () => {
    setIsOpen(false);
  };
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      return (
        <NavItem key={index}
        className="mr-4  ml-2">
          <NavLink
          >
            {activeRoute(route) === "active" ?
            <p className="text-primary mt-2 mb-0">
              <i
              className={" mr-2 text-primary"}
              />
              {route}
              </p>
            :
            <p className="text-muted mt-2 mb-0">
              <i
              className={" mr-2 text-muted"}
              />
              {route}
              </p>
          }
          </NavLink>
        </NavItem>
      );
    });
  };

async function signOut() {
}

      return (
    <>
    <Container className="ml-2 mr-2 ">
      <Navbar 
      light
      className="navbar-top navbar-horizontal fixed-top bg-white shadow sticky" 
      expand="md"
      >
            <img
              alt="Staffbite Logo"
              className="navbar-brand-img"
              height="40px"
              width="120px"
              src={StaffbiteLogo}
            />
        <NavbarToggler onClick={toggle} className="align-items-center"></NavbarToggler>
        <Collapse className="ml-2 mr-2" isOpen={isOpen} navbar>
          <Nav navbar> {createLinks(routes)}</Nav>
        </Collapse>
        <NavbarText className="mr-2">
          <UncontrolledDropdown className="mr-4">
                <DropdownToggle className="pr-0" nav>
                <p className="text-muted mt-2 mb-0">
                <i className="fa fa-user-circle text-muted mr-2"
                />
                </p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Willkommen!</h6>
                  </DropdownItem>
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Einstellungen</span>
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fas fa-eye" />
                    <span>Tour starten</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
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
export default DemoNavbar
