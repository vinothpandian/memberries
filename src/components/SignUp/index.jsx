import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { string, object, ref } from 'yup';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/user';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  submitButton: {
    float: 'right',
    marginTop: theme.spacing(1),
  },
  cancelButton: {
    float: 'right',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  difficultyButtons: {
    marginLeft: theme.spacing(1),
  },
}));

const schema = object({
  email: string()
    .email()
    .required('Email is required'),
  password: string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
      'Password must be at least 6 characters and include one number and one letter',
    )
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Password must match')
    .required('Password confirm is required'),
});

const SignUp = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      onSubmit={async (values) => {
        dispatch(signUp(values));
      }}
    >
      {({
        handleSubmit, handleChange, handleBlur, values, errors, touched,
      }) => (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={7}>
              <TextField
                type="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && !!touched.email}
                margin="normal"
                variant="outlined"
                helperText={errors.email || ''}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && !!touched.password}
                margin="normal"
                variant="outlined"
                helperText={errors.password || ''}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword && !!touched.confirmPassword}
                margin="normal"
                variant="outlined"
                helperText={errors.confirmPassword || ''}
              />
            </Grid>
          </Grid>
          <Button className={classes.submitButton} autoFocus color="primary" type="submit">
            Sign up
          </Button>
          <Button className={classes.cancelButton} onClick={handleClose()} color="secondary">
            Cancel
          </Button>
        </form>
      )}
    </Formik>
  );
};

SignUp.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SignUp;
