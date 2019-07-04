import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import isEmpty from 'lodash/isEmpty';
import { DbProps } from '../../db';

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

  const {
    id, name, description, lastReviewed, retention, difficulty,
  } = topic;

  const initialValues = {
    difficulty,
  };

  if (isEmpty(topic)) return null;

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
  topic: DbProps.topic.isRequired,
};

export default ReviewDrawer;
