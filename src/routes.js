
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
import SchichtplanContainerTest from "./components/Admin/test/SchichtplanContainerTest"
import Schichtplan from "./views/MainViews/Admin/Schichtplan";
import SchichtplanBewerben from "./views/MainViews/User/SchichtplanBewerben.js";
import UserProfil from "./views/MainViews/User/UserProfil.js";
import Login from "./components/Auth/Login.js";
import SignUp from "./components/Auth/SignUp.js";
var authroutes = [
  {
    path: "",
    name: "Anmeldung",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Registrieren",
    component: SignUp,
    layout: "/auth",
  }
]
var userroutes = [
  {
    path: "/index",
    name: "Übersicht",
    icon: "ni ni-tv-2",
    style: "text-blue",
    component: UserDashboard,
    layout: "/user",
  },
  {
    path: "/profil",
    name: "Profil",
    icon: "ni ni-ni ni-single-02",
    style: "text-blue",
    component: UserProfil,
    layout: "/user",
  },
  {
    path: "/Schichtplan",
    name: "Bewerben",
    icon: "ni ni-calendar-grid-58",
    style: "text-blue",
    component: SchichtplanBewerben,
    layout: "/user",
  },
]
var adminroutes = [
  {
    path: "/index",
    name: "Übersicht",
    icon: "fa fa-home",
    style: "text-primary",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/schichtplan",
    name: "Schichtplan",
    icon: "ni ni-calendar-grid-58",
    style: "text-primary",
    component: Schichtplan,
    layout: "/admin",
  },
  {
    path: "/mitarbeiterverwalten",
    name: "Mitarbeiter",
    icon: "fa fa-users",
    style: "text-primary",
    component: MitarbeiterVerwalten,
    layout: "/admin",
  },
  {
    path: "/einstellungen",
    name: "Einstellungen",
    icon: "ni ni-settings",
    style: "text-primary",
    component: Einstellungen,
    layout: "/admin",
  },
  //{
    //path: "/test",
    //name: "Test",
    //icon: "ni ni-settings",
    //style: "text-blue",
    //component: SchichtplanContainerTest,
    //layout: "/admin",
  //}
];

export {authroutes, adminroutes, userroutes};
