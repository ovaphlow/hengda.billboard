import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import SignIn from './SignIn';
import ChangePassword from './ChangePassword';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function CurrentUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/登录"><SignIn /></Route>
        <Route exact path="/修改密码"><ChangePassword /></Route>
      </Switch>
    </Router>
  );
}
