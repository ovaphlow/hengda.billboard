import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import HomeRouter from './home/Index'
import RecruitmentRouter from './recruitment/Index'
import ResumeRouter from './resume/Index'
import MessageRouter from './message/Index'
import EnterpriseRouter from './enterprise/Index'
import JournalRouter from './journal/Index'

import Login from './Login'
import SignIn from './SignIn'

export default function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/"><HomeRouter /></Route>
        <Route exact path="/登录"><Login /></Route>
        <Route exact path="/注册"><SignIn /></Route>
        <Route path="/岗位/"><RecruitmentRouter /></Route>
        <Route path="/简历/"><ResumeRouter /></Route>
        <Route path="/消息/"><MessageRouter /></Route>
        <Route path="/记录/"><JournalRouter /></Route>
        <Route path="/信息/"><EnterpriseRouter /></Route>
      </Switch>
    </Router>
  )
}