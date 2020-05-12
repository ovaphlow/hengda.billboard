import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import List from './List'
import Chat from './Chat'
// import Offer from './Offer'

const MessageRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/消息/"><List /></Route>
      {/* <Route exact path="/消息/邀请/"><Offer /></Route> */}
      <Route path="/消息/:title/:user_id/"><Chat /></Route>
    </Switch>
  </Router>
)

export default MessageRouter