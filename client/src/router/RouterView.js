import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as View from '../views';
import * as ErrorView from '../views/errors';
import { AuthRoute, GuestRoute } from '.';

let RouterView = () => (
  <Switch>
    <AuthRoute exact path="/" component={View.Home} roles={[1, 2]} />
    <GuestRoute path="/login" component={View.Login} />
    <Route path="/about" component={View.About} />
    <Route path="*" component={ErrorView.NotFound} />
  </Switch>
);

export { RouterView };
export default RouterView;
