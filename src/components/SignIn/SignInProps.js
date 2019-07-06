import PropTypes from 'prop-types';

const valueProps = PropTypes.shape({
  email: PropTypes.string,
  password: PropTypes.string,
});

const errorProps = PropTypes.shape({
  email: PropTypes.bool,
  password: PropTypes.bool,
});

export { errorProps, valueProps };
