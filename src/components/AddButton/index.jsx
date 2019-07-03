import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AddButton = () => {
  const classes = useStyles();

  const RouterLink = React.forwardRef((props, ref) => <Link ref={ref} {...props} />);

  return (
    <Fab
      aria-label="Add"
      className={classes.fab}
      variant="extended"
      color="secondary"
      component={RouterLink}
      to="/add"
    >
      <AddIcon className={classes.extendedIcon} />
      Add
    </Fab>
  );
};

export default AddButton;
