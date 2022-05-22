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
import { NavLink as NavLinkRRD, Link, useLocation, useNavigate } from "react-router-dom";
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
import { thunkUpdateProfile } from "../../store/middleware/UpdateProfile";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { Auth } from 'aws-amplify';
import { thunkFetchOrg } from "../../store/middleware/FetchOrg";
import {adminroutes} from "../../routes"
import _, { replace } from "lodash";
import getCompanyAccess from "../../libs/getCompanyAccess";
import createCompanyRoutes from "../../libs/createCompanyRoutes";
import { differenceInDays, differenceInMonths, isBefore } from "date-fns";
import { resettingOnboarding } from "../../reducers/Meta";

const AdminNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [trialMessage, setTrialMessage] = useState("");
  const [trialClassName, setTrailClassName] = useState("");
  const Meta = useSelector(state => state.Meta);
  let location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
    // Initiales laden der aktuellen Users
    
useEffect(() => {
  dispatch(thunkFetchOrg);
}, []);

useEffect(() => {
  getCompanyAccessAsAdmin(Meta);
  if(_.isObject(Meta)) {
    const trial = _.get(Meta, "tenantCategorie.trial", false);
    if(trial) {
      let difference = differenceInMonths(new Date(), new Date(Meta.tenantCategorie.registeredAt))
      if(difference > 0) {
        updateTrial()
      } else {
        getDays()
      }
    }
  }
}, [Meta]);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggle = () => setIsOpen(!isOpen);

  // closes the collapse
  const closeCollapse = () => {
    setIsOpen(false);
  };

  const getCompanyAccessAsAdmin = async () => {
    const access = await getCompanyAccess(Meta);
    const routes = await createCompanyRoutes(access);
    setRoutes(routes)
  }
  const handleNavigate = (route) => {
    navigate(route, {replace: false})
  }
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      let route = prop.layout + prop.path
      return (
        <NavItem key={key}
        className="mr-4  ml-2">
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={() => handleNavigate(route)}
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
        navigate("/auth", { replace: true })
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function getDays() {
  if(_.get(Meta, "tenantCategorie.trial", false)) {
    let response = "Dein Probemonat läuft aus in "
    let classname = "text-success lead font-weight-bold mb-0 mt-2";
    let timestamp = new Date(_.get(Meta, "tenantCategorie.registeredAt"))
    let difference = differenceInDays(new Date(), timestamp)
    response = response + String(30 - difference) + " Tagen";
    if(difference > 20) {
      setTrialMessage("Dein Probemonat läuft bald aus! " + String(30 - difference) + " Tage verbleibend")
      setTrailClassName("float-right lead text-yellow font-weight-bold mb-0 mt-2")
    } else {
      setTrialMessage(response);
      setTrailClassName(classname);
    }
    
  }
  return null;
}

async function updateTrial() {
  let meta = Meta;
  meta.tenantCategorie.trial = !1
  await store.dispatch(thunkUpdateProfile(meta));
}
function tourStarten() {
  dispatch(
    thunkUpdateProfile(
      {
        ...Meta,
        onboarding: {
          overview: true,
          shiftplan: true,
          team: true,
          settings: true
        }
      }
    )
  );
}

      return (
    <>
    <Container className="ml-2 mr-2 ">
      <Navbar 
      light
      className="navbar-top navbar-horizontal fixed-top bg-white shadow sticky" 
      expand="md"
      >
          <NavbarBrand className="ml-2" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="40px"
              width="120px"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        <NavbarToggler onClick={toggle} className="align-items-center"></NavbarToggler>
        <Collapse className="ml-2 mr-2" isOpen={isOpen} navbar>
          <Nav navbar> {createLinks(routes)}</Nav>
          {_.isEmpty(trialMessage) ? <></> : <p className={trialClassName}>{trialMessage}</p>}
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
                  <DropdownItem onClick={() => tourStarten()}>
                    <i className="fas fa-eye" />
                    <span>Tour starten</span>
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
