import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { string, object } from 'yup';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Firebase, { withFirebase } from '../../contexts/Firebase';

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
  password: string().required('Password is required'),
});

const SignIn = ({ firebase, handleClose }) => {
  const classes = useStyles();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        try {
          await firebase.signInUser(values);
          handleClose({
            dialogOpen: false,
            snackbarOpen: true,
            variant: 'success',
            message: 'Login successful',
          })();
        } catch (error) {
          handleClose({
            dialogOpen: true,
            snackbarOpen: true,
            variant: 'error',
            message: error.message,
          })();
        }
      }}
    >
      {({
        handleSubmit, handleChange, handleBlur, values, errors, touched,
      }) => (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          </Grid>
          <Button className={classes.submitButton} autoFocus color="primary" type="submit">
            Sign in
          </Button>
          <Button className={classes.cancelButton} onClick={handleClose()} color="secondary">
            Cancel
          </Button>
        </form>
      )}
    </Formik>
  );
};

SignIn.propTypes = {
  handleClose: PropTypes.func.isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(SignIn);
