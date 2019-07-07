import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_CANCELLED,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
  CLOSE_NOTIFICATION,
} from '../actions/notifications';

const defaultState = Map({
  open: false,
  message: '',
  variant: 'info',
});

const errorNotification = defaultMessage => (state, action) => state.merge({
  open: true,
  message: action.message || defaultMessage,
  variant: 'error',
});

const warningNotification = defaultMessage => (state, action) => state.merge({
  open: true,
  message: action.message || defaultMessage,
  variant: 'warning',
});

const successNotification = defaultMessage => (state, action) => state.merge({
  open: true,
  message: action.message || defaultMessage,
  variant: 'success',
});

const closeNotification = state => state.merge({
  open: false,
});

export default handleActions(
  {
    [SIGN_IN_ERROR]: errorNotification('Sign in failed'),
    [SIGN_UP_ERROR]: errorNotification('Sign up failed'),
    [SIGN_IN_CANCELLED]: warningNotification('Sign in cancelled'),
    [SIGN_IN_SUCCESS]: successNotification('Sign in successful'),
    [SIGN_UP_SUCCESS]: successNotification('Sign up successful'),
    [SIGN_OUT_SUCCESS]: successNotification('Sign out successful'),
    [CLOSE_NOTIFICATION]: closeNotification,
  },
  defaultState,
);
