import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Enterprise from './Enterprise'
import Update from './Update'

const Index = () => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (auth === null) {
      window.location = '#登录'
    }
  }, [])

  return (
    <div className="container-fluid">
      <Title />
      <Navbar category="信息" totalFlg />
      <Router>
        <Switch>
          <Route exact path="/信息/" ><Enterprise /></Route>
          <Route exact path="/信息/编辑/" ><Update /></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default Index