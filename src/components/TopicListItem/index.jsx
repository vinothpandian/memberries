import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const TopicListItem = ({
  retention, topicName, lastReviewed, to,
}) => {
  const Link = React.forwardRef((itemProps, ref) => (
    <RouterLink to={to} {...itemProps} ref={ref} />
  ));

  const PrimaryText = (
    <React.Fragment>
      <Typography variant="overline" color="textSecondary">
        {`Retention ${retention}%`}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {topicName}
      </Typography>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ListItem button component={Link} alignItems="flex-start">
        <ListItemText primary={PrimaryText} secondary={`Reviewed ${lastReviewed}`} />
      </ListItem>
      <Divider variant="fullWidth" />
    </React.Fragment>
  );
};

TopicListItem.propTypes = {
  retention: PropTypes.number.isRequired,
  topicName: PropTypes.string.isRequired,
  lastReviewed: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TopicListItem;
