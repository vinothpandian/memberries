import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Content from './Content';

const Notification = ({
  snackbarOpen, message, onClose, variant,
}) => (
  <Snackbar
    open={snackbarOpen}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    autoHideDuration={variant === 'error' ? null : 1000}
  >
    <Content message={message} onClose={onClose} variant={variant} />
  </Snackbar>
);

Notification.propTypes = {
  snackbarOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default Notification;
