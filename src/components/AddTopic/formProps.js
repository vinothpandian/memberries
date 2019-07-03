import PropTypes from 'prop-types';

const valueProps = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  difficulty: PropTypes.number,
});

const errorOrTouchedProps = PropTypes.shape({
  name: PropTypes.bool,
  description: PropTypes.bool,
  difficulty: PropTypes.bool,
});

export { errorOrTouchedProps };

export default valueProps;
