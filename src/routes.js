
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
    icon: "fas fa-home",
    style: "text-blue",
    component: UserDashboard,
    layout: "/user",
  },
  {
    path: "/Schichtplan",
    name: "Schichtplan",
    icon: "fas fa-calendar",
    style: "text-blue",
    component: SchichtplanBewerben,
    layout: "/user",
  },
  {
    path: "/profil",
    name: "Profil",
    icon: "fas fa-user",
    style: "text-blue",
    component: UserProfil,
    layout: "/user",
  }
]
var adminroutes = [
  {
    path: "/index",
    name: "Übersicht",
    icon: "fas fa-home",
    style: "text-primary",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/schichtplan",
    name: "Schichtplan",
    icon: "fas fa-calendar",
    style: "text-primary",
    component: Schichtplan,
    layout: "/admin",
  },
  {
    path: "/mitarbeiterverwalten",
    name: "Mitarbeiter",
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
