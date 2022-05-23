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
import React from "react";
// reactstrap components
import {
  Container
} from "reactstrap";
import ReactGA from "react-ga"
// core components
import { adminroutes } from "../../../routes.js";
import { Router, useNavigate, useLocation } from "react-router-dom";
import EinstellungenContainer from "../../../components/AdminSettingsContainer"
import AdminNavbar from "../../../components/Navbars/AdminNavbar.js";
import AdminFooter from "../../../components/Footers/AdminFooter"
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { settingIsAdmin, settingIsEmployee } from "../../../reducers/currentUser.js";
import Loading from "../Default/Loading.js";
import { thunkFetchEmployees } from "../../../store/middleware/FetchEmployees.js";
import { thunkFetchOrg } from "../../../store/middleware/FetchOrg.js";
import { thunkFetchShiftplans } from "../../../store/middleware/FetchShiftplans.js";


const Einstellungen = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.currentUser.userType === "isAdmin");
  const metaStatus = useSelector(state => state.DB.metaStatus);
  const employeesStatus = useSelector(state => state.DB.employeesStatus);
  const plansStatus = useSelector(state => state.DB.plansStatus);
  let location = useLocation()

  React.useEffect(() => {
    pageViewsTracking()
    dispatch(thunkFetchEmployees());
    dispatch(thunkFetchOrg());
    dispatch(thunkFetchShiftplans());
    if(!isAdmin) {
      isLoggedIn()
    }
  },[])


  function SettingsContent() {
    if( metaStatus !== "fulfilled" ||
    employeesStatus !== "fulfilled" ||
    plansStatus !== "fulfilled"
    ) {
      return <Loading/>;
    }
    return <EinstellungenContainer/>
  }
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
    const pathname = "/admin";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

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

  if(!isAdmin) {
    return null;
  }
    return (
    <>
      <div>
        <Container fluid>
        <AdminNavbar
          routes={adminroutes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
            imgAlt: "Abbildung des Logos von Staffbite",
          }}
          brandText={getBrandText(location)}
        />
        <SettingsContent/>
          <AdminFooter />
        </Container>
      </div>
      </>
    );
  }
export default Einstellungen;

