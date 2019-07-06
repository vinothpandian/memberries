import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import SignIn from '../SignIn';

const Sync = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Sign In to sync your data</DialogTitle>
      <DialogContent>
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

Sync.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(Sync);
