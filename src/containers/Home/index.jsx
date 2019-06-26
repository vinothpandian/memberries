import React from 'react';

import Graph from '../Graph';
import TopicList from '../TopicList';
import TopicEditor from '../TopicEditor';
import { withDb, DbProps } from '../../db';

const Home = ({ topics }) => (
  <div>
    <Graph />
    <TopicEditor />
    <TopicList topics={topics} />
  </div>
);

Home.propTypes = {
  topics: DbProps.topics.isRequired,
};

export default withDb(Home);
