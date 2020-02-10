import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SignIn from './SignIn'
import Home from './Home'
import MISUserRouter from './MISUser'
import EnterpriseRouter from './Enterprise'
import Position from './Position'
import Recruit from './Recruit'
import Message from './Message'

export default function App() {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (!!!auth) {
      // window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/登录"><SignIn /></Route>
        <Route path="/岗位"><Position /></Route>
        <Route path="/校园招聘"><Recruit /></Route>
        <Route path="/消息"><Message /></Route>
        <Route path="/我的"><MISUserRouter /></Route>
        <Route path="/企业"><EnterpriseRouter /></Route>
      </Switch>
    </Router>
  )
}