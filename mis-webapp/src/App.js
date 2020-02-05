import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SignIn from './SignIn'
import Home from './Home'
import { UserRouter } from './User'

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
        
        <Route path="/用户"><UserRouter /></Route>
      </Switch>
    </Router>
  )
}