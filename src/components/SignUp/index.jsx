import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

import SignUpForm from './SignUpForm';
import { BorderedModal } from '../../styled-components';
import customProps from '../../proptypes';

const SignUp = ({ theme, show, onHide }) => (
  <BorderedModal
    theme={theme}
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
    </Modal.Header>

    <SignUpForm onHide={onHide} />
  </BorderedModal>
);

SignUp.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  theme: customProps.theme.isRequired,
};

export default SignUp;
