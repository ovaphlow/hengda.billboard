import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'
import List from './List'


const Index = () => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <div className="container-fluid">
      <Title />
      <Navbar category="岗位" />
      <Router>
        <Switch>
          <Route exact path="/岗位/列表/" ><List /></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default Index