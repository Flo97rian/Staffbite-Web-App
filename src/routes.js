
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
import SchichtplanVerwalten from "./views/MainViews/SchichtplanVerwalten";
import MitarbeiterVerwalten from "./views/MainViews/MitarbeiterVerwalten";
import SchichtplanErstellen from "./views/MainViews/SchichtplanErstellen";
import Profil from "./views/MainViews/Profil";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/profil",
    name: "Profil",
    icon: "ni ni-tv-2 text-primary",
    component: Profil,
    layout: "/admin",
  },
  {
    path: "/schichtplanerstellen",
    name: "Schichtplan erstellen",
    icon: "ni ni-planet text-blue",
    component: SchichtplanErstellen,
    layout: "/admin",
  },
  {
    path: "/schichtplanverwalten",
    name: "Schichtplan verwalten",
    icon: "ni ni-pin-3 text-orange",
    component: SchichtplanVerwalten,
    layout: "/admin",
  },
  {
    path: "/mitarbeiterverwalten",
    name: "Mitarbeiter:innen verwalten",
    icon: "ni ni-bullet-list-67 text-red",
    component: MitarbeiterVerwalten,
    layout: "/admin",
  }
];
export default routes;
