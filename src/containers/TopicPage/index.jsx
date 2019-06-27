import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import Database, { withDb } from '../../db';

const TopicPage = ({ history, match, db }) => {
  const { id } = match.params;
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await db.getTopic(id);

        setTopic(data);
      } catch (error) {
        history.push({
          pathname: '/error',
          state: { message: error.message },
        });
      }
    }

    fetchAll();
  }, [id, history, db]);

  return (
    <div>
      Topic:
      {JSON.stringify(topic)}
    </div>
  );
};

TopicPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  db: PropTypes.instanceOf(Database).isRequired,
};

export default compose(
  withRouter,
  withDb,
)(TopicPage);
