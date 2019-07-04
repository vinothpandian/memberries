import { findRecentReview, findRecentReviewInDays } from './date';

export const calculateRetention = (lastReview, difficulty) => {
  let retention = Math.exp(lastReview / difficulty) * 100;
  retention = retention.toFixed(2);
  return parseFloat(retention);
};

export const updateRetentionForATopic = (topic) => {
  const { lastReviewed, difficulty } = topic;

  const reviewDate = findRecentReview(lastReviewed);
  const recentReviewInDays = findRecentReviewInDays(reviewDate);
  const retention = calculateRetention(recentReviewInDays, difficulty);

  return {
    ...topic,
    retention,
  };
};

export const updateRetentionForTopics = topics => topics.map(updateRetentionForATopic);
