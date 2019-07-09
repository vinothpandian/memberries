import moment from 'moment';

import {
  List, Map, Range, mergeDeep,
} from 'immutable';
import { calculateRetention } from './retention';

const getGraphDataForATopic = (topic) => {
  let lastReviewed = topic.get('lastReviewed');
  const id = topic.get('id');
  lastReviewed = lastReviewed.sortBy(review => review.reviewDate);

  if (!lastReviewed) {
    return [];
  }

  const firstReview = lastReviewed.first();
  const firstDay = firstReview.get('reviewDate');
  const firstDifficulty = firstReview.get('difficulty');

  //   assign difficulty to days
  const reviews = lastReviewed.reduce((previousReviews, review) => {
    const reviewDate = review.get('reviewDate');
    const difficulty = review.get('difficulty');

    const differenceFromFirstReviewDay = moment(reviewDate)
      .startOf('day')
      .diff(moment(firstDay).startOf('day'), 'days');
    const nextReviews = previousReviews.set(differenceFromFirstReviewDay, difficulty);
    return nextReviews;
  }, Map());

  const current = moment().startOf('day');
  const firstReviewDay = moment(firstDay).startOf('day');
  const today = current.diff(firstReviewDay, 'days');

  const sinceFirstReview = Range(0, today + 1);
  const fromLastReview = Range(today + 1, today + 11);

  let since = 0;
  let difficulty = firstDifficulty;

  let currentGraphData = sinceFirstReview
    .map((day) => {
      since += 1;

      // reset review to 100% on the day of review
      if (reviews.has(day)) {
        since = 0;
        difficulty = reviews.get(day);
      }

      const retention = calculateRetention(-since, difficulty);

      const relativeDay = moment(firstDay).add(day, 'day');

      return Map({
        key: relativeDay.valueOf(),
        day: relativeDay.format('MMM DD, YY'),
        [`Retention of ${id}`]: retention,
      });
    })
    .toList();

  const dataOfToday = currentGraphData.last();
  currentGraphData = currentGraphData.pop();

  const projectedGraphData = fromLastReview
    .map((day, index) => {
      const projectedDay = since + 1 + index;

      const relativeDay = moment(firstDay).add(day, 'day');

      return Map({
        key: relativeDay.valueOf(),
        day: relativeDay.format('MMM DD, YY'),
        [`Projected Retention of ${id}`]: calculateRetention(-projectedDay, difficulty),
      });
    })
    .toList();

  const currentGraphDataWithToday = currentGraphData.push(
    Map({
      key: dataOfToday.get('key'),
      day: 'Today',
      [`Retention of ${id}`]: dataOfToday.get(`Retention of ${id}`),
      [`Projected Retention of ${id}`]: dataOfToday.get(`Retention of ${id}`),
    }),
  );

  const graphData = currentGraphDataWithToday.concat(projectedGraphData);

  return graphData;
};

const getGraphDataForAllTopics = (topics) => {
  const topicMap = topics.reduce((acc, topic) => {
    const graphData = getGraphDataForATopic(topic);

    const graphMap = graphData.reduce((newData, data) => newData.set(data.get('day'), data), Map());

    return mergeDeep(acc, graphMap);
  }, Map());
  return List([...topicMap.values()]);
};

export { getGraphDataForATopic, getGraphDataForAllTopics };
