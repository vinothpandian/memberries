import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Appbar from '../../components/Appbar';
import TopicDrawer from '../../components/TopicDrawer';
import { FullPageGrid } from '../../components';
import SingleTopic from '../SingleTopic';

import { updateRetentionForTopics } from '../../utils/retention';
import { getGraphDataForAllTopics } from '../../utils/graph';
import AllTopics from '../AllTopics';
import AddTopic from '../../components/AddTopic';

const HomePage = () => {
  const fetchedTopics = useSelector(state => state.get('topics'), shallowEqual);
  const topics = updateRetentionForTopics(fetchedTopics);
  const graphData = getGraphDataForAllTopics(topics);

  if (!topics) return null;

  return (
    <React.Fragment>
      <Appbar />
      <FullPageGrid>
        <Switch>
          <Route path="/review/:id" render={props => <SingleTopic {...props} topics={topics} />} />
          <Route
            path="/"
            render={props => <AllTopics {...props} topics={topics} graphData={graphData} />}
          />
        </Switch>
        <Switch>
          <Route path="/add" component={AddTopic} />
          <Route path="/" render={props => <TopicDrawer {...props} topics={topics} />} />
        </Switch>
      </FullPageGrid>
    </React.Fragment>
  );
};

export default HomePage;
