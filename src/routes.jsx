import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './containers/HomePage';
import TopicPage from './containers/TopicPage';
import ErrorPage from './containers/ErrorPage';
import TopicEditor from './containers/TopicEditor';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/add" component={TopicEditor} />
    <Route path="/review/:id" component={TopicPage} />
    <Route path="/error" component={ErrorPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
