import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  name: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

const DrawerToolbar = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Typography className={classes.name} variant="h5">
        {name}
      </Typography>
    </div>
  );
};

DrawerToolbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DrawerToolbar;
