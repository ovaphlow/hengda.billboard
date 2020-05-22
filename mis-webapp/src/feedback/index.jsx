import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Complaint from './Complaint';
import Feedback from './Feedback';

export default function FeedbackRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/投诉及反馈/投诉"><Complaint /></Route>
        <Route path="/投诉及反馈/意见反馈"><Feedback /></Route>
      </Switch>
    </Router>
  );
}
