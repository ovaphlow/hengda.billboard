import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import SchoolRouter from './school';
import IndustryRouter from './industry';
import Industry2Router from './industry2';
import MassMessage from './MassMessage';

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
        <Route path="/院校"><SchoolRouter /></Route>
        <Route path="/行业"><IndustryRouter /></Route>
        <Route path="/二级行业"><Industry2Router /></Route>
        <Route path="/群发消息"><MassMessage /></Route>
      </Switch>
    </Router>
  );
}
