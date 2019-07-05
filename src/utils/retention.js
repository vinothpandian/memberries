import { findRecentReview, findRecentReviewInDays } from './date';

export const calculateRetention = (lastReview, difficulty) => {
  let retention = Math.exp(lastReview / difficulty) * 100;
  retention = retention.toFixed(2);
  return parseFloat(retention);
};

export const updateRetentionForATopic = (topic) => {
  const lastReviewed = topic.get('lastReviewed');
  const difficulty = topic.get('difficulty');

  const reviewDate = findRecentReview(lastReviewed);
  const recentReviewInDays = findRecentReviewInDays(reviewDate);
  const retention = calculateRetention(recentReviewInDays, difficulty);

  const newTopic = topic.set('retention', retention);

  return newTopic;
};

export const updateRetentionForTopics = topics => topics.map(updateRetentionForATopic);
