import moment from 'moment';
import _ from 'lodash';

export const findLastReview = reviewDate => moment(reviewDate).diff(moment(), 'day');

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
