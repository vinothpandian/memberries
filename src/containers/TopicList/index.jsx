import React from 'react';
import TopicItem from './TopicItem';
import { DbProps } from '../../db';

const TopicList = ({ topics }) => (
  <ul>
    {topics
      && topics.map(topic => (
        <TopicItem key={topic.id} name={topic.name} lastReview={topic.lastReview} />
      ))}
  </ul>
);

TopicList.propTypes = {
  topics: DbProps.topics.isRequired,
};

export default TopicList;
