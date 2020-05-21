import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';
import ContentRouter from './Content';
import MISUserRouter from './MISUser';
import EnterpriseRouter from './Enterprise';
import EnterpriseUserRouter from './EnterpriseUser';
import CommonUserRouter from './CommonUser';
import ResumeRouter from './Resume';
import DeliveryRouter from './Delivery';
import FavoriteRouter from './Favorite';
import JournalRouter from './Journal';
import FeedbackRouter from './Feedback';
import ReportRouter from './Report';
import RecruitmentRouter from './Recruitment';
import SettingsRouter from './Settings';
import CurrentUserRouter from './CurrentUser';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/登录"><SignIn /></Route>

        <Route path="/平台内容"><ContentRouter /></Route>
        <Route path="/管理端用户"><MISUserRouter /></Route>
        <Route path="/企业"><EnterpriseRouter /></Route>
        <Route path="/企业用户"><EnterpriseUserRouter /></Route>
        <Route path="/普通用户"><CommonUserRouter /></Route>
        <Route path="/简历"><ResumeRouter /></Route>
        <Route path="/投递记录"><DeliveryRouter /></Route>
        <Route path="/收藏"><FavoriteRouter /></Route>
        <Route path="/浏览记录"><JournalRouter /></Route>
        <Route path="/编辑记录"><JournalRouter /></Route>
        <Route path="/登录记录"><JournalRouter /></Route>
        <Route path="/投诉及反馈"><FeedbackRouter /></Route>
        <Route path="/举报"><ReportRouter /></Route>
        <Route path="/岗位"><RecruitmentRouter /></Route>
        <Route path="/系统设置"><SettingsRouter /></Route>
        <Route path="/当前用户"><CurrentUserRouter /></Route>
      </Switch>
    </Router>
  );
}
