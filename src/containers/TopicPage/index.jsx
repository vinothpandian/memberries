import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import _ from 'lodash';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { withDb, Database } from '../../db';

import { TopicGraph } from '../../components/Graph';
import TopicInformation from './TopicInformation';
import { calculateRetention } from '../../utils';

const TopicPage = ({ history, match, db }) => {
  const { id } = match.params;
  const [topic, setTopic] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [projectedData, setProjectedData] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await db.getTopic(id);

        let { lastReviewed } = data;
        lastReviewed = _.sortBy(lastReviewed, 'reviewDate');
        const firstReview = _.first(lastReviewed);
        const firstDay = firstReview.reviewDate;
        const firstDifficulty = firstReview.difficulty;

        const reviews = lastReviewed.reduce((acc, { reviewDate, difficulty }) => {
          acc[moment(reviewDate).diff(moment(firstDay), 'days')] = difficulty;
          return acc;
        }, {});

        const reviewDays = Object.keys(reviews).map(key => parseInt(key, 10));

        const noOfDaysSinceFirstReview = moment().diff(moment(firstDay), 'days');

        const sinceFirstReview = _.range(0, noOfDaysSinceFirstReview + 1);
        const fromLastReview = _.range(noOfDaysSinceFirstReview, noOfDaysSinceFirstReview + 100);

        let since = 0;
        let difficulty = firstDifficulty;

        const graph = sinceFirstReview.map((day) => {
          since += 1;

          if (reviewDays.includes(day)) {
            since = 0;
            difficulty = reviews[day];
          }

          const retention = calculateRetention(-since, difficulty);

          return { day, retention };
        });

        since -= 1;

        const nextGraph = fromLastReview
          .map((day) => {
            since += 1;

            return {
              day,
              projectedRetention: calculateRetention(-since, difficulty),
            };
          })
          .filter(({ projectedRetention }) => projectedRetention > 1);

        setTopic(data);
        setGraphData(graph);
        setProjectedData(nextGraph);
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
          <TopicGraph graphData={graphData} projectedData={projectedData} topic={topic} />
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
