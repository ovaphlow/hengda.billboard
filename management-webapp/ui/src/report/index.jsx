import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';

export default function ReportRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/举报"><List /></Route>
      </Switch>
    </Router>
  );
}
