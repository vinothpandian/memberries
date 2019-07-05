import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import { Formik } from 'formik';
import { compose } from 'recompose';

import { object, number } from 'yup';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import DifficultyButtons from '../DifficultyButtons/index';
import { Database, withDb } from '../../db';
import { updateTopic } from '../../actions';

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

const schema = object({
  difficulty: number()
    .min(1)
    .max(5)
    .required('Difficulty is required'),
});

const ReviewForm = ({
  db, history, id, initialValues,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        const { difficulty } = values;

        try {
          dispatch(updateTopic({ id, difficulty }));
          // await db.updateTopic(id, difficulty);
          // history.push('/');
        } catch (error) {
          history.push({ pathname: '/error', state: { message: error.message } });
        }
      }}
    >
      {({
        handleSubmit, handleBlur, values, errors, touched, setFieldValue,
      }) => (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={8} className={classes.difficultyButtons}>
              <DifficultyButtons
                name="difficulty"
                size="small"
                label="Review Difficulty"
                value={values.difficulty}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                error={!!errors.difficulty && !!touched.difficulty}
                helperText={errors.difficulty || ''}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            Reviewed
          </Button>
        </form>
      )}
    </Formik>
  );
};

ReviewForm.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  id: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    difficulty: PropTypes.number,
  }).isRequired,
};

export default compose(
  withDb,
  withRouter,
)(ReviewForm);
