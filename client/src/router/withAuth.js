import React, { useContext } from 'react';
import { UserContext } from '../components/User/UserContext';

export const withAuth = Component => props => {
  const { user } = useContext(UserContext);

  // either no user or check if roles match
  const isAuth = (roles = []) => {
    if (!roles.length || !user) {
      return !!user;
    }

    // TODO: stonks, temporary roles arr
    const userRoles = user.roles || [user.id];
    const rolesMatch = roles.some(role => userRoles.includes(role));
    return rolesMatch;
  };

  return <Component {...props} {...{ isAuth }} />;
};

export default withAuth;
