import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";


function AdminShiftplanNav (props) {
  const displayNav = useSelector(state => state.display.displayShiftplan === false && state.display.displayNewShiftplan === false);
  if (displayNav) {
    return (
      <>
        <Nav
          className="nav-fill flex-column flex-md-row mt-4 mb-4"
          id="tabs-admin-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 1}
              className={classnames("mb-sm-3 mb-md-0 nav_vorlage", {
                active: props.navIndex === 1
              })}
              onClick={() => props.onNavChange(1)}
              role="tab"
            >              
            {props.navIndex === 1 ? 
              <p className="m-0 text-white">Vorlage</p>
              :
              <p className="m-0 text-muted">Vorlage</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 2}
              className={classnames("mb-sm-3 mb-md-0 nav_eintragen", {
                active: props.navIndex === 2
              })}
              onClick={() => props.onNavChange(2)}
              role="tab"
            >             
             {props.navIndex === 2 ? 
              <p className="m-0 text-white">Bewerbung</p>
              :
              <p className="m-0 text-muted">Bewerbung</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 3}
              className={classnames("mb-sm-3 mb-md-0 nav_ueberpruefen", {
                active: props.navIndex === 3
              })}
              onClick={() => props.onNavChange(3)}
              role="tab"
            >
              {props.navIndex === 3 ? 
              <p className="m-0 text-white">Überprüfung</p>
              :
              <p className="m-0 text-muted">Überprüfung</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 4}
              className={classnames("mb-sm-3 mb-md-0 nav_veroeffentlichen", {
                active: props.navIndex === 4
              })}
              onClick={() => props.onNavChange(4)}
              role="tab"
              >
              {props.navIndex === 4 ? 
              <p className="m-0 text-white">Schichtplan</p>
              :
              <p className="m-0 text-muted">Schichtplan</p>
              }
            </NavLink>
          </NavItem>
        </Nav>
      </>
    );
  }
  return null;
}

export default AdminShiftplanNav;