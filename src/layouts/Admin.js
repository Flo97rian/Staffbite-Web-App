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
import React, { useState } from "react";
import ReactGA from "react-ga"
import { useLocation, Route, Navigate, useNavigate, useParams, Routes } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";

import { adminroutes } from "../routes.js";

import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);


const Admin = (props) => {
  const mainContent = React.useRef(null);
  const navigate = useNavigate()
  let location = useLocation()
  React.useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/admin";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getBrandText = (path) => {
    for (let i = 0; i < adminroutes.length; i++) {
      if (
        path.pathname.indexOf(adminroutes[i].layout + adminroutes[i].path) !==
        -1
      ) {
        return adminroutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <div className="main-content " ref={mainContent}>
        <AdminNavbar
          {...props}
          routes={adminroutes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/Staffbite_Logo.png").default,
            imgAlt: "Abbildung des Logos von Staffbite",
          }}
          brandText={getBrandText(location)}
        />
        {navigate(location.pathname)}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
