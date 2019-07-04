import moment from 'moment';
import _ from 'lodash';
import sortBy from 'lodash/sortBy';

export const findLastReview = reviewDate => moment(reviewDate).diff(moment(), 'day');

export const findRecentReview = (reviews, asMoment = false) => {
  const { reviewDate } = _.last(_.sortBy(reviews, 'reviewDate'));

  if (asMoment) {
    return moment(reviewDate);
  }

  return reviewDate;
};

export const calculateRetention = (lastReview, difficulty) => {
  let retention = Math.exp(lastReview / difficulty) * 100;
  retention = retention.toFixed(2);
  return parseFloat(retention);
};

export const updateRetentionForATopic = (topic) => {
  const { lastReviewed, difficulty } = topic;

  const { reviewDate } = _.last(_.sortBy(lastReviewed, 'reviewDate'));
  const lastReview = findLastReview(reviewDate);
  const retention = calculateRetention(lastReview, difficulty);

  return {
    ...topic,
    retention,
  };
};

export const updateRetentionForTopics = topics => topics.map(updateRetentionForATopic);

export const randomHex = () => `#${'0123456789abcdef'
  .split('')
  .map((v, i, a) => (i > 5 ? null : a[Math.floor(Math.random() * 16)]))
  .join('')}`;

export const fetchLastReview = (reviews) => {
  const review = sortBy(reviews, 'reviewDate')[reviews.length - 1];
  return moment(review);
};
