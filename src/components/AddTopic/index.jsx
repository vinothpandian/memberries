import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import FormikForm from './FormikForm';
import CloseButton from '../CloseButton/index';

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

const AddTopic = () => {
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
        <Grid container justify="space-between" alignItems="baseline">
          <Typography className={classes.toolbarTitle} variant="h6" noWrap color="textSecondary">
            What did you learn?
          </Typography>
          <CloseButton to="/" />
        </Grid>
      </div>
      <FormikForm />
    </Drawer>
  );
};

export default AddTopic;
