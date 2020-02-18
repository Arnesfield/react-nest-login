import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as View from '../views';

export default function RouterView() {
  return (
    <Switch>
      <Route path="/login">
        <View.Login />
      </Route>
      <Route path="/">
        <View.Home />
      </Route>
    </Switch>
  );
}
