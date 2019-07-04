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
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

import { DbProps } from '../../db';

const TopicGraph = ({ topic, graphData, type }) => (
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
      <ReferenceLine x="Today">
        <Label value="Today" angle={-90} position="insideRight" offset={12} />
      </ReferenceLine>
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

TopicGraph.defaultProps = {
  type: 'monotype',
};

TopicGraph.propTypes = {
  topic: DbProps.topic.isRequired,
  // eslint-disable-next-line
  graphData: PropTypes.any,
  type: PropTypes.string,
};

export default TopicGraph;
