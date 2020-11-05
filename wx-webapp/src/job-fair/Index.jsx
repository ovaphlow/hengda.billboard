import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Details from './Details';
import List from './List';

const RecruitRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/招聘会/">
        <List />
      </Route>
      <Route exact path="/招聘会/:id">
        <Details />
      </Route>
    </Switch>
  </Router>
);

export default RecruitRouter;
