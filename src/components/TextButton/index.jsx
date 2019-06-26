import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const TextButton = ({
  placement, variant, onClick, children,
}) => (
  <Button placement={placement} variant={variant} onClick={onClick}>
    {children}
  </Button>
);

TextButton.propTypes = {
  placement: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
