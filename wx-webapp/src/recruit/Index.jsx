import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Details from './Details';

const RecruitRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/校园招聘/">
        <List />
      </Route>
      <Route exact path="/校园招聘/:id">
        <Details />
      </Route>
    </Switch>
  </Router>
);

export default RecruitRouter;
