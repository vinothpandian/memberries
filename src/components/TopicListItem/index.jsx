import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { findRecentReview } from '../../utils/date';
import ColorAvatar from '../ColorAvatar';

const TopicListItem = ({
  id, name, retention, lastReviewed, color,
}) => {
  const lastReviewFromNow = lastReviewed
    ? findRecentReview(lastReviewed, { asMoment: true }).fromNow()
    : '';

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
      <ListItem button component={Link} alignItems="center">
        <ListItemAvatar>
          <ColorAvatar color={color} />
        </ListItemAvatar>
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
  lastReviewed: PropTypes.arrayOf(
    PropTypes.shape({
      reviewDate: PropTypes.number,
      difficulty: PropTypes.number,
    }),
  ).isRequired,
  color: PropTypes.string.isRequired,
};

export default TopicListItem;
