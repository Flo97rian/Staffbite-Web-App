import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "./assets/vendor/font-awesome/css/font-awesome.css"
import "react-notification-alert/dist/animate.css";
import RouteChangeTracker from "./analytics/AnalyticsRouter"

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import UserLayout from "./layouts/User.js";
import Landing from "./views/MainViews/Landing.js";
import reportWebVitals from './reportWebVitals';
import SignUp from "./components/Auth/signUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Shiftplan from "./views/MainViews/Shiftplan";
import Contact from "./views/MainViews/Contact";
import AboutUs from "./views/MainViews/AboutUs";
import Pricing from './views/MainViews/Pricing';
import Impressum from "./views/MainViews/Impressum"
import Gastronomie from "./views/MainViews/sub/Gastronomie";
import FAQ from "./views/MainViews/FAQ";

const TRACKING_ID = "UA-213490643-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
const onUpdate = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={onUpdate}>
    <RouteChangeTracker />
    <Switch>
      <Route path="/" exact render={props => <Landing {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/forgotpassword" render={(props) => <ForgotPassword {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/aboutus" render={(props) => <AboutUs {...props} />} />
      <Route path="/impressum" render={(props) => <Impressum {...props} />} />
      <Route path="/shiftplan" render={(props) => <Shiftplan {...props} />} />
      <Route path="/faq" render={(props) => <FAQ {...props} />} />
      <Route path="/schichtplan/gastronomie" render={(props) => <Gastronomie {...props} />} />
      <Route path="/pricing" render={(props) => <Pricing {...props} />} />
      <Route path="/contact" render={(props) => <Contact {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/user" render={(props) => <UserLayout {...props} />} />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
