import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: theme.spacing(2),
  },
  container: {
    marginLeft: -theme.spacing(1.5),
  },
}));

const DifficultyButtons = ({
  name,
  size,
  value,
  setFieldValue,
  error,
  helperText,
  handleBlur,
  label,
}) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    if (newValue) {
      setFieldValue(name, newValue, true);
    }
  };

  const buttons = [1, 2, 3, 4, 5].map(i => (
    <ToggleButton key={i} value={i}>
      {i}
    </ToggleButton>
  ));

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12} container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography className={classes.label} align="left" variant="caption" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          name={name}
          size={size}
          value={value}
          exclusive
          onChange={handleChange}
          onBlur={() => {
            handleBlur(name);
          }}
        >
          {buttons}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        {error && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

DifficultyButtons.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  value: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default DifficultyButtons;
