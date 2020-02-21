import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import BrowseJournal from './BrowseJournal'
import LoginJournal from './LoginJournal'
import EditJournal from './EditJournal'
import ReportJournal from './ReportJournal'
import ComplaintJournal from './ComplaintJournal'

const JournalRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的/记录/浏览"><BrowseJournal /></Route>
      <Route exact path="/我的/记录/登录"><LoginJournal /></Route>
      <Route exact path="/我的/记录/编辑"><EditJournal /></Route>
      <Route exact path="/我的/记录/举报"><ReportJournal /></Route>
      <Route exact path="/我的/记录/投诉"><ComplaintJournal /></Route>
    </Switch>
  </Router>
)


export default JournalRouter