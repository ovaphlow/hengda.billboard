import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

ReactDOM.render(
  <React.StrictMode>
    <ResumeRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function ResumeRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/新增"><Detail category="新增" /></Route>
        <Route path="/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
