import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { withRouter } from 'react-router';

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Label,
  ResponsiveContainer,
} from 'recharts';

import { compose } from 'recompose';
import { Database, withDb } from '../../db';
import { updateRetentionForATopic } from '../../utils/retention';
import { getGraphDataForATopic } from '../../utils/graph';

const TopicGraph = ({ db, match }) => {
  const [topic, setTopic] = useState({});
  const [graphData, setGraphData] = useState([]);

  const { id } = match.params;

  useEffect(() => {
    async function fetchTopic(topicID) {
      const fetchedTopic = await db.getTopic('oaJwnzK1s');
      if (fetchedTopic) {
        const processedTopic = updateRetentionForATopic(fetchedTopic);
        const processedGraphData = getGraphDataForATopic(processedTopic);
        setTopic(processedTopic);
        setGraphData(processedGraphData);
      }
    }

    function resetState() {
      setTopic([]);
      setGraphData([]);
    }

    fetchTopic(id);

    return resetState;
  }, [db, id]);

  return (
    <ResponsiveContainer width="40%" height={450}>
      <LineChart
        data={graphData}
        margin={{
          top: 5,
          right: 5,
          bottom: 25,
          left: 25,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" allowDuplicatedCategory={false}>
          <Label value="Day" position="bottom" offset={2} />
        </XAxis>
        <YAxis domain={[0, 100]}>
          <Label value="Retention" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip labelFormatter={value => `Day ${value}`} />
        <Line
          unit="%"
          key={topic.name}
          type="monotone"
          stroke={topic.color}
          dataKey={`Retention of ${topic.id}`}
        />
        <Line
          unit="%"
          key={topic.id}
          type="monotone"
          strokeDasharray="3 3"
          stroke={topic.color}
          dataKey={`Projected Retention of ${topic.id}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

TopicGraph.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default compose(
  withRouter,
  withDb,
)(TopicGraph);
