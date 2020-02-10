import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SignIn from './SignIn'
import Home from './Home'
import MISUserRouter from './MISUser'
import EnterpriseRouter from './Enterprise'
import CommonUserRouter from './CommonUser'

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
        
        <Route path="/管理端用户"><MISUserRouter /></Route>
        <Route path="/企业"><EnterpriseRouter /></Route>
        <Route path="/普通用户"><CommonUserRouter /></Route>
      </Switch>
    </Router>
  )
}