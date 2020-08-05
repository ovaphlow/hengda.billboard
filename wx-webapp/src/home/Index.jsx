import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import RecommendDetails from './RecommendDetails';
import TopicDetails from './TopicDetails';
import Banner from './Banner';
import KeywordSearch from './KeywordSearch';

const HomeRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/"><HomePage /></Route>
      <Route path="/主页/消息详情/:id"><RecommendDetails /></Route>
      <Route path="/主页/话题详情/:id"><TopicDetails /></Route>
      <Route path="/主页/查询/"><KeywordSearch /></Route>
      <Route path="/主页/banner/:id"><Banner /></Route>
    </Switch>
  </Router>
);

export default HomeRouter;
