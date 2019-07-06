import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SyncIcon from '@material-ui/icons/Sync';

import { PropTypes } from 'prop-types';
import { List } from 'immutable';
import TopicList from '../TopicList';
import AddButton from '../AddButton';
import Sync from '../Sync';

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
  syncButton: {
    marginRight: theme.spacing(2),
  },
  toolbarTitle: {
    marginLeft: theme.spacing(2),
  },
}));

const TopicDrawer = ({ topics }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDialog = state => () => {
    setOpen(state);
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
      <Grid container justify="space-between" alignItems="center" className={classes.toolbar}>
        <Typography className={classes.toolbarTitle} variant="h6" color="textSecondary">
          To review
        </Typography>
        <IconButton
          onClick={handleDialog(true)}
          className={classes.syncButton}
          edge="start"
          aria-label="sync"
        >
          <SyncIcon />
        </IconButton>
        <Sync open={open} handleClose={handleDialog(false)} />
      </Grid>
      {topics.isEmpty() ? (
        <Typography className={classes.toolbarTitle} variant="body2" noWrap color="textSecondary">
          Add topics to see retention
        </Typography>
      ) : (
        <TopicList topics={topics} />
      )}
      <AddButton />
    </Drawer>
  );
};

TopicDrawer.propTypes = {
  topics: PropTypes.instanceOf(List).isRequired,
};

export default TopicDrawer;
