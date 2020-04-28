import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
// import Footer from '../components/Footer'
import List from './List'
import Save from './Save'
import Update from './Update'

const Index = () => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (auth === null) {
      window.location = '#登录'
    }
  }, [])

  return (
    <div className="container-fluid pb-5">
      <Title />
      <Navbar category="岗位" totalFlg />
      <Router>
        <Switch>
          <Route exact path="/岗位/列表/" ><List /></Route>
          <Route exact path="/岗位/新增/" ><Save /></Route>
          <Route exact path="/岗位/编辑/:id/" ><Update /></Route>
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  )
}

export default Index