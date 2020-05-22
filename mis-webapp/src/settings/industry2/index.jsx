import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

export default function SettingsRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/系统设置/二级行业/新增"><Detail category="新增" /></Route>
        <Route path="/系统设置/二级行业/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
