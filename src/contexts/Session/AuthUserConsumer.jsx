import * as React from 'react';

import AuthUserContext from './context';

const withAuthUser = (property = 'all') => Component => props => (
  <AuthUserContext.Consumer>
    {(authUser) => {
      if (authUser && property in authUser) {
        return <Component {...props} user={authUser[property]} />;
      }
      return <Component {...props} user={authUser} />;
    }}
  </AuthUserContext.Consumer>
);

export default withAuthUser;
