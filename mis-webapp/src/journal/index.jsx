import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';

export default function JournalRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/编辑记录"><List category="编辑" /></Route>
        <Route path="/登录记录"><List category="登录" /></Route>
        <Route path="/浏览记录"><List category="浏览" /></Route>
      </Switch>
    </Router>
  );
}
