
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
import Index from "./views/Index.js";
import Dashboard from "./views/MainViews/Admin/Dashboard.js";
import Einstellungen from "./views/MainViews/Admin/Einstellungen";
import SchichtplanVerwalten from "./views/MainViews/Admin/SchichtplanVerwalten";
import MitarbeiterVerwalten from "./views/MainViews/Admin/MitarbeiterVerwalten";
import SchichtplanErstellen from "./views/MainViews/Admin/SchichtplanErstellen";
import SchichtplanBewerben from "./views/MainViews/User/SchichtplanBewerben.js";
import UserProfil from "./views/MainViews/User/UserProfil.js";

var userroutes = [
  {
    path: "/index",
    name: "Übersicht",
    icon: "ni ni-tv-2 text-blue",
    component: Index,
    layout: "/user",
  },
  {
    path: "/profil",
    name: "Profil",
    icon: "ni ni-ni ni-single-02 text-red",
    component: UserProfil,
    layout: "/user",
  },
  {
    path: "/Schichtplan",
    name: "Bewerben",
    icon: "ni ni-calendar-grid-58 text-green",
    component: SchichtplanBewerben,
    layout: "/user",
  },
]
var adminroutes = [
  {
    path: "/index",
    name: "Übersicht",
    icon: "fa fa-home text-light",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/schichtplanerstellen",
    name: "Schichtplan erstellen",
    icon: "ni ni-bullet-list-67 text-light",
    component: SchichtplanErstellen,
    layout: "/admin",
  },
  {
    path: "/schichtplanverwalten",
    name: "Schichtplan verwalten",
    icon: "ni ni-calendar-grid-58 text-light",
    component: SchichtplanVerwalten,
    layout: "/admin",
  },
  {
    path: "/mitarbeiterverwalten",
    name: "Mitarbeiter:innen verwalten",
    icon: "fa fa-users text-light",
    component: MitarbeiterVerwalten,
    layout: "/admin",
  },
  {
    path: "/einstellungen",
    name: "Einstellungen",
    icon: "ni ni-settings text-light",
    component: Einstellungen,
    layout: "/admin",
  }
];

export {adminroutes, userroutes};
