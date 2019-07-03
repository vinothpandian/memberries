import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router';
import { FullPageGrid } from '../../components';

const ErrorPage = ({ location }) => (
  <FullPageGrid container direction="column" alignItems="center" justify="center" spacing={0}>
    <Grid item xs={6}>
      <div>
        <Typography variant="h1" align="center">
          404
        </Typography>
        <br />
        <Typography variant="h5" color="textSecondary">
          The page you requested was not found.
        </Typography>
        <span>{location.state && location.state.message}</span>
      </div>
    </Grid>
  </FullPageGrid>
);

ErrorPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(ErrorPage);
