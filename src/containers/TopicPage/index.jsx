import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { withDb, Database } from '../../db';
import { DefaultGraph } from '../../components/Graph';
import TopicInformation from './TopicInformation';

const TopicPage = ({ history, match, db }) => {
  const { id } = match.params;
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await db.getTopic(id);

        setTopic(data);
      } catch (error) {
        history.push({
          pathname: '/error',
          state: { message: error.message },
        });
      }
    }

    fetchAll();
  }, [id, history, db]);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <DefaultGraph />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <TopicInformation topic={topic} />
        </Col>
      </Row>
    </Container>
  );
};

TopicPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  db: PropTypes.instanceOf(Database).isRequired,
};

export default compose(
  withRouter,
  withDb,
)(TopicPage);
