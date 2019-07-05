import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { Map } from 'immutable';
import { useDispatch } from 'react-redux';
import { findRecentReview } from '../../utils/date';
import ColorAvatar from '../ColorAvatar';
import { deleteTopic } from '../../actions';
import Warning from './Warning';

const TopicListItem = ({ topic }) => {
  const [open, setOpen] = React.useState(false);

  const id = topic.get('id');
  const color = topic.get('color');
  const name = topic.get('name');
  const retention = topic.get('retention');
  const lastReviewed = topic.get('lastReviewed');

  const lastReviewFromNow = lastReviewed
    ? findRecentReview(lastReviewed, { asMoment: true }).fromNow()
    : '';

  const Link = React.forwardRef((itemProps, ref) => (
    <RouterLink to={`/review/${id}`} {...itemProps} ref={ref} />
  ));

  const handleWarning = state => () => {
    setOpen(state);
  };

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
        <ListItemSecondaryAction>
          <IconButton edge="start" aria-label="Delete" onClick={handleWarning(true)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="fullWidth" />
      <Warning
        open={open}
        handleClose={handleWarning(false)}
        retention={retention}
        id={id}
        name={name}
      />
    </React.Fragment>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.instanceOf(Map).isRequired,
};

export default TopicListItem;
