import React, { useEffect } from 'react';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';

import List from './List';
import Detail from './Detail';

export default function CommonUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/普通用户"><List /></Route>
        <Route exact path="/普通用户/新增"><Detail category="新增" /></Route>
        <Route exact path="/普通用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
