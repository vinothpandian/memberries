import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import { Formik } from 'formik';
import { compose } from 'recompose';

import { string, object, number } from 'yup';

import { useDispatch } from 'react-redux';
import formProps from './formProps';
import Form from './Form';
import { addTopic } from '../../actions';

const schema = object({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  difficulty: number()
    .min(1)
    .max(5)
    .required('Difficulty is required'),
});

const FormikForm = ({ history, initialValues }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          dispatch(addTopic(values));
          history.push('/');
        } catch (error) {
          history.push({ pathname: '/error', state: { message: error.message } });
        }
      }}
    >
      {props => <Form {...props} />}
    </Formik>
  );
};

FormikForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    difficulty: 3,
  },
};

FormikForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  initialValues: formProps,
};

export default compose(withRouter)(FormikForm);
