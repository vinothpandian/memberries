import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import Divider from '@material-ui/core/Divider';
import { Database, withDb } from '../../db';
import { updateRetentionForATopic } from '../../utils';

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
  },
}));

const ReviewDrawer = (props) => {
  const { db, match } = props;
  const [topic, setTopic] = useState({});

  const { id } = match.params;
  const classes = useStyles();

  useEffect(() => {
    async function fetchTopic(topicID) {
      const fetchedTopic = await db.getTopic(topicID);
      if (fetchedTopic) {
        const TopicwithRetention = updateRetentionForATopic(fetchedTopic);
        setTopic(TopicwithRetention);
      }
    }

    fetchTopic(id);

    return () => {};
  }, [db, id]);

  const {
    name, description, lastReviewed, retention, difficulty,
  } = topic;

  const initialValues = {
    difficulty,
  };

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
  db: PropTypes.instanceOf(Database).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default compose(
  withDb,
  withRouter,
)(ReviewDrawer);
