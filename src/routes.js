
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

import AdminDashboard from "./views/MainViews/Admin/Dashboard.js";
import UserDashboard from "./views/MainViews/User/Dashboard.js";
import Einstellungen from "./views/MainViews/Admin/Einstellungen";
import MitarbeiterVerwalten from "./views/MainViews/Admin/MitarbeiterVerwalten";
import Schichtplan from "./views/MainViews/Admin/Schichtplan";
import ApplicationsMainView from "./views/MainViews/User/ShiftplanApplications.js";
import SchichtplanBewerben from "./views/MainViews/User/SchichtplanBewerben.js";
import UserProfil from "./views/MainViews/User/UserProfil.js";
import Login from "./components/Auth/Login.js";
import SignUp from "./components/Auth/signUp.js";
import ForgotPassword from "./components/Auth/ForgotPassword.js";
import { LANGUAGES } from "./constants/Titles.js";
var authroutes = [
  {
    path: "",
    name: "Anmeldung",
    component: <Login/>,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Registrieren",
    component: SignUp,
    layout: "/auth",
  },
  {
    path: "/forgotpassword",
    name: "Passwort",
    component: ForgotPassword,
    layout: "/auth",
  }
]
var userroutes = [
  {
    path: "/index",
    name: LANGUAGES.DE.NAV_DASHBOARD,
    icon: "fas fa-home",
    style: "text-blue",
    component: UserDashboard,
    layout: "/user",
  },
  {
    path: "/bewerben",
    name: LANGUAGES.DE.NAV_APPLICATIONS,
    icon: "fas fa-calendar",
    style: "text-blue",
    component: ApplicationsMainView,
    layout: "/user",
  },
  {
    path: "/schichtplan",
    name: LANGUAGES.DE.NAV_SHIFTPLAN,
    icon: "fas fa-calendar",
    style: "text-blue",
    component: SchichtplanBewerben,
    layout: "/user",
  },
  {
    path: "/profil",
    name: LANGUAGES.DE.NAV_PROFILE,
    icon: "fas fa-user",
    style: "text-blue",
    component: UserProfil,
    layout: "/user",
  }
]
var adminroutes = [
  {
    path: "/index",
    name: LANGUAGES.DE.NAV_DASHBOARD,
    icon: "fas fa-home",
    style: "text-primary",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/schichtplan",
    name: LANGUAGES.DE.NAV_SHIFTPLAN,
    icon: "fas fa-calendar",
    style: "text-primary",
    component: Schichtplan,
    layout: "/admin",
  },
  {
    path: "/mitarbeiter",
    name: LANGUAGES.DE.NAV_EMPLOYEES,
    icon: "fas fa-users",
    style: "text-primary",
    component: MitarbeiterVerwalten,
    layout: "/admin",
  },
  {
    path: "/einstellungen",
    name: "Einstellungen",
    icon: "fas fa-cog",
    style: "text-primary",
    component: Einstellungen,
    layout: "/admin",
  }
];

export {authroutes, adminroutes, userroutes};
