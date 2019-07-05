import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { deleteTopic } from '../../actions/index';

const Warning = ({
  id, open, handleClose, name, retention,
}) => {
  const dispatch = useDispatch();

  const deleteClicked = () => {
    dispatch(deleteTopic({ id }));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete a topic</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {'Do you really want to delete the topic '}
          <strong>{name}</strong>
          {'.'}
          {retention !== 0 ? `You still remember it ${retention}%` : 'You can still relearn this'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteClicked} color="secondary">
          Delete
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Warning.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  retention: PropTypes.number.isRequired,
};

export default Warning;
