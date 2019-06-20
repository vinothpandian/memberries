import React from 'react';
import './App.scss';

import {
  ComposedChart, XAxis, YAxis, Legend, CartesianGrid, Area, Line, Tooltip,
} from 'recharts';

console.log(Math.E);

const T = 0;
const S = 100;

[1, 2, 3, 4, 5].forEach((value) => {});

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const App = () => (
  <div className="container">
    <div className="chart-wrapper">
      <ComposedChart width={800} height={450} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
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
