import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import List from './List';
import Detail from './Detail';

ReactDOM.render(
  <React.StrictMode>
    <CommonUserRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function CommonUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route exact path="/新增"><Detail category="新增" /></Route>
        <Route path="/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
