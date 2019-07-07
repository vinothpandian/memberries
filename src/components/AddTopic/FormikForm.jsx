import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import { Formik } from 'formik';

import { string, object, number } from 'yup';

import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import formProps from './formProps';
import Form from './Form';
import { addTopic } from '../../actions/topics';

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
          const id = shortid.generate();
          const payload = { ...values, id };
          dispatch(addTopic(payload));
          history.push(`/review/${id}`);
        } catch (error) {
          history.replace({ pathname: '/error', state: { message: error.message } });
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

export default withRouter(FormikForm);
