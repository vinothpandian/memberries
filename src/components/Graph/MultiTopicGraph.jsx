import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Label,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { updateRetentionForTopics } from '../../utils/retention';
import withDb from '../../db/withDb';
import Database from '../../db/database';
import { getGraphDataForAllTopics } from '../../utils/graph';

const MultiTopicGraph = ({ db }) => {
  const [topics, setTopics] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    function fetchAll() {
      const fetchedTopics = db.getTopics();
      const processedTopics = updateRetentionForTopics(fetchedTopics);
      const processedGraphData = getGraphDataForAllTopics(processedTopics);

      setTopics(processedTopics);
      setGraphData(processedGraphData);
    }

    function resetStates() {
      setTopics([]);
      setGraphData([]);
    }

    fetchAll();

    return resetStates;
  }, [db]);

  return (
    <ResponsiveContainer width="80%" height={550}>
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
        <Tooltip
          labelFormatter={value => (value === 'Today' ? 'Today' : `Day ${value}`)}
          formatter={(value, name, props) => {
            console.log(props);
            return name.includes('Projected')
              ? [value, 'Projected Retention']
              : [value, 'Retention'];
          }}
        />
        <ReferenceLine x="Today" stroke="gray" />
        {topics.map(topic => (
          <Line
            unit="%"
            key={topic.name}
            type="monotone"
            stroke={topic.color}
            dataKey={`Retention of ${topic.id}`}
          />
        ))}
        {topics.map(topic => (
          <Line
            unit="%"
            key={topic.id}
            type="monotone"
            strokeDasharray="3 3"
            stroke={topic.color}
            dataKey={`Projected Retention of ${topic.id}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

MultiTopicGraph.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  // eslint-disable-next-line
  graphData: PropTypes.any,
};

export default withDb(MultiTopicGraph);
