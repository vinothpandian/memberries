import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: theme.spacing(2),
  },
}));

const CloseButton = ({ to }) => {
  const classes = useStyles();

  const AdapterLink = React.forwardRef((props, ref) => <Link ref={ref} {...props} />);

  return (
    <IconButton
      aria-label="Delete"
      className={classes.margin}
      component={AdapterLink}
      to={to}
      size="small"
    >
      <CloseOutlinedIcon fontSize="inherit" />
    </IconButton>
  );
};

CloseButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default CloseButton;
