import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";


class Navs extends React.Component {
  render() {
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
              aria-selected={this.props.navIndex === 1}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.props.navIndex === 1
              })}
              onClick={() => this.props.onNavChange(1)}
              role="tab"
            >              
            {this.props.navIndex === 1 ? 
              <p className="m-0 text-white">Entwurf</p>
              :
              <p className="m-0 text-muted">Entwurf</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={this.props.navIndex === 2}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.props.navIndex === 2
              })}
              onClick={() => this.props.onNavChange(2)}
              role="tab"
            >             
             {this.props.navIndex === 2 ? 
              <p className="m-0 text-white">Bewerbung</p>
              :
              <p className="m-0 text-muted">Bewerbung</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={this.props.navIndex === 3}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.props.navIndex === 3
              })}
              onClick={() => this.props.onNavChange(3)}
              role="tab"
            >
              {this.props.navIndex === 3 ? 
              <p className="m-0 text-white">Überprüfung</p>
              :
              <p className="m-0 text-muted">Überprüfung</p>
              }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={this.props.navIndex === 4}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.props.navIndex === 4
              })}
              onClick={() => this.props.onNavChange(4)}
              role="tab"
              >
              {this.props.navIndex === 4 ? 
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
}

export default Navs;