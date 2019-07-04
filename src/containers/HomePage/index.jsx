import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Appbar from '../../components/Appbar';
import TopicDrawer from '../../components/TopicDrawer';
import AddTopic from '../../components/AddTopic';
import { MultiTopicGraph, TopicGraph } from '../../components/Graph';
import { FullPageGrid } from '../../components';
import ReviewDrawer from '../../components/ReviewDrawer';
import OverviewDrawer from '../../components/OverviewDrawer';
import { FETCH_TOPIC, FETCH_TOPICS } from '../../constants/index';

const HomePage = () => {
  const topics = useSelector(state => state.get('topics'), shallowEqual);
  const dispatch = useDispatch();

  console.log('TOPICS', topics);
  dispatch({ type: FETCH_TOPICS });

  return (
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
};

export default HomePage;
