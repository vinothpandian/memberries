import moment from 'moment';

export const findLastReview = reviewDate => moment(reviewDate).diff(moment(), 'day');

export const calculateRetention = (lastReview, difficulty) => {
  let retention = Math.exp(lastReview / difficulty) * 100;
  retention = retention.toFixed(2);
  return parseFloat(retention);
};

export const updateRetention = topics => topics.map((topic) => {
  const { lastReviewed, difficulty } = topic;

  const reviewDate = lastReviewed[lastReviewed.length - 1];
  const lastReview = findLastReview(reviewDate);
  const retention = calculateRetention(lastReview, difficulty);

  return {
    ...topic,
    retention,
  };
});

export const randomHex = () => `#${'0123456789abcdef'
  .split('')
  .map((v, i, a) => (i > 5 ? null : a[Math.floor(Math.random() * 16)]))
  .join('')}`;
