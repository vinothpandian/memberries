import React from 'react';

import _ from 'lodash';
import moment from 'moment';
import { DbProps } from '../../db';

const TopicInformation = ({ topic }) => {
  const {
    name, description, difficulty, lastReviewed,
  } = topic;

  const { reviewDate } = _.last(_.sortBy(lastReviewed, 'reviewDate')) || Date.now();

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        <span>Last Reviewed: </span>
        <span>{moment(reviewDate).fromNow()}</span>
      </p>
      <p>
        <span>Difficulty: </span>
        <span>{difficulty}</span>
      </p>
    </div>
  );
};

TopicInformation.propTypes = {
  topic: DbProps.topic.isRequired,
};

export default TopicInformation;
