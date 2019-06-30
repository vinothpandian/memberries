import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

const TopicItem = ({
  name, lastReviewed, color, retention, onTopicClick,
}) => {
  const labelLength = 15;
  const label = name.length < labelLength ? name : `${name.slice(0, labelLength)}...`;

  return (
    <Button variant="outline-dark" block onClick={onTopicClick} style={{ color }}>
      <span className="float-left">{label}</span>
      <span className="float-center">{`${retention}%`}</span>
      <span className="float-right">{lastReviewed}</span>
    </Button>
  );
};

TopicItem.propTypes = {
  name: PropTypes.string.isRequired,
  lastReviewed: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  retention: PropTypes.number.isRequired,
  onTopicClick: PropTypes.func.isRequired,
};

export default TopicItem;
