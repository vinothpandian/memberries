import React, { useState, useEffect } from 'react';
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

import { makeStyles } from '@material-ui/core/styles';
import { Database, withDb } from '../../db';
import { updateRetentionForATopic } from '../../utils';
import { getGraphDataForATopic } from '../../utils/graph';

const useStyles = makeStyles(() => ({}));

const TopicGraph = ({ db, match }) => {
  const [topic, setTopic] = useState({});
  const [graphData, setGraphData] = useState([]);

  const { id } = match.params;
  const classes = useStyles();

  useEffect(() => {
    async function fetchTopic(topicID) {
      const fetchedTopic = await db.getTopic(topicID);
      if (fetchedTopic) {
        const processedTopic = updateRetentionForATopic(fetchedTopic);
        const processedGraphData = getGraphDataForATopic(processedTopic);
        setTopic(processedTopic);
        setGraphData(processedGraphData);
      }
    }

    function resetState() {
      setTopic([]);
      setGraphData([]);
    }

    fetchTopic(id);

    return resetState;
  }, [db, id]);

  return (
    <ResponsiveContainer width="40%" height={450}>
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
        <Tooltip labelFormatter={value => `Day ${value}`} />
        <Line
          unit="%"
          key={topic.name}
          type="monotone"
          stroke="red"
          dataKey={`Retention of ${topic.id}`}
        />
        <Line
          unit="%"
          key={topic.id}
          type="monotone"
          strokeDasharray="3 3"
          stroke="blue"
          dataKey={`Projected Retention of ${topic.id}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

TopicGraph.defaultProps = {
  match: {
    params: {
      id: 'c9dC1SXtD',
    },
  },
};

TopicGraph.propTypes = {
  db: PropTypes.instanceOf(Database).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default withDb(TopicGraph);
