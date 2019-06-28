import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { calculateRetention, findLastReview } from '.';

export const colors = scaleOrdinal(schemeCategory10).range();

export const getColoredTopics = topics => topics.map((topic, i) => ({
    color: colors[i],
    ...topic,
  }));

export const getGraphData = (topics) => {
  const days = [...Array(100).keys()];

  const data = days
    .map((day) => {
      const retentions = topics.reduce((acc, topic) => {
        const { lastReviewed, difficulty, name } = topic;

        const reviewDate = lastReviewed[lastReviewed.length - 1];
        const lastReview = findLastReview(reviewDate);
        const retention = calculateRetention(lastReview, difficulty);

        const defaultRetention = calculateRetention(-day, difficulty);

        if (defaultRetention > retention) return acc;
        if (defaultRetention < 1) return acc;

        acc[name] = defaultRetention;
        return acc;
      }, {});

      return {
        day,
        ...retentions,
      };
    })
    .filter(day => Object.keys(day).length > 1);

  return data;
};
