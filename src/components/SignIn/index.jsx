import * as React from 'react';

import { Formik } from 'formik';
import { string, object } from 'yup';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  submitButton: {
    float: 'right',
    marginTop: theme.spacing(3),
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

const SignIn = () => {
  const classes = useStyles();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
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
                label="password"
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
        </form>
      )}
    </Formik>
  );
};

export default SignIn;
