import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import LogIn from './user/LogIn'
import SignIn from './user/SignIn'
import Recover from './user/Recover'
import HomeRouter from './home/Index'
import UserRouter from './user/Index'
import RecruitmentRouter from './recruitment/Index'
import MessageRouter from './message/Index'
import RecruitRouter from './recruit/Index'


export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/"><HomeRouter /></Route>
        <Route path="/主页"><HomeRouter /></Route>
        <Route path="/登录"><LogIn /></Route>
        <Route path="/注册"><SignIn /></Route>
        <Route path="/忘记密码"><Recover /></Route>
        <Route path="/岗位"><RecruitmentRouter /></Route>
        <Route path="/校园招聘"><RecruitRouter /></Route>
        <Route path="/消息"><MessageRouter /></Route>
        <Route path="/我的"><UserRouter /></Route>
      </Switch>
    </Router>
  )
}