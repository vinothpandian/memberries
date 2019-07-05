import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';
import { MultiTopicGraph } from '../../components/Graph';
import OverviewDrawer from '../../components/OverviewDrawer';

const AllTopics = ({ topics, graphData }) => (
  <Fragment>
    <MultiTopicGraph topics={topics} graphData={graphData} />
    <OverviewDrawer />
  </Fragment>
);

AllTopics.propTypes = {
  topics: PropTypes.instanceOf(List).isRequired,
  graphData: PropTypes.instanceOf(List).isRequired,
};

export default AllTopics;
