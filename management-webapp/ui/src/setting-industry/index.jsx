import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import List from './List';
import Detail from './Detail';
import Level2Detail from './Level2Detail';

ReactDOM.render(
  <React.StrictMode>
    <SettingRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function SettingRouter() {
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
        <Route exact path="/二级行业/新增"><Level2Detail component_option="新增" /></Route>
        <Route exact path="/二级行业/:id"><Level2Detail component_option="编辑" /></Route>
        <Route exact path="/新增"><Detail component_option="新增" /></Route>
        <Route path="/:id"><Detail component_option="编辑" /></Route>
      </Switch>
    </Router>
  );
}
