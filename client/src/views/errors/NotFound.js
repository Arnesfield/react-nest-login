import React from 'react';
import { withRouter } from 'react-router-dom';

let NotFound = ({ history }) => (
  <div>
    <div>Page not found.</div>
    <button type="button" onClick={() => history.push('/')}>
      Go back
    </button>
  </div>
);

NotFound = withRouter(NotFound);
export { NotFound };
export default NotFound;
