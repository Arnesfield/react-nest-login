import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../components/User/UserContext';

let Home = ({ history }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>Hello {user.username}!</div>
      <button type="button" onClick={() => history.push('/login')}>
        Logout
      </button>
    </div>
  );
};

Home = withRouter(Home);
export { Home };
export default Home;
