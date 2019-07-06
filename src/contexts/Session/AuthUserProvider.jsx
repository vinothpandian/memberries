import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import AuthUserContext from './context';
import Firebase, { withFirebase } from '../Firebase';

const AuthUserProvider = ({ children, firebase }) => {
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, [firebase, authUser]);

  return <AuthUserContext.Provider value={authUser}>{children}</AuthUserContext.Provider>;
};

AuthUserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default compose(withFirebase)(AuthUserProvider);
