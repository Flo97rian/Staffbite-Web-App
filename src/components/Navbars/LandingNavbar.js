import React from "react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";

const LandingNavBar = (props) =>  {

  const { logo } = props;
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
      <Navbar className="navbar-top navbar-horizontal fixed-top bg-white shadow sticky" expand="md">
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
            <Nav className="m-0 ml-2 float-right" navbar>
            <UncontrolledDropdown>
              <DropdownToggle className="pr-0 p-0 pt-2" nav >
              <p className="nav-link-inner--text text-muted p-0 mr-5 m-0">
                Produkte
              </p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow bottom">
                <DropdownItem className="noti-title" header tag="div">
                  <h5 className="text-overflow m-0">digitaler Schichtplan</h5>
                </DropdownItem>
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/shiftplan/#sectioncreate">
                  <p className="p-0 m-0">
                      Schichtpläne erstellen
                      </p>
                  </HashLink>
                </DropdownItem>
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/shiftplan/#sectionteam">
                  <p className="p-0 m-0">
                      Team verwalten
                      </p>
                  </HashLink>
                </DropdownItem>
                <DropdownItem>
                <HashLink className="p text-muted p-0" to="/shiftplan/#sectionalg">
                <p className="p-0 m-0">
                      Automatisierte Befüllung
                      </p>
                  </HashLink>
                </DropdownItem>
                <DropdownItem className="text-muted">
                <HashLink className="p text-muted p-0" to="/shiftplan/#sectionapp">
                    <p className="p-0 m-0">
                      Für dein Team
                      </p>
                  </HashLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
                <Link  to='/contact' >
                    <p className="nav-link-inner--text text-muted p-0  pt-2 mr-5 m-0">
                      Kontakt
                    </p>
                </Link>
              <UncontrolledDropdown>
              <DropdownToggle className="pr-0 p-0 pt-2" nav >
                <p className="nav-link-inner--text text-muted p-0 mr-5 m-0">
                  Über uns
                </p>
              </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow bottom">
                <DropdownItem>
                  <Link className="p text-muted p-0" to="/aboutus">
                  <p className="p-0 m-0">
                      Über uns
                      </p>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/impressum/#sectionlaw">
                  <p className="p-0 m-0">
                      Rechtliches
                      </p>
                  </HashLink>
                </DropdownItem>
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/impressum/#sectiondatasecurity">
                  <p className="p-0 m-0">
                      Datenschutz
                      </p>
                  </HashLink>
                </DropdownItem>
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/impressum/#sectionimpressum">
                  <p className="p-0 m-0">
                      Impressum
                      </p>
                  </HashLink>
                </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              <Link to='/pricing' >
                    <p className="nav-link-inner--text text-muted p-0 pt-2 mr-5 m-0">
                      Preise
                    </p>
                </Link>
              <Link to="/auth">
                <Button className="btn-icon btn-3 p-2" color="success" type="button"><p className="p-0 m-0">Anmelden</p></Button>
              </Link>
            </Nav>
        </Container>
      </Navbar>
      </>
    );
  }

export default LandingNavBar;