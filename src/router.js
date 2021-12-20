import React from 'react';
import { BrowserRouter, Route, Router, Routes, Switch } from "react-router-dom";
import SignUp from "./components/Auth/signUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Shiftplan from "./views/MainViews/Shiftplan";
import Contact from "./views/MainViews/Contact";
import AboutUs from "./views/MainViews/AboutUs";
import Pricing from './views/MainViews/Pricing';
import Impressum from "./views/MainViews/Impressum"
import Gastronomie from "./views/MainViews/sub/Gastronomie";
import FAQ from "./views/MainViews/FAQ";
import Themen from './views/MainViews/Themen';
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import UserLayout from "./layouts/User.js";
import Landing from "./views/MainViews/Landing.js";
import CloudService from './views/MainViews/Themen/CloudService';
 
export default (
    <BrowserRouter>
      <Route path="/" />
      <Route path="/signup" />
      <Route path="/forgotpassword" />
      <Route path="/admin" />
      <Route path="/aboutus" />
      <Route path="/impressum" />
      <Route path="/schichtplan" />
      <Route path="/faq" />
      <Route path="/themen/cloudservice" />
      <Route path="/themen" />
      <Route path="/schichtplan/gastronomie" />
      <Route path="/pricing" />
      <Route path="/contact" />
      <Route path="/auth" />
      <Route path="/user" />
    </BrowserRouter>
);