import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

export default function ResumeRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/简历/新增"><Detail category="新增" /></Route>
        <Route path="/简历/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
