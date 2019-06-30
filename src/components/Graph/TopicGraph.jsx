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
} from 'recharts';

import { DbProps } from '../../db';

const TopicGraph = ({ graphData, projectedData, topic }) => {
  const data = [...graphData, ...projectedData];

  console.log(data);

  return (
    <ResponsiveContainer width="80%" aspect={1.8}>
      <LineChart
        style={{ margin: '0 auto' }}
        data={data}
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
        <Line unit="%" type="monotone" dataKey="retention" stroke="green" />
        <Line unit="%" type="monotone" dataKey="projectedRetention" stroke="palevioletred" />
      </LineChart>
    </ResponsiveContainer>
  );
};

TopicGraph.propTypes = {
  topic: DbProps.topic.isRequired,
  // eslint-disable-next-line
  graphData: PropTypes.any,
  // eslint-disable-next-line
  projectedData: PropTypes.any,
};

export default TopicGraph;
