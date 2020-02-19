import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as View from '../views';
import * as ErrorView from '../views/errors';

let RouterView = () => (
  <Switch>
    <Route exact path="/" component={View.Home} />
    <Route path="/login" component={View.Login} />
    <Route path="/about" component={View.About} />
    <Route path="*" component={ErrorView.NotFound} />
  </Switch>
);

export { RouterView };
export default RouterView;
