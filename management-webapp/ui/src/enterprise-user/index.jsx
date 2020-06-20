import React, { useEffect } from 'react';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import Detail from './Detail';

export default function EnterpriseUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/企业用户/新增"><Detail category="新增" /></Route>
        <Route path="/企业用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
