import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
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
      className={classes.fab}
      variant="extended"
      color="secondary"
      aria-label="Delete"
      component={RouterLink}
      to="/add"
    >
      <AddIcon className={classes.extendedIcon} />
      Add
    </Fab>
  );
};

export default AddButton;
