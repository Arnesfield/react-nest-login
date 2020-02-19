import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../utils';
import { getRouteFromRoles } from './helpers';
import { authDefRoute, guestDefRoute, roleDefaultRedirects } from './constants';

const makeAuthRoute = (defaultRedirectPath, authCheckAgainst = true) => {
  const BaseAuthRoute = ({
    component: Component,
    roles,
    redirectPath,
    roleRedirector,
    $user,
    isAuth,
    ...routeProps
  }) => (
    <Route
      {...routeProps}
      render={props => {
        if (isAuth(roles) === authCheckAgainst) {
          return <Component {...props} />;
        }

        roleRedirector = {
          ...roleDefaultRedirects,
          ...roleRedirector
        };

        const next =
          getRouteFromRoles($user && $user.roles, roleRedirector) ||
          redirectPath ||
          defaultRedirectPath;

        return (
          <Redirect
            to={{
              pathname: next,
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );

  return withAuth(BaseAuthRoute);
};

export const AuthRoute = makeAuthRoute(guestDefRoute);
export const GuestRoute = makeAuthRoute(authDefRoute, false);
