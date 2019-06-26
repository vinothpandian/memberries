import React from 'react';
import PropTypes from 'prop-types';

const TopicItem = ({ name, lastReviewed }) => (
  <li>
    <span>{name}</span>
    <span>{lastReviewed}</span>
  </li>
);

TopicItem.propTypes = {
  name: PropTypes.string.isRequired,
  lastReviewed: PropTypes.string.isRequired,
};

export default TopicItem;
