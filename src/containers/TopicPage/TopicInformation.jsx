import React from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import moment from 'moment';
import { DbProps } from '../../db';

const TopicInformation = ({ topic }) => {
  const {
    name, description, difficulty, lastReviewed,
  } = topic;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        <span>Last Reviewed: </span>
        <span>{moment(last(lastReviewed)).fromNow()}</span>
      </p>
    </div>
  );
};

TopicInformation.propTypes = {
  topic: DbProps.topic.isRequired,
};

export default TopicInformation;
