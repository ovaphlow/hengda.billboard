import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './HomePage'
import MessageDetails from './MessageDetails'

const HomeRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/"><HomePage /></Route>
      <Route path="/主页/消息详情/:id"><MessageDetails /></Route>
    </Switch>
  </Router>
)

export default HomeRouter