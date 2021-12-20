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

import React, {useEffect} from "react";
import ReactGA from "react-ga";
import { useLocation, Route, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
import Header from "../../../components/Headers/Header";
// core components
import UserNavbar from "../../../components/Navbars/UserNavbar";
import ApplicationsContainer from "../../../components/User/Applications/ApplicationsContainer";
import UserFooter from "../../../components/Footers/AdminFooter"

import { userroutes } from "../../../routes";


const SchichtplanBewerben = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/user/index";
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
    for (let i = 0; i < userroutes.length; i++) {
      if (
        path.pathname.indexOf(userroutes[i].layout + userroutes[i].path) !==
        -1
      ) {
        return userroutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <UserNavbar
          {...props}
          routes={userroutes}
          logo={{
            innerLink: "/user/index",
            imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
            imgAlt: "Abbildung des Logos von Staffbite",
          }}
          brandText={getBrandText(location)}
        />
        <Container fluid>
          <ApplicationsContainer></ApplicationsContainer>
          <UserFooter />
        </Container>
      </div>
    </>
  );
};

export default SchichtplanBewerben;

