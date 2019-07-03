import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import formProps, { errorOrTouchedProps } from './formProps';
import DifficultyButtons from '../DifficultyButtons/index';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  difficultyButtons: {
    marginLeft: theme.spacing(1),
  },
}));

const Form = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  setFieldValue,
}) => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name && !!touched.name}
            margin="normal"
            variant="outlined"
            helperText={errors.name || ''}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="description"
            label="Description"
            multiline
            rows="3"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.description && !!touched.description}
            margin="normal"
            variant="outlined"
            helperText={errors.description || ''}
          />
        </Grid>
        <Grid item xs={8} className={classes.difficultyButtons}>
          <DifficultyButtons
            name="difficulty"
            size="small"
            label="Difficulty"
            value={values.difficulty}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            error={!!errors.difficulty && !!touched.difficulty}
            helperText={errors.difficulty || ''}
          />
        </Grid>
      </Grid>
      <Button className={classes.submitButton} variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

Form.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  values: formProps.isRequired,
  errors: formProps.isRequired,
  touched: errorOrTouchedProps.isRequired,
};

export default Form;
