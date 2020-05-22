import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

export default function RecruitmentRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/岗位/:recruitment_id"><Detail cat="编辑" /></Route>
      </Switch>
    </Router>
  );
}
