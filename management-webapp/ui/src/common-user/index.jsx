import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route path="/:id"><Detail component_option="编辑" /></Route>
      </Switch>
    </Router>
  );
}
