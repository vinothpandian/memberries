import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import TopicListItem from '../TopicListItem';

const TopicList = ({ topics }) => (
  <List>
    {topics.map(topic => (
      <TopicListItem key={topic.id} {...topic} />
    ))}
  </List>
);

TopicList.propTypes = {
  topics: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    retention: PropTypes.number.isRequired,
    topicName: PropTypes.string.isRequired,
    lastReviewed: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopicList;
