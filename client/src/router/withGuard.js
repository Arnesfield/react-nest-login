import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  authDefRoute,
  visitorDefRoute,
  authRoutes,
  visitorRoutes
} from './routes';
import { withAuth } from '.';

// routeProps type
// false | {
//   to: string | object,
//   redirect: boolean,
// }

export function withGuard(
  Component,
  authRouteProps = { to: authDefRoute, redirect: true },
  visitorRouteProps = { to: visitorDefRoute, redirect: true }
) {
  let GuardComponent = props => {
    // TODO: use token in checking?
    const { history, location, isAuth } = props;
    const { pathname: to } = location;

    // check is auth and use respective routeProps
    const isAuthVal = isAuth();
    const routeProps = isAuthVal ? authRouteProps : visitorRouteProps;

    const toInAuthRoutes = authRoutes.includes(to);
    const toInVisitorRoutes = visitorRoutes.includes(to);
    const toInNeutralRoutes = !(toInAuthRoutes || toInVisitorRoutes);
    // valid if either in netural routes or conditionally in auth/visitor routes
    const validTo =
      toInNeutralRoutes || (isAuthVal ? toInAuthRoutes : toInVisitorRoutes);

    // if not valid, well you redirect duh
    if (routeProps && routeProps.redirect && !validTo) {
      const next =
        (routeProps && routeProps.to) ||
        (isAuthVal ? authDefRoute : visitorDefRoute);

      setImmediate(() => history.replace(next));
      return null;
    } else {
      return <Component {...props} />;
    }
  };

  return withRouter(withAuth(GuardComponent));
}

export default withGuard;
