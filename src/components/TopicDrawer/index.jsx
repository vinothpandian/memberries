import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitIcon from '@material-ui/icons/ExitToApp';

import { PropTypes } from 'prop-types';
import { List } from 'immutable';
import { compose } from 'recompose';
import TopicList from '../TopicList';
import AddButton from '../AddButton';
import Sync from '../Sync';
import withAuthUser from '../../contexts/Session/AuthUserConsumer';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import Snackbar from '../Snackbar';

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

const TopicDrawer = ({ topics, user, firebase }) => {
  const defaultSnackbarProps = {
    snackbarOpen: false,
    variant: 'info',
    message: '',
  };

  const [snackbarProps, setSnackbarProps] = React.useState(defaultSnackbarProps);

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDialog = state => stateProps => () => {
    if (!stateProps) {
      setOpen(state);
      return;
    }

    const {
      dialogOpen, snackbarOpen, variant, message,
    } = stateProps;

    setOpen(dialogOpen);
    setSnackbarProps({ snackbarOpen, variant, message });
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
        {user ? (
          <IconButton
            onClick={() => {
              setOpen(false);
              setSnackbarProps({
                snackbarOpen: true,
                variant: 'warning',
                message: 'User signed out',
              });
              firebase.signOutUser();
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
              onClick={handleDialog(true)()}
              className={classes.syncButton}
              edge="start"
              aria-label="sync"
            >
              <AccountIcon />
            </IconButton>
            <Sync open={open} handleClose={handleDialog(false)} />
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
      <Snackbar
        {...snackbarProps}
        onClose={() => {
          setSnackbarProps({
            ...snackbarProps,
            snackbarOpen: false,
          });
        }}
      />
    </Drawer>
  );
};

TopicDrawer.defaultProps = {
  user: '',
};

TopicDrawer.propTypes = {
  user: PropTypes.string,
  topics: PropTypes.instanceOf(List).isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default compose(
  withFirebase,
  withAuthUser('uid'),
)(TopicDrawer);
