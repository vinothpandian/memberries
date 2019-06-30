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
import TopicList from '../../components/TopicList';

import { withDb, Database } from '../../db';

import { getGraphDataForAllTopics } from '../../utils/graph';
import { updateRetention } from '../../utils';

const HomePage = ({ db, history }) => {
  const [topics, setTopics] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      const processedTopics = updateRetention(data);
      const processedGraphData = getGraphDataForAllTopics(processedTopics);

      setTopics(processedTopics);
      setGraphData(processedGraphData);
    }
    fetchAll();
  }, [db]);

  const onAddClick = () => {
    history.push('/add');
  };

  const onTopicClick = id => () => {
    history.push(`/review/${id}`);
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <MultiTopicGraph topics={topics} graphData={graphData} />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <Button onClick={onAddClick} block>
            Add
          </Button>
          <TopicList topics={topics} onTopicClick={onTopicClick} />
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
