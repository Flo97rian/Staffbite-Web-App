import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
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
      <Navbar className="bg-white shadow justify" fixed="top" expand="md" light>
        {logo ? (
          <NavbarBrand className="pt-0 mr-6" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              height="40px"
              width="120px"
              title="Staffbite"
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
                  <HashLink className="p text-muted p-0" to="/schichtplan/#sectionregister">
                  <p className="p-0 m-0">
                      Erste Anmeldung
                      </p>
                  </HashLink>
                </DropdownItem>

                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/schichtplan/#sectionteam">
                  <p className="p-0 m-0">
                      Team verwalten
                      </p>
                  </HashLink>
                </DropdownItem>

                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/schichtplan/#sectioncreate">
                  <p className="p-0 m-0">
                      Schichtplan erstellen
                      </p>
                  </HashLink>
                </DropdownItem>
               
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/schichtplan/#sectionavailable">
                  <p className="p-0 m-0">
                      Verfügbarkeiten eintragen
                      </p>
                  </HashLink>
                </DropdownItem>

                <DropdownItem>
                <HashLink className="p text-muted p-0" to="/schichtplan/#sectionalg">
                <p className="p-0 m-0">
                      Automatisierte Befüllung
                      </p>
                  </HashLink>
                </DropdownItem>
                
                <DropdownItem>
                  <HashLink className="p text-muted p-0" to="/schichtplan/#sectiondone">
                  <p className="p-0 m-0">
                      Schichtplan veröffentlichen
                      </p>
                  </HashLink>
                </DropdownItem>

                <DropdownItem className="text-muted">
                <HashLink className="p text-muted p-0" to="/schichtplan/#sectionapp">
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
        <Link to="/signup">
                <Button className="btn-icon btn-3 p-2 mr-3 opacity-9" color="success" type="button"><p className="p-0 m-0">Kostenlos Testen</p></Button>
              </Link>
        <Link to="/auth">
                <Button className="btn-icon btn-3 p-2 opacity-9" color="primary" type="button"><p className="p-0 m-0">Anmelden</p></Button>
              </Link>
      </Navbar>
      </>
    );
  }

export default LandingNavBar;