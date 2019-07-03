import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import { Formik } from 'formik';
import { compose } from 'recompose';

import { string, object, number } from 'yup';

import { withDb, Database } from '../../db';
import formProps from './formProps';
import Form from './Form';

const schema = object({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  difficulty: number()
    .min(1)
    .max(5)
    .required('Difficulty is required'),
});

const FormikForm = ({ db, history, initialValues }) => (
  <Formik
    validationSchema={schema}
    initialValues={initialValues}
    onSubmit={async (values) => {
      const { name, description, difficulty } = values;

      try {
        await db.pushTopic(name, description, difficulty);
        history.push('/');
      } catch (error) {
        history.push({ pathname: '/error', state: { message: error.message } });
      }
    }}
  >
    {props => <Form {...props} />}
  </Formik>
);

FormikForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    difficulty: 3,
  },
};

FormikForm.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  initialValues: formProps,
};

export default compose(
  withDb,
  withRouter,
)(FormikForm);
