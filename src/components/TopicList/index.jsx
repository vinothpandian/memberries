import React from 'react';

import List from '@material-ui/core/List';
import { PropTypes } from 'prop-types';
import { List as ImmutableList } from 'immutable';
import TopicListItem from '../TopicListItem';

const TopicList = ({ topics }) => (
  <List>
    {topics.map(topic => (
      <TopicListItem key={topic.get('id')} topic={topic} />
    ))}
  </List>
);

TopicList.propTypes = {
  topics: PropTypes.instanceOf(ImmutableList).isRequired,
};

export default TopicList;
