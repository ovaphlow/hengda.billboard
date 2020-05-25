import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

export default function router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/banner"><List /></Route>
        <Route exact path="/banner/新增"><Detail cat="新增" /></Route>
        <Route path="/banner/:id"><Detail cat="编辑" /></Route>
      </Switch>
    </Router>
  );
}
