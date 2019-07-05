import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

import { Map } from 'immutable';
import LastReviewedGrid from './LastReviewedGrid';
import RetentionGrid from './RetentionGrid';
import DrawerToolbar from './DrawerToolbar';
import ReviewForm from './ReviewForm';

const drawerWidth = 360;
const reviewDrawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: reviewDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: reviewDrawerWidth,
    marginRight: drawerWidth,
    overflowX: 'hidden',
  },
}));

const ReviewDrawer = ({ topic }) => {
  const classes = useStyles();

  const id = topic.get('id');
  const name = topic.get('name');
  const description = topic.get('description');
  const lastReviewed = topic.get('lastReviewed');
  const retention = topic.get('retention');
  const difficulty = topic.get('difficulty');

  const initialValues = {
    difficulty,
  };

  if (!topic) return null;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <DrawerToolbar name={name} description={description} />
      <Divider variant="middle" />
      <RetentionGrid retention={retention} />
      <Divider variant="middle" />
      <LastReviewedGrid lastReviewed={lastReviewed} />
      <Divider variant="middle" />
      <ReviewForm id={id} initialValues={initialValues} />
    </Drawer>
  );
};

ReviewDrawer.propTypes = {
  topic: PropTypes.instanceOf(Map).isRequired,
};

export default ReviewDrawer;
