import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { SIGN_IN_URL } from "../constant";
import List from "./List";

ReactDOM.render(
  <React.StrictMode>
    <JournalRouter />
  </React.StrictMode>,
  document.getElementById("app")
);

function JournalRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem("mis-auth");
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/编辑">
          <List component_option="编辑" />
        </Route>
        <Route path="/登录">
          <List component_option="登录" />
        </Route>
        <Route path="/浏览">
          <List component_option="浏览" />
        </Route>
      </Switch>
    </Router>
  );
}
