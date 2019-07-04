import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import TopicListItem from '../TopicListItem';
import { withDb, Database } from '../../db';

import { updateRetentionForTopics } from '../../utils/retention';

const TopicList = ({ db }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const fetchedTopics = db.getTopics();
      const topicsWithRetention = updateRetentionForTopics(fetchedTopics);
      setTopics(topicsWithRetention);
    }

    fetchAll();

    return () => {};
  }, [db]);

  return (
    <List>
      {topics.map(topic => (
        <TopicListItem key={topic.id} {...topic} />
      ))}
    </List>
  );
};

TopicList.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
};

export default withDb(TopicList);
