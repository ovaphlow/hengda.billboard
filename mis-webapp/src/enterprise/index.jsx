import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import CertificateList from './CertificateList';
import Detail from './Detail';
import UserDetail from './UserDetail';

export default function EnterpriseRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/企业"><List /></Route>
        <Route exact path="/企业/待认证"><CertificateList /></Route>
        <Route exact path="/企业/新增"><Detail category="新增" /></Route>
        <Route exact path="/企业/:id"><Detail category="编辑" /></Route>
        <Route path="/企业/:id/新增用户"><UserDetail category="新增" /></Route>
        <Route path="/企业/:id/编辑用户/:user_id"><UserDetail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
