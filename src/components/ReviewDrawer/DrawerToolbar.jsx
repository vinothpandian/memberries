import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  name: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  description: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
}));

const DrawerToolbar = ({ name, description }) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Typography className={classes.name} variant="h5">
        {name}
      </Typography>
      <Typography
        className={classes.description}
        variant="body2"
        align="justify"
        color="textSecondary"
      >
        {description}
      </Typography>
    </div>
  );
};

DrawerToolbar.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DrawerToolbar;
