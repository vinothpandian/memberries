import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { MultiTopicGraph } from '../../components/Graph';
import TopicList from '../TopicList';

import Database, { withDb } from '../../db';
import { getColoredTopics, getGraphData } from '../../utils/chart';
import { updateRetention } from '../../utils';

const HomePage = ({ db }) => {
  const [topics, setTopics] = useState([]);
  const [chosenTopics, setChosenTopics] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      const withRetention = updateRetention(data);
      const chosenData = getColoredTopics(withRetention.slice(0, 7));
      setChosenTopics(chosenData);
      setTopics(withRetention.slice(7));
    }
    fetchAll();
  }, [db]);

  const graphData = getGraphData(chosenTopics);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <MultiTopicGraph topics={chosenTopics} graphData={graphData} />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <Button as={Link} className="mb-4" to="/add" block>
            Add
          </Button>
          <TopicList topics={[...chosenTopics, ...topics]} />
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
};

export default withDb(HomePage);
