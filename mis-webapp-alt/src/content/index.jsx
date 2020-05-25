import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import BannerRouter from './banner';
import RecommendRouter from './recommend';
import TopicRouter from './topic';
import CampusRouter from './campus';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/banner"><BannerRouter /></Route>
        <Route path="/推荐信息"><RecommendRouter /></Route>
        <Route path="/热门话题"><TopicRouter /></Route>
        <Route path="/校园招聘"><CampusRouter /></Route>
      </Switch>
    </Router>
  );
}
