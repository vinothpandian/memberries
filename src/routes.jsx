import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './containers/HomePage';
import TopicPage from './containers/TopicPage';
import ErrorPage from './containers/ErrorPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/error" component={ErrorPage} />
    <Route path="/:id" component={TopicPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
