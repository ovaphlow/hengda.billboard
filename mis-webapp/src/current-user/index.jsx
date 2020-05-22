import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import ChangePassword from './ChangePassword';

export default function CurrentUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/当前用户/修改密码"><ChangePassword /></Route>
      </Switch>
    </Router>
  );
}
