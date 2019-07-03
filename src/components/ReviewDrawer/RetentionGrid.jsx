import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(2),
  },
}));

const RetentionGrid = ({ retention }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          Retention
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">{`${retention}%`}</Typography>
      </Grid>
    </Grid>
  );
};

RetentionGrid.propTypes = {
  retention: PropTypes.number.isRequired,
};

export default RetentionGrid;
