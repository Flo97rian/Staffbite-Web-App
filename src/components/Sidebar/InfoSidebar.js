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

const InfoSidebar = (props) => {

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
      className="navbar-vertical fixed-right bg-white"
      expand="sm"
      style={{"zIndex": "1073"}}
      id="sidenav-info"
    >
        <Row className="float-right p-2">
            <i className="fas fa-times text-default" onClick={() => closeCollapse()}/>
        </Row>
        {/* Collapse */}
        <Collapse navbar isOpen={isOpen}>
            <p className="lead mt-0">{props.sidebarInfo.title}<i className="fas fa-question-circle text-light ml-2"/></p>
            <p>{props.sidebarInfo.text}</p>
            <br/>
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

export default InfoSidebar;
