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
import {useNavigate, useLocation } from "react-router-dom";
import SchichtplanContainer from "../../../components/AdminShiftplanContainer.js";
import AdminNavbar from "../../../components/Navbars/AdminNavbar.js";
import AdminFooter from "../../../components/Footers/AdminFooter"


const SchichtplanErstellen = () => {
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
          <SchichtplanContainer></SchichtplanContainer>
          <AdminFooter />
        </Container>
      </div>
    );
  }
export default SchichtplanErstellen;

