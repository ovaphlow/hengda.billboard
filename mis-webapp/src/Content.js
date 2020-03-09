import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { Title, Navbar, BackwardButton } from './Components'

export default function MISUserRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/平台内容/banner"><Banner /></Route>
      </Switch>
    </Router>
  )
}

function SideNav(props) {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a href="#平台内容/banner"
          className={`text-small list-group-item list-group-item-action ${props.category === 'banner' ? 'active' : ''}`}
        >
          BANNER
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function Banner() {
  return (
    <>
      <Title />
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="banner" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>BANNER</h3>
            <hr />

            <div className="card shadow">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
