import moment from 'moment';

export const findLastReview = reviewDate => moment(reviewDate).diff(moment(), 'day');

export const calculateRetention = (lastReview, difficulty) => {
  let retention = Math.exp(lastReview / difficulty) * 100;
  retention = retention.toFixed(2);
  return parseFloat(retention);
};

export const randomHex = () => `#${'0123456789abcdef'
  .split('')
  .map((v, i, a) => (i > 5 ? null : a[Math.floor(Math.random() * 16)]))
  .join('')}`;
