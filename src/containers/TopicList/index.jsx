import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import TopicItem from './TopicItem';
import { DbProps } from '../../db';

const TopicList = ({ topics, onTopicClick }) => topics.map((topic) => {
  const {
    color, lastReviewed, name, id, retention,
  } = topic;

  const lastReview = lastReviewed[lastReviewed.length - 1];
  const lastReviewTime = moment(lastReview).fromNow();

  return (
    <TopicItem
      key={id}
      id={id}
      name={name}
      lastReviewed={lastReviewTime}
      retention={retention}
      color={color || 'black'}
      onTopicClick={onTopicClick(id)}
    />
  );
});

TopicList.propTypes = {
  topics: DbProps.topics.isRequired,
  onTopicClick: PropTypes.func.isRequired,
};

export default TopicList;
