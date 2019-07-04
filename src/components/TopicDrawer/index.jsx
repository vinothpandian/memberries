import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TopicList from '../TopicList';
import AddButton from '../AddButton';
import { DbProps } from '../../db';

const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

const TopicDrawer = ({ topics }) => {
  const classes = useStyles();

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
      <TopicList topics={topics} />
      <AddButton />
    </Drawer>
  );
};

TopicDrawer.propTypes = {
  topics: DbProps.topics.isRequired,
};

export default TopicDrawer;
