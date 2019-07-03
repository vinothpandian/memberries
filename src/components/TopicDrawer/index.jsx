import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TopicList from '../TopicList';
import AddButton from '../AddButton';

const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

const topics = [
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
  {
    id: 'asdfasd',
    retention: 77,
    topicName: 'React',
    lastReviewed: '8 days ago',
    to: '/review/asdfasd',
  },
  {
    id: 'eradfa',
    retention: 97,
    topicName: 'Deep learning',
    lastReviewed: '2 days ago',
    to: '/review/eradfa',
  },
  {
    id: '234df',
    retention: 37,
    topicName: 'Typescript',
    lastReviewed: '12 days ago',
    to: '/review/234df',
  },
];

const TopicDrawer = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.toolbar}>
        <Typography className={classes.toolbarTitle} variant="h6" noWrap color="textSecondary">
          To review
        </Typography>
      </div>
      <TopicList topics={topics} />
      <AddButton />
    </Drawer>
  );
};

export default TopicDrawer;
