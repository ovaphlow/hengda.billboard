import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import List from "./List";

ReactDOM.render(
  <React.StrictMode>
    <FavoriteRouter />
  </React.StrictMode>,
  document.getElementById("app")
);

function FavoriteRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}
