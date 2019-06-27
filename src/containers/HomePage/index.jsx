import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Graph from '../Graph';
import TopicList from '../TopicList';

import Database, { withDb } from '../../db';

const HomePage = ({ db }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      setTopics(data);
    }
    fetchAll();
  }, [db]);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <Graph topics={topics} />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <Button as={Link} className="mb-4" to="/add" block>
            Add
          </Button>
          <TopicList topics={topics} />
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
};

export default withDb(HomePage);
