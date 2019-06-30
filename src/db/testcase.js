import moment from 'moment';

const now = moment();

const lastReviewed = [2, 3, 1, 1, 2, 1].map(day => ({
  reviewDate: now.subtract(day, 'days').valueOf(),
  difficulty: 5 - day,
}));

export default lastReviewed;
