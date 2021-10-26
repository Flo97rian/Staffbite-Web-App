import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

const UserSchichtplanTabs = (props) => {
    return (
      <>
        <Nav
          className="nav-fill flex-column flex-sm-row mt-4 mb-4"
          id="tabs-user-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 1}
              className={classnames("mb-sm-3 mb-md-0", {
                active: props.navIndex === 1
              })}
              onClick={() => {props.onNavChange(1)}}
              role="tab"
            >             
             {props.navIndex === 1 ? 
              <p className="m-0 text-white">Bewerben</p>
              :
              <p className="m-0 text-muted">Bewerben</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={props.navIndex === 2}
              className={classnames("mb-sm-3 mb-md-0", {
                active: props.navIndex === 2
              })}
              onClick={() => {props.onNavChange(2)}}
              role="tab"
              >
              {props.navIndex === 2 ? 
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

export default UserSchichtplanTabs;