import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { PropTypes } from 'prop-types';
import { List } from 'immutable';
import TopicList from '../TopicList';
import AddButton from '../AddButton';
import Sync from '../Sync';

import { signOut } from '../../actions/user';
import { DIALOG_CLOSE, DIALOG_OPEN } from '../../actions/dialog';

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
  const user = useSelector(state => state.user.get('uid'), shallowEqual);
  const open = useSelector(state => state.dialog.get('open'), shallowEqual);

  const dispatch = useDispatch();

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
      <Grid container justify="space-between" alignItems="center" className={classes.toolbar}>
        <Typography className={classes.toolbarTitle} variant="h6" color="textSecondary">
          To review
        </Typography>
        {user ? (
          <IconButton
            onClick={() => {
              dispatch(signOut());
            }}
            className={classes.syncButton}
            edge="start"
            aria-label="sync"
          >
            <ExitIcon />
          </IconButton>
        ) : (
          <React.Fragment>
            <IconButton
              onClick={() => {
                dispatch({ type: DIALOG_OPEN });
              }}
              className={classes.syncButton}
              edge="start"
              aria-label="sync"
            >
              <AccountIcon />
            </IconButton>
            <Sync
              open={open}
              handleClose={() => {
                dispatch({ type: DIALOG_CLOSE });
              }}
            />
          </React.Fragment>
        )}
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
