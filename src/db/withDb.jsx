import React from 'react';

import DbContext from './context';

const withDb = Component => props => (
  <DbContext.Consumer>{db => <Component {...props} db={db} />}</DbContext.Consumer>
);

export default withDb;
