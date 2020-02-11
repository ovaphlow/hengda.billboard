import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import LogIn from './LogIn'
import SignIn from './SignIn'
import HomeRouter from './home/Index'
import UserRouter from './User'
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
        <Route exact path="/"><HomeRouter /></Route>
        <Route path="/主页"><HomeRouter /></Route>
        <Route path="/登录"><LogIn /></Route>
        <Route path="/注册"><SignIn /></Route>
        <Route path="/岗位"><Position /></Route>
        <Route path="/校园招聘"><Recruit /></Route>
        <Route path="/消息"><Message /></Route>
        <Route path="/我的"><UserRouter /></Route>
      </Switch>
    </Router>
  )
}