import React, { useState, useEffect } from 'react';

import { PropTypes } from 'prop-types';
import Graph from '../Graph';
import TopicList from '../TopicList';
import TopicEditor from '../TopicEditor';
import Database, { withDb } from '../../db';

const Home = ({ db }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const data = db.getTopics();
      console.log(JSON.stringify(data));
      setTopics(data);
    }
    fetchAll();
  }, []);

  return (
    <div>
      <Graph />
      <TopicEditor />
      <TopicList topics={topics} />
    </div>
  );
};

Home.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
};

export default withDb(Home);
