import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import MISUserRouter from './mis-user';
import EnterpriseUserRouter from './enterprise-user';
import CommonUserRouter from './common-user';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/平台用户"><MISUserRouter /></Route>
        <Route path="/企业用户"><EnterpriseUserRouter /></Route>
        <Route path="/普通用户"><CommonUserRouter /></Route>
      </Switch>
    </Router>
  );
}
