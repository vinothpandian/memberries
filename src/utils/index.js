import * as retention from './retention';
import * as graph from './graph';
import * as date from './date';
import * as firebase from './firebase';

export const stateToFirebase = topics => topics.toJS().reduce((acc, topic) => {
  acc[topic.id] = topic;
  return acc;
}, {});

export {
  retention, graph, date, firebase,
};
