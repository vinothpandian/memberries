import PropTypes from 'prop-types';

export const topic = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  lastReviewed: PropTypes.arrayOf(
    PropTypes.shape({
      reviewDate: PropTypes.number,
      difficulty: PropTypes.number,
    }),
  ),
  difficulty: PropTypes.number,
  color: PropTypes.string.isRequired,
});

export const topics = PropTypes.arrayOf(topic);
