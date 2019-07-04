import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './containers/HomePage';
import ErrorPage from './containers/ErrorPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/review/:id" component={HomePage} />
    <Route path="/add" component={HomePage} />
    <Route path="/error" component={ErrorPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
