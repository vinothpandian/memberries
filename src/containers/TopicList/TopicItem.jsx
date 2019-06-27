import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import ReactRouterPropTypes from 'react-router-prop-types';

import Button from 'react-bootstrap/Button';

const TopicItem = ({
  id, name, lastReviewed, history,
}) => {
  const labelLength = 15;
  const label = name.length < labelLength ? name : `${name.slice(0, labelLength)}...`;

  return (
    <Button
      variant="outline-dark"
      block
      onClick={() => {
        history.push(`/review/${id}`);
      }}
    >
      <span className="float-left">{label}</span>
      <span className="float-right">{lastReviewed}</span>
    </Button>
  );
};

TopicItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastReviewed: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(TopicItem);
