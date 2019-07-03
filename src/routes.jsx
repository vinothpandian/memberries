import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './containers/HomePage';
import ErrorPage from './containers/ErrorPage';
import TopicPage from './containers/TopicPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/add" component={HomePage} />
    <Route path="/review/:id" component={TopicPage} />
    <Route path="/error" component={ErrorPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
