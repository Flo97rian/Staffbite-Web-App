import React from 'react';
import { Route } from 'react-router';
 
export default (
    <Route>
        <Route path='/' />
        <Route path='/signup' />
        <Route path='/forgotpassword' />
        <Route path='/admin' />
        <Route path='/aboutus' />
        <Route path='/impressum' />
        <Route path='/impressum/*' />
        <Route path='/schichtplan' />
        <Route path='/schichtplan/*' />
        <Route path='/faq' />
        <Route path='/pricing' />
        <Route path='/schichtplan/gastronomie' />
        <Route path='/auth' />
        <Route path='/user' />
    </Route>
);