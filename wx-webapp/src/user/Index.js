import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import User from './User'
import Resume from './Resume'
import Settings from './Settings'


const UserRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的"><User /></Route>
      <Route path="/我的/简历"><Resume /></Route>
      <Route exact path="/我的/设置"><Settings /></Route>
    </Switch>
  </Router>
)


export default UserRouter