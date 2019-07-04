import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  avatar: {
    background: props => props.color,
  },
});

const ColorAvatar = ({ color }) => {
  const classes = useStyles({ color });
  return <Avatar className={classes.avatar} />;
};

ColorAvatar.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorAvatar;
