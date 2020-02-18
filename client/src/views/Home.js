import React from 'react';
import { withRouter } from 'react-router-dom';

let Home = ({ history }) => {
  return (
    <div>
      <div>Hello World!</div>
      {/* TODO: show user info here */}
      <button type="button" onClick={() => history.push('/login')}>
        Logout
      </button>
    </div>
  );
};

Home = withRouter(Home);
export { Home };
export default Home;
