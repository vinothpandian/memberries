import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import HomePage from './containers/HomePage';
import ErrorPage from './containers/ErrorPage';

import { FETCH_USER_ASYNC } from './actions/user';

const Routes = () => {
  const dispatch = useDispatch();

  dispatch({ type: FETCH_USER_ASYNC });

  return (
    <Switch>
      <Route path="/review/:id" component={HomePage} />
      <Route path="/add" component={HomePage} />
      <Route path="/" component={HomePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
