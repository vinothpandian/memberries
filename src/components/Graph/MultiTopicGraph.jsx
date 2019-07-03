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
import { randomHex, updateRetentionForTopics } from '../../utils';
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
        {/* <ReferenceLine x="5" stroke="gray" label="Today" /> */}
        {topics.map(topic => (
          <Line
            unit="%"
            key={topic.name}
            type="monotone"
            stroke={randomHex()}
            dataKey={`Retention of ${topic.id}`}
          />
        ))}
        {topics.map(topic => (
          <Line
            unit="%"
            key={topic.id}
            type="monotone"
            strokeDasharray="3 3"
            stroke="blue"
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
