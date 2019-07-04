import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import DrawerToolbar from './DrawerToolbar';

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
    </Drawer>
  );
};

export default OverviewDrawer;
