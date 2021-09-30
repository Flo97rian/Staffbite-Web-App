import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import SchichtplanImport from "../Form/SchichtplanImport";

class Navs extends React.Component {
  render() {
    return (
      <>
        <Nav
          className="nav-fill flex-column flex-sm-row mt-4 mb-4"
          id="tabs-text"
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
              <p className="m-0 text-white">Freigegeben</p>
              :
              <p className="m-0 text-muted">Freigegeben</p>
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
              <p className="m-0 text-white">Review</p>
              :
              <p className="m-0 text-muted">Review</p>
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
              <p className="m-0 text-white">Veröffentlicht</p>
              :
              <p className="m-0 text-muted">Veröffentlicht</p>
              }
            </NavLink>
          </NavItem>
        </Nav>
      </>
    );
  }
}

export default Navs;