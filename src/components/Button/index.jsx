import React from 'react';
import PropTypes from 'prop-types';

import { default as MButton } from '@material-ui/core/Button';

const Button = ({
  children, variant, color, onClick, fullWidth,
}) => (
  <MButton variant={variant} color={color} fullWidth={fullWidth} onClick={onClick}>
    {children}
  </MButton>
);

Button.defaultProps = {
  fullWidth: false,
};

Button.propTypes = {
  fullWidth: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
