import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import SchoolRouter from './school';
import IndustryRouter from './industry';
import Industry2Router from './industry2';

export default function SettingsRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/系统设置/院校"><SchoolRouter /></Route>
        <Route exact path="/系统设置/行业"><IndustryRouter /></Route>
        <Route exact path="/系统设置/二级行业"><Industry2Router /></Route>
      </Switch>
    </Router>
  );
}
