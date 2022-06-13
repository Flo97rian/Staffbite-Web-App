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
  Button,
  Col,
  Container,
  Row
} from "reactstrap";
import ReactGA from "react-ga"
// core components
import { adminroutes } from "../../../routes.js";
import {useNavigate, useLocation } from "react-router-dom";
import SchichtplanContainer from "../../../components/AdminShiftplanContainer.js";
import AdminNavbar from "../../../components/Navbars/AdminNavbar.js";
import AdminFooter from "../../../components/Footers/AdminFooter"
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { settingIsAdmin, settingIsEmployee } from "../../../reducers/currentUser.js";
import Loading from "../Default/Loading.js";
import { thunkFetchOrg } from "../../../store/middleware/FetchOrg.js";
import { thunkFetchEmployees } from "../../../store/middleware/FetchEmployees.js";
import { thunkFetchShiftplans } from "../../../store/middleware/FetchShiftplans.js";
import { settingBasicLayout, settingCalendarLayout, switchToBasicLayout, switchToCalendarLayout } from "../../../reducers/display.js";
import AdminCalendarContainer from "../../../components/AdminCalendarContainer.js";


const SchichtplanErstellen = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.currentUser.userType === "isAdmin");
  const metaStatus = useSelector(state => state.DB.metaStatus);
  const employeesStatus = useSelector(state => state.DB.employeesStatus);
  const plansStatus = useSelector(state => state.DB.plansStatus);
  const DisplayBasicLayout = useSelector(state => state.display.displayBasicLayout);
  const DisplayCalendarLayout = useSelector(state => state.display.displayCalendarLayout);
  const navigate = useNavigate()
  let location = useLocation()

  React.useEffect(() => {
    pageViewsTracking()
    dispatch(thunkFetchOrg());
    dispatch(thunkFetchEmployees());
    dispatch(thunkFetchShiftplans());
    if(!isAdmin) {
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

  function ShiftplanContent() {
    if( metaStatus !== "fulfilled" ||
    employeesStatus !== "fulfilled" ||
    plansStatus !== "fulfilled"
    ) {
      return <Loading/>;
    }
    return <SelectLayout/>
    
  }

  function SelectLayout() {
    dispatch(settingCalendarLayout());

    if(DisplayBasicLayout) {
      return <SchichtplanContainer/>
    }

    if(DisplayCalendarLayout) {
      return <AdminCalendarContainer/>
    }

    return null;
  }
  function pageViewsTracking () {
    const pathname = "/admin";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

  const ViewButton = () => {

    return null;
    
    if(DisplayBasicLayout) {
      return <Button color="primary" onClick={() => dispatch(switchToCalendarLayout())}>Kalender-Ansicht</Button>
    }

    if(DisplayCalendarLayout) {
      return <Button color="primary" onClick={() => dispatch(switchToBasicLayout())}>Standard-Ansicht</Button>
    }
    
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
          <Row className="text-center mt-8">
            <Col>
              <ViewButton/>
            </Col>
          </Row>
          <ShiftplanContent/>
          <AdminFooter />
        </Container>
      </div>
    );
  }
export default SchichtplanErstellen;

