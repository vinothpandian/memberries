import React from 'react';
import Appbar from '../../components/Appbar';
import TopicDrawer from '../../components/TopicDrawer';
import ReviewDrawer from '../../components/ReviewDrawer';
import { TopicGraph } from '../../components/Graph';
import { FullPageGrid } from '../../components';

const TopicPage = () => (
  <React.Fragment>
    <Appbar />
    <FullPageGrid>
      <TopicGraph />
      <ReviewDrawer />
      <TopicDrawer />
    </FullPageGrid>
  </React.Fragment>
);

export default TopicPage;
