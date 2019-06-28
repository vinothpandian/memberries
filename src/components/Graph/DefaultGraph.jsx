import React from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { calculateRetention } from '../../utils';
import { colors } from '../../utils/chart';

const DefaultGraph = () => {
  const days = [...Array(100).keys()];

  const data = days
    .map(day => ({
      day,
      'Very easy': calculateRetention(-day, 5),
      Easy: calculateRetention(-day, 4),
      Medium: calculateRetention(-day, 3),
      Hard: calculateRetention(-day, 2),
      'Very hard': calculateRetention(-day, 1)
    }))
    .filter(v => v['Very easy'] > 10);

  return (
    <ResponsiveContainer height={600}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Very easy" stroke={colors[0]} />
        <Line type="monotone" dataKey="Easy" stroke={colors[1]} />
        <Line type="monotone" dataKey="Medium" stroke={colors[2]} />
        <Line type="monotone" dataKey="Hard" stroke={colors[3]} />
        <Line type="monotone" dataKey="Very hard" stroke={colors[4]} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DefaultGraph;
