import moment from 'moment';

export const findRecentReviewInDays = reviewDate => moment(reviewDate).diff(moment(), 'day');

export const findRecentReview = (reviews, asMoment = false) => {
  const recentReview = reviews.sortBy(topic => topic.get('reviewDate')).last();
  const reviewDate = recentReview.get('reviewDate');

  if (asMoment) {
    return moment(reviewDate);
  }

  return reviewDate;
};

export const isSameDay = lastReviewed => moment().isSame(findRecentReview(lastReviewed, { asMoment: true }), 'day');
