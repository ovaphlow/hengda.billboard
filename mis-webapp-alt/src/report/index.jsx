import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import List from './List';

ReactDOM.render(
  <React.StrictMode>
    <ReportRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function ReportRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
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
