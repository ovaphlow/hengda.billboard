import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import HomeRouter from './home/Index'
import RecruitmentRouter from './recruitment/Index'
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
      </Switch>
    </Router>
  )
}