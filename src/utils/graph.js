import moment from 'moment';

import { List, Map, Range } from 'immutable';
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

    const differenceFromFirstReviewDay = moment(reviewDate).diff(moment(firstDay), 'days');
    const nextReviews = previousReviews.set(differenceFromFirstReviewDay, difficulty);
    return nextReviews;
  }, Map());

  const today = moment().diff(moment(firstDay), 'days');

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

      return Map({
        day: moment(firstDay)
          .add(day, 'day')
          .format('MMM DD, YY'),
        [`Retention of ${id}`]: retention,
      });
    })
    .toList();

  const dataOfToday = currentGraphData.last();
  currentGraphData = currentGraphData.pop();

  const projectedGraphData = fromLastReview
    .map((day, index) => {
      const projectedDay = since + 1 + index;

      return Map({
        day: moment(firstDay)
          .add(day, 'day')
          .format('MMM DD, YY'),
        [`Projected Retention of ${id}`]: calculateRetention(-projectedDay, difficulty),
      });
    })
    .toList();

  const currentGraphDataWithToday = currentGraphData.push(
    Map({
      day: 'Today',
      [`Retention of ${id}`]: dataOfToday.get(`Retention of ${id}`),
      [`Projected Retention of ${id}`]: dataOfToday.get(`Retention of ${id}`),
    }),
  );

  const graphData = currentGraphDataWithToday.concat(projectedGraphData);

  return graphData;
};

const getGraphDataForAllTopics = topics => topics.reduce((acc, topic) => {
  const graphData = getGraphDataForATopic(topic);
  return acc.merge(graphData);
}, List());

export { getGraphDataForATopic, getGraphDataForAllTopics };
