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
// import TopicList from '../../components/TopicList';
import TopicEditor from '../../components/TopicEditor';

import { withDb, Database } from '../../db';

import { getGraphDataForAllTopics } from '../../utils/graph';
import { updateRetention } from '../../utils';

const HomePage = ({ db, history, match }) => {
  const { id } = match.params;

  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      const processedTopics = updateRetention(data);
      const processedGraphData = getGraphDataForAllTopics(processedTopics);

      setTopics(processedTopics);
      setGraphData(processedGraphData);
    }

    function fetchID(topicID) {
      const data = db.getTopics();
      const processedTopics = updateRetention(data);
      const processedTopic = processedTopics.filter(t => t.id === topicID);
      const processedGraphData = getGraphDataForAllTopics(processedTopic);

      setTopic(processedTopic[0]);
      setTopics(processedTopics);
      setGraphData(processedGraphData);
    }

    function resetStates() {
      setTopic(null);
      setTopics([]);
      setGraphData([]);
    }

    if (id) {
      fetchID(id);
    } else {
      fetchAll();
    }

    return resetStates;
  }, [db, id]);

  const onAddClick = () => {
    history.push('/add');
  };

  const onTopicClick = topicID => () => {
    history.push(`/review/${topicID}`);
  };

  return (
    <Container fluid className="h-100">
      <h1>{topic ? topic.name : 'Overall'}</h1>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="8">
          <MultiTopicGraph topics={topics} graphData={graphData} />
        </Col>
        <Col xs="4" className="h-100 mt-5">
          <Button onClick={onAddClick} block>
            Add
          </Button>
          {/* <TopicEditor /> */}
          {/* <TopicList topics={topics} onTopicClick={onTopicClick} /> */}
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default compose(
  withDb,
  withRouter,
)(HomePage);
