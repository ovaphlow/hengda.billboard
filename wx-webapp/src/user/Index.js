import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import User from './User'
import Resume from './Resume'
import Settings from './Settings'
import Feedback from './Feedback'
import Journal from './Journal'
import Favorite from './Favorite'
import Delivery from './Delivery'


const UserRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的"><User /></Route>
      <Route path="/我的/简历"><Resume /></Route>
      <Route exact path="/我的/设置"><Settings /></Route>
      <Route exact path="/我的/记录"><Journal /></Route>
      <Route exact path="/我的/收藏"><Favorite /></Route>
      <Route exact path="/我的/投递"><Delivery /></Route>
      <Route exact path="/我的/反馈"><Feedback /></Route>
    </Switch>
  </Router>
)


export default UserRouter