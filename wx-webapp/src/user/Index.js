import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import User from './User'
import Resume from './Resume'
import Settings from './Settings'
import Feedback from './Feedback'
import JournalRouter from './journal/Index'
import Favorite from './Favorite'
import Delivery from './Delivery'
import Report from './Report'

const UserRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的"><User /></Route>
      <Route path="/我的/简历"><Resume /></Route>
      <Route path="/我的/记录"><JournalRouter /></Route>
      <Route exact path="/我的/设置"><Settings /></Route>
      <Route exact path="/我的/收藏"><Favorite /></Route>
      <Route exact path="/我的/投递"><Delivery /></Route>
      <Route exact path="/我的/反馈"><Feedback /></Route>
      <Route exact path="/我的/举报/:id/:category"><Report /></Route>
    </Switch>
  </Router>
)


export default UserRouter