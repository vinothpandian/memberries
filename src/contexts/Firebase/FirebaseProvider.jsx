import React from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from './context';
import Firebase from './firebase';

const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>
);

FirebaseProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FirebaseProvider;
