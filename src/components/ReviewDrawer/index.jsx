import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'react-router-prop-types';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Database, withDb } from '../../db';
import { updateRetentionForATopic } from '../../utils';

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
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
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

  console.log(id, topic);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.toolbar}>
        <Typography className={classes.toolbarTitle} variant="h6" noWrap color="textSecondary">
          To review
        </Typography>
      </div>
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
