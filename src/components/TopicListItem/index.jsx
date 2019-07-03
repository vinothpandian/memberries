import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import * as moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const fetchLastReview = (reviews) => {
  const review = reviews.sort((a, b) => b - a)[reviews.length - 1];
  return moment(review).fromNow();
};

const TopicListItem = ({
  id, name, retention, lastReviewed,
}) => {
  const lastReviewFromNow = lastReviewed ? fetchLastReview(lastReviewed) : '';

  const Link = React.forwardRef((itemProps, ref) => (
    <RouterLink to={`/review/${id}`} {...itemProps} ref={ref} />
  ));

  const PrimaryText = (
    <React.Fragment>
      <Typography variant="overline" color="textSecondary">
        {`Retention ${retention.toFixed(2)}%`}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {name}
      </Typography>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ListItem button component={Link} alignItems="flex-start">
        <ListItemText primary={PrimaryText} secondary={`Reviewed ${lastReviewFromNow}`} />
      </ListItem>
      <Divider variant="fullWidth" />
    </React.Fragment>
  );
};

TopicListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  retention: PropTypes.number.isRequired,
  lastReviewed: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TopicListItem;
