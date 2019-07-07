import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { string, object } from 'yup';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { signIn } from '../../actions/user';

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

const SignIn = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        dispatch(signIn(values));
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
};

export default SignIn;
