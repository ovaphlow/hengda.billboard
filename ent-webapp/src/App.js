import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Hoem'

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
      </Switch>
    </Router>
  )
}