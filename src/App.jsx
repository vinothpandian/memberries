import React from 'react';
import './App.scss';

import {
  LineChart, XAxis, YAxis, Legend, CartesianGrid, Line, Tooltip,
} from 'recharts';

const T = [...Array(100).keys()];
const S = 5;

const R = T.map(t => ({
  t,
  r: parseFloat((Math.exp(-t / S) * 100).toFixed(2)),
  r1: parseFloat((Math.exp(-t / 1) * 100).toFixed(2)),
})).filter(v => v.r > 1);

const App = () => (
  <div className="container">
    <div className="chart-wrapper">
      <LineChart width={800} height={450} data={R}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="r" stroke="#8884d8" />
        <Line type="monotone" dataKey="r1" stroke="#82ca9d" />
      </LineChart>
    </div>
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <h1>Topic</h1>
        <input type="text" name="Topic" id="topic" />
        <textarea name="description" id="description" />
      </div>
    </div>
  </div>
);

export default App;
