import moment from 'moment';
import random from 'lodash/random';
import range from 'lodash/range';

const now = moment();

const lastReviewed = range(random(1, 6, false))
  .map(_ => random(1, 6, false))
  .map(day => ({
    reviewDate: now.subtract(day, 'days').valueOf(),
    difficulty: random(1, 5),
  }));

export default lastReviewed;
