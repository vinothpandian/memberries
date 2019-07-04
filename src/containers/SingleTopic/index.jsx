import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import { TopicGraph } from '../../components/Graph';
import ReviewDrawer from '../../components/ReviewDrawer';
import { DbProps } from '../../db';
import { getGraphDataForATopic } from '../../utils/graph';

const SingleTopic = ({ match, topics }) => {
  const { id } = match.params;
  const [topic] = topics.filter(obj => obj.id === id);
  const graphData = getGraphDataForATopic(topic);

  if (!topic || !graphData) return null;

  return (
    <Fragment>
      <TopicGraph topic={topic} graphData={graphData} />
      <ReviewDrawer topic={topic} />
    </Fragment>
  );
};

SingleTopic.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  topics: DbProps.topics.isRequired,
};

export default withRouter(SingleTopic);
