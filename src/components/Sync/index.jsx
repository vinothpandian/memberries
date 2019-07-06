import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const Sync = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <DialogContent>
        {value === 1 ? <SignUp handleClose={handleClose} /> : <SignIn handleClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

Sync.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(Sync);
