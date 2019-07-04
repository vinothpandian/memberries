import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import randomColor from 'randomcolor';
import { calculateRetention } from '../../utils/retention';

const colors = randomColor({ count: 5, seed: 2 });

const useStyles = makeStyles(() => ({
  fontColor: {
    color: 'red !important',
  },
}));

const DefaultGraph = () => {
  const classes = useStyles();
  const days = [...Array(100).keys()];

  const data = days
    .map(day => ({
      day,
      'Very easy': calculateRetention(-day, 5),
      Easy: calculateRetention(-day, 4),
      Medium: calculateRetention(-day, 3),
      Hard: calculateRetention(-day, 2),
      'Very hard': calculateRetention(-day, 1),
    }))
    .filter(v => v['Very easy'] > 10);

  return (
    <ResponsiveContainer width="40%" height={450}>
      <LineChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend className={classes.fontColor} />
        <Line type="monotone" dataKey="Very easy" stroke={colors[0]} />
        <Line type="monotone" dataKey="Easy" stroke={colors[1]} />
        <Line type="monotone" dataKey="Medium" stroke={colors[2]} />
        <Line type="monotone" dataKey="Hard" stroke={colors[3]} />
        <Line type="monotone" dataKey="Very hard" stroke={colors[4]} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DefaultGraph;
