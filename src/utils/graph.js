import moment from 'moment';
import sortBy from 'lodash/sortBy';
import range from 'lodash/range';
import merge from 'lodash/merge';
import { calculateRetention } from './retention';

const getGraphDataForATopic = (topic) => {
  let { lastReviewed } = topic;
  const { id } = topic;
  lastReviewed = sortBy(lastReviewed, 'reviewDate');

  if (!lastReviewed) {
    return [];
  }

  const firstReview = lastReviewed[0];
  const firstDay = firstReview.reviewDate;
  const firstDifficulty = firstReview.difficulty;

  //   assign difficulty to days
  const reviews = lastReviewed.reduce((acc, { reviewDate, difficulty }) => {
    const differenceFromFirstReviewDay = moment(reviewDate).diff(moment(firstDay), 'days');
    acc[differenceFromFirstReviewDay] = difficulty;
    return acc;
  }, {});

  // Get review as days
  const reviewDays = Object.keys(reviews).map(key => parseInt(key, 10));

  const noOfDaysSinceFirstReview = moment().diff(moment(firstDay), 'days');

  const sinceFirstReview = range(0, noOfDaysSinceFirstReview);
  const fromLastReview = range(noOfDaysSinceFirstReview - 1, noOfDaysSinceFirstReview + 100);

  let since = 0;
  let difficulty = firstDifficulty;

  const graphData = sinceFirstReview.map((day) => {
    since += 1;

    // reset review to 100% on the day of review
    if (reviewDays.includes(day)) {
      since = 0;
      difficulty = reviews[day];
    }

    const retention = calculateRetention(-since, difficulty);

    return { day, [`Retention of ${id}`]: retention };
  });

  since -= 1;

  const projectedGraphData = fromLastReview
    .map((day) => {
      since += 1;

      return {
        day,
        [`Projected Retention of ${id}`]: calculateRetention(-since, difficulty),
      };
    })
    .filter(data => data[`Projected Retention of ${id}`] > 1);

  return [...graphData, ...projectedGraphData];
};

const getGraphDataForAllTopics = topics => topics.reduce((acc, topic) => {
  const graphData = getGraphDataForATopic(topic);
  return merge(acc, graphData);
}, []);

export { getGraphDataForATopic, getGraphDataForAllTopics };
