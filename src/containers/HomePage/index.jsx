import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Appbar from '../../components/Appbar';
import TopicDrawer from '../../components/TopicDrawer';
import AddTopic from '../../components/AddTopic';
import { MultiTopicGraph, TopicGraph } from '../../components/Graph';
import { FullPageGrid } from '../../components';
import ReviewDrawer from '../../components/ReviewDrawer';
import OverviewDrawer from '../../components/OverviewDrawer';

const HomePage = () => (
  <React.Fragment>
    <Appbar />
    <FullPageGrid>
      <Switch>
        <Route exact path="/" component={MultiTopicGraph} />
        <Route path="/review/:id" component={TopicGraph} />
      </Switch>
      <Switch>
        <Route exact path="/" component={OverviewDrawer} />
        <Route path="/review/:id" component={ReviewDrawer} />
      </Switch>
      <Switch>
        <Route exact path="/" component={TopicDrawer} />
        <Route path="/add" component={AddTopic} />
      </Switch>
    </FullPageGrid>
  </React.Fragment>
);

export default HomePage;
