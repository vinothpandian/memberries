import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { withRouter } from 'react-router';

const ErrorPage = ({ location }) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
    <div className="inline-block align-middle">
      <h2 className="font-weight-normal lead" id="desc">
        The page you requested was not found.
      </h2>
      <span>{location.state && location.state.message}</span>
    </div>
  </div>
);

ErrorPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(ErrorPage);
