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
import { useLocation } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import { useSelector, useDispatch } from "react-redux";
import UserNavbar from "../../../components/Navbars/UserNavbar";
import ApplicationsContainer from "../../../components/UserApplicationsContainer";
import UserFooter from "../../../components/Footers/AdminFooter"
import { userroutes } from "../../../routes";
import { thunkFetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkFetchEmployee } from "../../../store/middleware/FetchUser";
import { settingIsAdmin, settingIsEmployee } from "../../../reducers/currentUser";
import { Auth } from "aws-amplify";
import Loading from "../Default/Loading";
import { thunkFetchShiftplansForEmployee } from "../../../store/middleware/FetchShiftplansForEmployee";


const SchichtplanBewerben = (props) => {
  const dispatch = useDispatch();
  const isEmployee = useSelector(state => state.currentUser.userType === "isEmployee");
  const metaStatus = useSelector(state => state.DB.metaStatus);
  const employeeStatus = useSelector(state => state.DB.employeeStatus);
  const plansStatus = useSelector(state => state.DB.plansStatus);
  const location = useLocation();
  useEffect(() => {
    pageViewsTracking();
    dispatch(thunkFetchShiftplansForEmployee());
    dispatch(thunkFetchOrg());
    dispatch(thunkFetchEmployee());
    if(!isEmployee) {
      isLoggedIn()
    }
  },[])


  async function isLoggedIn () {
    let user = await Auth.currentAuthenticatedUser();
    if(user.username === user.attributes["custom:TenantId"]) {
      dispatch(settingIsAdmin())
    }

    if(user.username !== user.attributes["custom:TenantId"]) {
      dispatch(settingIsEmployee())
    }
  }
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

  function ApplicationContent() {
    if( 
      metaStatus !== "fulfilled" ||
      plansStatus !== "fulfilled" ||
      employeeStatus !== "fulfilled"
      )
      {
        return <Loading/>
      }
    return <ApplicationsContainer/>
  }
  return (
    <>
      <div>
        <Container fluid>
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
            <ApplicationContent/>
          <UserFooter />
        </Container>
      </div>
    </>
  );
};

export default SchichtplanBewerben;

