import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { MultiTopicGraph } from '../../components/Graph';
import OverviewDrawer from '../../components/OverviewDrawer';
import { DbProps } from '../../db';

const AllTopics = ({ topics, graphData }) => (
  <Fragment>
    <MultiTopicGraph topics={topics} graphData={graphData} />
    <OverviewDrawer />
  </Fragment>
);

AllTopics.propTypes = {
  topics: DbProps.topics.isRequired,
  // eslint-disable-next-line
  graphData: PropTypes.any,
};

export default AllTopics;
