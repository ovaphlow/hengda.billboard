import React from 'react';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';

import List from './List';
import Detail from './Detail';

export default function router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/平台内容/校园招聘"><List /></Route>
        <Route exact path="/平台内容/校园招聘/新增"><Detail cat="新增" /></Route>
        <Route path="/平台内容/校园招聘/:id"><Detail cat="编辑" /></Route>
      </Switch>
    </Router>
  );
}
