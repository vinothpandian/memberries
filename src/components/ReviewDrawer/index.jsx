import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'react-router-prop-types';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import Divider from '@material-ui/core/Divider';
import { Database, withDb } from '../../db';
import { updateRetentionForATopic, fetchLastReview } from '../../utils';
import DifficultyButtons from '../DifficultyButtons/index';
import LastReviewedGrid from './LastReviewedGrid';
import RetentionGrid from './RetentionGrid';
import DrawerToolbar from './DrawerToolbar';

const drawerWidth = 360;
const reviewDrawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
      <Grid container />
    </Drawer>
  );
};

ReviewDrawer.defaultProps = {
  match: {
    params: {
      id: 'cYr6DEOpz',
    },
  },
};

ReviewDrawer.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default compose(withDb)(ReviewDrawer);
