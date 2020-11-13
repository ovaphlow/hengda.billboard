import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import List from './List';
import Details from './Details';
import Enterprise from './Enterprise';
import KeywordSearch from './KeywordSearch';

const RecruitmentRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/岗位/">
        <List />
      </Route>
      <Route path="/岗位/企业/:id">
        <Enterprise />
      </Route>
      <Route path="/岗位/查询/">
        <KeywordSearch />
      </Route>
      <Route path="/岗位/:id">
        <Details />
      </Route>
    </Switch>
  </Router>
);

export default RecruitmentRouter;
