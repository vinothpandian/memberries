import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Appbar from '../../components/Appbar';
import TopicDrawer from '../../components/TopicDrawer';
import AddTopic from '../../components/AddTopic';
import { MultiTopicGraph } from '../../components/Graph';
import { FullPageGrid } from '../../components';

const HomePage = () => (
  <React.Fragment>
    <Appbar />
    <FullPageGrid>
      <MultiTopicGraph />
      <Switch>
        <Route exact path="/" component={TopicDrawer} />
        <Route path="/add" component={AddTopic} />
      </Switch>
    </FullPageGrid>
  </React.Fragment>
);

export default HomePage;
