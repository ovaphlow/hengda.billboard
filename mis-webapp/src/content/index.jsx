import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import BannerRouter from './banner'
import RecommendRouter from './recommend'
import TopicRouter from './topic'
import CampusRouter from './campus'

export default function ContentRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/平台内容/banner"><BannerRouter /></Route>
        <Route exact path="/平台内容/推荐信息"><RecommendRouter /></Route>
        <Route exact path="/平台内容/热门话题"><TopicRouter /></Route>
        <Route exact path="/平台内容/校园招聘"><CampusRouter /></Route>
      </Switch>
    </Router>
  );
}
