import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'
import List from './List'
import Favorite from './Favorite'
import ListDetails from './ListDetails'
import ResumeDetalis from './ResumeDetalis'

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
      <Navbar category="简历" />
      <Router>
        <Switch>
          <Route exact path="/简历/列表/" ><List /></Route>
          <Route exact path="/简历/列表/详情/:id/"><ListDetails /></Route>
          <Route exact path="/简历/收藏/"><Favorite /></Route>
          <Route exact path="/简历/详情/:id/"><ResumeDetalis /></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default Index