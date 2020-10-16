import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import CheckList from "./CheckList";
import SignIn from "./SignIn";
import ChangePassword from "./ChangePassword";
import Info from "./Info";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserRouter />
  </React.StrictMode>,
  document.getElementById("app")
);

function CurrentUserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Info />
        </Route>
        <Route path="/待处理">
          <CheckList />
        </Route>
        <Route path="/登录">
          <SignIn />
        </Route>
        <Route path="/修改密码">
          <ChangePassword />
        </Route>
      </Switch>
    </Router>
  );
}
