import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import history from './history'
import LogIn from './user/LogIn'
import SignIn from './user/SignIn'
import HomeRouter from './home/Index'
import UserRouter from './user/Index'
import RecruitmentRouter from './recruitment/Index'
import MessageRouter from './message/Index'
import Recruit from './Recruit'


export default function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/"><HomeRouter /></Route>
        <Route path="/主页"><HomeRouter /></Route>
        <Route path="/登录"><LogIn /></Route>
        <Route path="/注册"><SignIn /></Route>
        <Route path="/岗位"><RecruitmentRouter /></Route>
        <Route path="/校园招聘"><Recruit /></Route>
        <Route path="/消息"><MessageRouter /></Route>
        <Route path="/我的"><UserRouter /></Route>
      </Switch>
    </Router>
  )
}