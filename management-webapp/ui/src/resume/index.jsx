import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Detail from "./Detail";

ReactDOM.render(
  <React.StrictMode>
    <ResumeRouter />
  </React.StrictMode>,
  document.getElementById("app")
);

function ResumeRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Detail component_option="编辑" />
        </Route>
      </Switch>
    </Router>
  );
}
