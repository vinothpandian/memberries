import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { compose } from 'recompose';
import { MultiTopicGraph } from '../../components/Graph';
import TopicList from '../TopicList';

import { withDb, Database } from '../../db';
import { getColoredTopics, getGraphData } from '../../utils/chart';
import { updateRetention } from '../../utils';

const HomePage = ({ db, history }) => {
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

  const onAddClick = () => {
    history.push('/add');
  };

  const onTopicClick = id => () => {
    history.push(`/review/${id}`);
  };

  const graphData = getGraphData(chosenTopics);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <MultiTopicGraph topics={chosenTopics} graphData={graphData} />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <Button onClick={onAddClick} block>
            Add
          </Button>
          <TopicList topics={[...chosenTopics, ...topics]} onTopicClick={onTopicClick} />
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withDb,
  withRouter,
)(HomePage);
