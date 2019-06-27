import React from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';

import { withRouter } from 'react-router';

const ErrorPage = ({ location }) => (
  <div>
    <p>Page not found! </p>
    <p>{location.state.message}</p>
  </div>
);

ErrorPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(ErrorPage);
