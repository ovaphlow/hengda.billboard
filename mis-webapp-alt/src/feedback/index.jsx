import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import Complaint from './Complaint';
import Feedback from './Feedback';

ReactDOM.render(
  <React.StrictMode>
    <FeedbackRouter />
  </React.StrictMode>,
  document.getElementById('app'),
);

function FeedbackRouter() {
  useEffect(() => {
    window.console.info(111);
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/投诉"><Complaint /></Route>
        <Route path="/意见反馈"><Feedback /></Route>
      </Switch>
    </Router>
  );
}
