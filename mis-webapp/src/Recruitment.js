import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { RecruitmentDetail } from './Enterprise'

export default function RecruitmentRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/岗位/:recruitment_id"><RecruitmentDetail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

