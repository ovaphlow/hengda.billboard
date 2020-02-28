import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Audition from './Audition'

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
      <Navbar category="消息" />
      <Router>
        <Switch>
          <Route exact path="/消息/面试/" ><Audition /></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default Index