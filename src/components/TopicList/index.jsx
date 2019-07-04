import React from 'react';

import List from '@material-ui/core/List';
import TopicListItem from '../TopicListItem';
import { DbProps } from '../../db';

const TopicList = ({ topics }) => (
  <List>
    {topics.map(topic => (
      <TopicListItem key={topic.id} {...topic} />
    ))}
  </List>
);

TopicList.propTypes = {
  topics: DbProps.topics.isRequired,
};

export default TopicList;
