import React from 'react';
import PropTypes from 'prop-types';

import DbContext from './context';
import Database from './database';

const DbProvider = ({ children }) => (
  <DbContext.Provider value={new Database()}>{children}</DbContext.Provider>
);

DbProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DbProvider;
