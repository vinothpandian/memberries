import React from 'react';
import * as PropTypes from 'prop-types';

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';

import Label from 'recharts/es6/component/Label';

const Graph = ({ graphData, topics }) => (
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
      <XAxis dataKey="day">
        <Label value="Day" position="bottom" offset={2} />
      </XAxis>
      <YAxis domain={[0, 100]}>
        <Label value="Retention" angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip labelFormatter={value => `Day ${value}`} />
      {topics.map(topic => (
        <Line
          dot={false}
          unit="%"
          type="monotone"
          key={topic.name}
          dataKey={topic.name}
          stroke={topic.color}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

Graph.propTypes = {
  // eslint-disable-next-line
  topics: PropTypes.any,
  // eslint-disable-next-line
  graphData: PropTypes.any
};

export default Graph;
