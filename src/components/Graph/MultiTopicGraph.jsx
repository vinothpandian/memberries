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
import { randomHex } from '../../utils';

const MultiTopicGraph = ({ graphData, topics }) => (
  <ResponsiveContainer width="80%" aspect={1.8}>
    <LineChart
      style={{ margin: '0 auto' }}
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
          stroke="red"
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

MultiTopicGraph.propTypes = {
  // eslint-disable-next-line
  topics: PropTypes.any,
  // eslint-disable-next-line
  graphData: PropTypes.any,
};

export default MultiTopicGraph;
