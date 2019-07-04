import React from 'react';
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
import { DbProps } from '../../db';

const MultiTopicGraph = ({ topics, graphData }) => (
  <ResponsiveContainer width="60%" height={500}>
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
        formatter={(value, name) => (name.includes('Projected') ? [value, 'Projected Retention'] : [value, 'Retention'])
        }
      />
      <ReferenceLine x="Today" stroke="gray">
        <Label value="Today" angle={-90} position="insideRight" offset={12} />
      </ReferenceLine>
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

MultiTopicGraph.propTypes = {
  topics: DbProps.topics.isRequired,
  // eslint-disable-next-line
  graphData: PropTypes.any,
};

export default MultiTopicGraph;
