import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Graph from '../Graph';
import TopicList from '../TopicList';
import TopicEditor from '../TopicEditor';
import Database, { withDb } from '../../db';

const Home = ({ db }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      setTopics(data);
    }
    fetchAll();
  }, [db]);

  return (
    <Container>
      <Row>
        <Col xs="8">
          <Graph topics={topics} />
        </Col>
        <Col xs="4">
          <TopicList topics={topics} />
        </Col>
      </Row>
    </Container>
  );
};

Home.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
};

export default withDb(Home);
