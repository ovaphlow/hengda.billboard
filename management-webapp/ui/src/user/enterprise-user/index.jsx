import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/企业用户"><List /></Route>
        <Route exact path="/企业用户/新增"><Detail category="新增" /></Route>
        <Route path="/企业用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
