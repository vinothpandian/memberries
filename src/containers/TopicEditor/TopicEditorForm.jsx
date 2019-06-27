import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';

import { Formik } from 'formik';
import { compose } from 'recompose';

import { string, object, number } from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Database, { withDb } from '../../db';

const schema = object({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  difficulty: number()
    .min(1)
    .max(5)
    .required('Difficulty is required'),
});

const TopicEditorForm = ({ db, history }) => (
  <Formik
    validationSchema={schema}
    initialValues={{ name: '', description: '', difficulty: 5 }}
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
    {({
      handleSubmit, handleChange, handleBlur, values, errors, touched,
    }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} xs="8">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.name && !!touched.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Col xs="12" />
          <Form.Group as={Col} xs="8" controlId="validationFormik02">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.description && !!touched.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Col xs="12" />
          <Form.Group as={Col} xs="8" controlId="validationFormik03">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type="number"
              name="difficulty"
              min="1"
              max="5"
              value={values.difficulty}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.difficulty && !!touched.difficulty}
            />
            <Form.Control.Feedback type="invalid">{errors.difficulty}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Button type="submit">Submit</Button>
      </Form>
    )}
  </Formik>
);

TopicEditorForm.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withDb,
  withRouter,
)(TopicEditorForm);
