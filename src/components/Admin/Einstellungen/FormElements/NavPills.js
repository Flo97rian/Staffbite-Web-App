import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import Abrechnung from "./Abrechnung";
import Unternehmensprofil from "./Unternehmensprofil";
import SchichtplanEinstellungen from "./SchichtplanEinstellungen"

class Navs extends React.Component {
  state = {
    navPills: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  setNavPill() {
    if (this.state.navPills === 1) {
        return( <Abrechnung {...this.props}/>
    )} else if (this.state.navPills === 2){
      return( <SchichtplanEinstellungen {...this.props}/>
    )} else if (this.state.navPills === 3){
        return( <Unternehmensprofil {...this.props}/>
    )}
  }
  render() {
    return (
      <>
        <Nav
          className="nav-fill flex-column flex-sm-row"
          id="tabs-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={this.state.navPills === 1}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.state.navPills === 1
              })}
              onClick={e => this.toggleNavs(e, "navPills", 1)}
              href="#pablo"
              role="tab"
            >
              Abrechnungszeitraum
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={this.state.navPills === 2}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.state.navPills === 2
              })}
              onClick={e => this.toggleNavs(e, "navPills", 2)}
              href="#pablo"
              role="tab"
            >
              Schichtplan Einstellungen
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={this.state.navPills === 3}
              className={classnames("mb-sm-3 mb-md-0", {
                active: this.state.navPills === 3
              })}
              onClick={e => this.toggleNavs(e, "navPills", 3)}
              href="#pablo"
              role="tab"
            >
              Unternehmensprofil
            </NavLink>
          </NavItem>
        </Nav>
        {this.setNavPill()}
      </>
    );
  }
}

export default Navs;