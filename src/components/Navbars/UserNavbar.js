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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useSelector } from "react-redux";
import store from "../../store";
import { Auth } from 'aws-amplify';
import { getUser } from "../../store/middleware/FetchUser";

const UserNavbar = (props) => {
  async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

  const selectUser = state => state.DB.user

  const User = useSelector(selectUser);
    // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(getUser)
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm ni ni-single-02">
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {User ? <>{User.name["S"]}</>: <></>}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Willkommen!</h6>
                </DropdownItem>
                <DropdownItem to="/user/profil" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mein Profil</span>
                </DropdownItem>
                <DropdownItem to="/user/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Einstellungen</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/auth" onClick={() => signOut()}>
                  <i className="ni ni-user-run" />
                  <span>Ausloggen</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default UserNavbar;