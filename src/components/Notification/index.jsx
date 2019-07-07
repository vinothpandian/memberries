import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import Content from './Content';
import { CLOSE_NOTIFICATION } from '../../actions/notifications';

const Notification = () => {
  const states = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const open = states.get('open');
  const message = states.get('message');
  const variant = states.get('variant');

  const onClose = () => {
    dispatch({ type: CLOSE_NOTIFICATION });
  };

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={variant === 'error' ? null : 1500}
    >
      <Content message={message} onClose={onClose} variant={variant} />
    </Snackbar>
  );
};

export default Notification;
