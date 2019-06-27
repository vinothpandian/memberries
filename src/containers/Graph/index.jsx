import React from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Line,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const Graph = () => {
  const T = [...Array(100).keys()];
  const S = 5;

  const R = T.map(t => ({
    t,
    r: parseFloat((Math.exp(-t / S) * 100).toFixed(2)),
    r1: parseFloat((Math.exp(-t / 1) * 100).toFixed(2)),
  })).filter(v => v.r > 1);

  return (
    <ResponsiveContainer height={600}>
      <ComposedChart data={R}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis dataKey="r" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="r" stroke="#8884d8" />
        <Line type="monotone" dataKey="r1" stroke="#82ca9d" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Graph;
