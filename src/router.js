import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";

 
export default (
    <BrowserRouter>
      <Route path="/" />
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
      <Route path="/AV" />
    </BrowserRouter>
);