import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "./assets/vendor/font-awesome/css/font-awesome.css"
import "react-notification-alert/dist/animate.css";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
// plugins styles downloaded
import "./assets/vendor/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "./assets/css/argon-dashboard-pro-react.css";
import "./assets/css/argon-dashboard-pro-react.min.css";
import "./assets/css/argon-dashboard-pro-react.css.map";
import "./assets/scss/argon-dashboard-pro-react.scss";
import RouteChangeTracker from "./analytics/AnalyticsRouter"
import AuthLayout from "./layouts/Auth.js";
import Landing from "./views/MainViews/Landing.js";
import reportWebVitals from './reportWebVitals';
import SignUp from "./components/Auth/signUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Shiftplan from "./views/MainViews/Shiftplan";
import Contact from "./views/MainViews/Contact";
import AboutUs from "./views/MainViews/AboutUs";
import AV from "./views/MainViews/AV";
import Pricing from './views/MainViews/Pricing';
import Impressum from "./views/MainViews/Impressum"
import Gastronomie from "./views/MainViews/sub/Gastronomie";
import FAQ from "./views/MainViews/FAQ";
import Themen from './views/MainViews/Themen';
import CloudService from './views/MainViews/Themen/CloudService';
import AdminDashboard from './views/MainViews/Admin/Dashboard';
import MitarbeiterVerwalten from './views/MainViews/Admin/MitarbeiterVerwalten';
import Einstellungen from './views/MainViews/Admin/Einstellungen';
import Schichtplan from "./views/MainViews/Admin/Schichtplan"
import UserDashboard from './views/MainViews/User/Dashboard';
import SchichtplanBewerben from './views/MainViews/User/SchichtplanBewerben';
import UserProfil from './views/MainViews/User/UserProfil';
import ApplicationsMainView from './views/MainViews/User/ShiftplanApplications';
import Automatisierung from './views/MainViews/Themen/Automatisierung';
import Schichtplanerstellen from './views/MainViews/Themen/Schichtplanerstellen';
import Schichtplanvorlage from './views/MainViews/Themen/Schichtplanvorlage';

const TRACKING_ID = "UA-213490643-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/admin"/>
          <Route path="/admin/index" element={<AdminDashboard />} />
          <Route path="/admin/schichtplan" element={<Schichtplan />} />
          <Route path="/admin/mitarbeiter" element={<MitarbeiterVerwalten />} />
          <Route path="/admin/einstellungen" element={<Einstellungen />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/av" element={<AV/>} />
        <Route path="/impressum" element={<Impressum/>} />
        <Route path="/schichtplan" element={<Shiftplan />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/themen/automatisierung" element={<Automatisierung />} />
        <Route path="/themen/cloudservice" element={<CloudService />} />
        <Route path="/themen/schichtplanerstellen" element={<Schichtplanerstellen />} />
        <Route path="/themen/schichtplanvorlage" element={<Schichtplanvorlage />} />
        <Route path="/themen" element={<Themen />} />
        <Route path="/schichtplan/gastronomie" element={<Gastronomie />} />
        <Route path="/pricing" element={ <Pricing  />} />
        <Route path="/contact" element={ <Contact />} />
        <Route path="/auth" element={ <AuthLayout />} />
        <Route path="/user"/>
        <Route path="/user/index" element={<UserDashboard/>}/>
        <Route path="/user/bewerben" element={<SchichtplanBewerben/>}/>
        <Route path="/user/schichtplan" element={<ApplicationsMainView/>}/>
        <Route path="/user/profil" element={<UserProfil/>}/>
      </Routes>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
