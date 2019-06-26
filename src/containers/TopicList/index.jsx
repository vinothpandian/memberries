import React from 'react';
import PropTypes from 'prop-types';
import TopicItem from './TopicItem';

const TopicList = ({ topics }) => (
  <ul>
    {topics
      && topics.map(topic => (
        <TopicItem key={topic.id} name={topic.name} lastReview={topic.lastReview[0]} />
      ))}
  </ul>
);

TopicList.propTypes = {
  topics: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastReviewed: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default TopicList;
