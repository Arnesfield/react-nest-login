import React, { useContext } from 'react';
import { UserContext } from '../components/User/UserContext';

export const withAuth = Component => props => {
  const { user } = useContext(UserContext);

  // either no user or check if roles match
  const isAuth = (roles = []) => {
    if (!roles.length || !user) {
      return !!user;
    }

    return roles.some(role => user.roles.includes(role));
  };

  return <Component {...props} {...{ $user: user, isAuth }} />;
};

export default withAuth;
