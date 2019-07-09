import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
  description: {
    padding: theme.spacing(2),
  },
}));

const OverviewDrawer = () => {
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
      <DrawerToolbar name="Overview" description="" />
      <Divider variant="middle" />
      <Typography className={classes.description} variant="body2" color="textSecondary">
        Spaced repetition is an evidence-based learning technique that incorporates increasing
        intervals of time between subsequent review of previously learned material in order to
        exploit the psychological spacing effect.
      </Typography>
      <Divider variant="middle" />
      <Typography className={classes.description} variant="body2" color="textSecondary">
        You can use this tool without registering for an account. However, once you sign up for an
        account it moves all the topics that you learnt to your online account and secures it.
      </Typography>
    </Drawer>
  );
};

export default OverviewDrawer;
