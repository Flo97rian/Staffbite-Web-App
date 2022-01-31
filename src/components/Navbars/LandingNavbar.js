import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  NavbarToggler,
  DropdownItem,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";

const LandingNavBar = (props) =>  {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // closes the collapse
  const closeCollapse = () => {
    setIsOpen(false);
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
    return (
      <>
      <Navbar className="bg-white shadow justify" fixed="top" expand="md" light>
        {logo ? (
          <NavbarBrand className="pt-0 mr-6" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="40px"
              width="120px"
              title="Staffbite"
              to="/"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
            <NavbarToggler onClick={toggle}/>
            <Collapse navbar isOpen={isOpen}>
            <Nav navbar>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle className="pr-0 p-0 pt-2" nav >
              <p className="nav-link-inner--text text-muted p-0 mr-5 m-0">
                Unsere Lösung
              </p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow bottom">
                <DropdownItem className="noti-title" header tag="div"> 

                </DropdownItem>
                
                <DropdownItem>
                  <Link className="p text-muted p-0" to="/erste-anmeldung">
                  <p className="p-0 m-0">
                      Erste Anmeldung
                      </p>
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <Link className="p text-muted p-0" to="/team-verwalten">
                  <p className="p-0 m-0">
                      Team verwalten
                      </p>
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <Link className="p text-muted p-0" to="/schichtplan-erstellen">
                  <p className="p-0 m-0">
                      Schichtplan erstellen
                      </p>
                  </Link>
                </DropdownItem>
               
                <DropdownItem>
                  <Link className="p text-muted p-0" to="/verfuegbarkeiten-eintragen">
                  <p className="p-0 m-0">
                      Verfügbarkeiten eintragen
                      </p>
                  </Link>
                </DropdownItem>

                <DropdownItem>
                <Link className="p text-muted p-0" to="/automatisierter-schichtplan">
                <p className="p-0 m-0">
                      Automatisierte Befüllung
                      </p>
                  </Link>
                </DropdownItem>
                
                <DropdownItem>
                  <Link className="p text-muted p-0" to="/schichtplan-veroeffentlichen">
                  <p className="p-0 m-0">
                      Schichtplan veröffentlichen
                      </p>
                  </Link>
                </DropdownItem>

                <DropdownItem className="text-muted">
                <Link className="p text-muted p-0" to="/fuer-dein-team">
                    <p className="p-0 m-0">
                      Für dein Team
                      </p>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
                <Link  to='/contact' >
                    <p className="nav-link-inner--text text-muted p-0  pt-2 mr-5 m-0">
                      Kontakt
                    </p>
                </Link>
                <Link to='/aboutus' >
                    <p className="nav-link-inner--text text-muted p-0 pt-2 mr-5 m-0">
                      Über uns
                    </p>
                </Link>

              <Link to='/pricing' >
                    <p className="nav-link-inner--text text-muted p-0 pt-2 mr-5 m-0">
                      Preise
                    </p>
                </Link>
                <Link to='/themen' >
                    <p className="nav-link-inner--text text-muted p-0 pt-2 mr-5 m-0">
                      Themen
                    </p>
                </Link>
              <Link  to='/faq' >
                <p className="nav-link-inner--text text-muted p-0  pt-2 mr-5 m-0">
                  FAQ
                </p>
              </Link>
            </Nav>
        </Collapse>
        <Link to="/auth">
                <Button className="btn-icon btn-3 p-2 opacity-9" color="primary" type="button"><p className="p-0 m-0">Anmelden</p></Button>
              </Link>
      </Navbar>
      </>
    );
  }

export default LandingNavBar;