import moment from 'moment';

import last from 'lodash/last';
import sortBy from 'lodash/sortBy';

export const findRecentReviewInDays = reviewDate => moment(reviewDate).diff(moment(), 'day');

export const findRecentReview = (reviews, asMoment = false) => {
  const { reviewDate } = last(sortBy(reviews, 'reviewDate'));

  if (asMoment) {
    return moment(reviewDate);
  }

  return reviewDate;
};
