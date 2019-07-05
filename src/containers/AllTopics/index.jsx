import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';
import { MultiTopicGraph, DefaultGraph } from '../../components/Graph';
import OverviewDrawer from '../../components/OverviewDrawer';

const AllTopics = ({ topics, graphData }) => (
  <Fragment>
    {topics.isEmpty() ? (
      <DefaultGraph />
    ) : (
      <MultiTopicGraph topics={topics} graphData={graphData} />
    )}
    <OverviewDrawer />
  </Fragment>
);

AllTopics.propTypes = {
  topics: PropTypes.instanceOf(List).isRequired,
  graphData: PropTypes.instanceOf(List).isRequired,
};

export default AllTopics;
