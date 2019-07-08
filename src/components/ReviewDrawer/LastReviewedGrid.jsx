import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { List } from 'immutable';
import { findRecentReview } from '../../utils/date';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(2),
  },
}));

const LastReviewedGrid = ({ lastReviewed }) => {
  const classes = useStyles();

  const lastReview = findRecentReview(lastReviewed, { asMoment: true });

  return (
    <Grid className={classes.grid} container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          Last reviewed
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="overline">{lastReviewed ? lastReview.fromNow() : ''}</Typography>
        <Typography variant="h5">{lastReviewed ? lastReview.format('MMM Do YYYY') : ''}</Typography>
      </Grid>
    </Grid>
  );
};

LastReviewedGrid.propTypes = {
  lastReviewed: PropTypes.instanceOf(List).isRequired,
};

export default LastReviewedGrid;
