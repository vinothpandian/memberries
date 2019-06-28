import React from 'react';
import moment from 'moment';

import TopicItem from './TopicItem';
import { DbProps } from '../../db';

const TopicList = ({ topics }) => topics.map((topic) => {
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
    />
  );
});

TopicList.propTypes = {
  topics: DbProps.topics.isRequired,
};

export default TopicList;
