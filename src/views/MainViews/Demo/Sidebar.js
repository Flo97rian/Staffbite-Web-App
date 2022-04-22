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
/*eslint-disable*/
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import store from "../../store";
import "./Sidebar.css"

// reactstrap components
import {
  Collapse,
  Navbar,
  Row,
  Nav,
} from "reactstrap";

var ps;

const DemoSidebar = (props) => {

    let isOpen = !1;
    let infoOpen = isInfoOpen(props.sidebarInfo);
    if (infoOpen) {
        isOpen = !0;
    }

    function isInfoOpen (infoModal) {
        let isOpen = !1;
        if(infoModal !== !1) {
            isOpen = !0;
        }
        return isOpen
    }

  // closes the collapse
  const closeCollapse = () => {
    store.dispatch({type: "CLOSE_INFO"})
  };
  if(isOpen) {
  return (
    <Navbar
        style={{"zIndex": "1075"}}
        className="navbar-vertical fixed-right bg-white navbar-expand-lg"
        expand="lg"
        id="sidenav-info"
    >
        <Row className="float-right p-2">
            <i className="fas fa-times text-default" onClick={() => closeCollapse()}/>
        </Row>
        {/* Collapse */}
        <Collapse navbar isOpen={isOpen}>
        <Row className="ml-4 mt-2 text-center">
                            <Col className="mr-0">
                                <Row className="mt-4 text-center">
                                    <h2 className="mb-0 pb-0">Konfiguriere deine Demo</h2>
                                </Row>
                                <Row className="mt-6 mb-0 text-center">
                                    <Col>
                                        <Row className="text-center">
                                            <p className="font-weight-bold lead p-0 mx-5 m-0 text-md">
                                                {teamSize}
                                            </p>
                                            <p className="font-weight-bold lead p-0 mx-2 m-0 text-md">
                                                {branche}
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-1 mb-0 text-center">
                                    <Col>
                                        <Row className="text-center">
                                            <p className="font-weight-light p-0 mx-4 m-0 text-md">
                                                Teamgröße
                                            </p>
                                            <p className="font-weight-light p-0 mx-4 m-0 text-md">
                                                Branche
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-6 mb-0 text-center">
                                    <Col>
                                        <Row className="text-center">
                                            <p className="font-weight-normal p-0 m-0 text-md lead">
                                                Unsere Empfehlung:
                                                {" "}{" "}
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                {renderConfigSelected("Digitaler Schichtplan", "basicLayout")}
                                {renderConfigSelected("Automatisierte Befüllung", "automate")}
                                {renderConfigSelected("Mitarbeiter App", "app")}
                                <Row className="mt-8 mb-4">
                                    <Col className="">
                                        <Button color="primary font-weight-light border-lg rounded-pill px-7 py-2 ml--5" onClick={() => handleShowModal("zusammenfassung")}>
                                            <p className="lead p-0 m-0">
                                                Direkt starten
                                            </p>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
        </Collapse>
        <Nav className="position-absolute bottom-2">
            <p className="description">Falls diese Erklärung nicht geholten hat, scheib uns deine Frage gerne per Mail!</p>
        </Nav>
    </Navbar>
    );
    } else {
        return null;
    }
};

export default DemoSidebar;
