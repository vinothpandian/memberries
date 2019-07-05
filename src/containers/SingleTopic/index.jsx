import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import { List } from 'immutable';
import { TopicGraph } from '../../components/Graph';
import ReviewDrawer from '../../components/ReviewDrawer';
import { getGraphDataForATopic } from '../../utils/graph';

const SingleTopic = ({ match, history, topics }) => {
  const { id } = match.params;
  const topic = topics.filter(obj => obj.get('id') === id).first();

  if (!topic) {
    history.replace('/error');
    return null;
  }

  const graphData = getGraphDataForATopic(topic);

  return (
    <Fragment>
      <TopicGraph topic={topic} graphData={graphData} />
      <ReviewDrawer topic={topic} />
    </Fragment>
  );
};

SingleTopic.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  topics: PropTypes.instanceOf(List).isRequired,
};

export default withRouter(SingleTopic);
