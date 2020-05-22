import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';

export default function FavoriteRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/收藏"><List /></Route>
      </Switch>
    </Router>
  );
}
