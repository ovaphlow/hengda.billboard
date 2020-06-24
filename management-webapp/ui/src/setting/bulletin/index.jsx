import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/通知公告"><List /></Route>
        <Route exact path="/通知公告/新增"><Detail cat="新增" /></Route>
        <Route path="/通知公告/:id"><Detail cat="编辑" /></Route>
      </Switch>
    </Router>
  );
}
