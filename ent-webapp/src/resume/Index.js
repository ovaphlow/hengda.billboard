import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'
import List from './List'
import Favorite from './Favorite'
import ListDetails from './ListDetails'
import ResumeDetalis from './ResumeDetalis'
import Retrieval from './Retrieval'
import Recommend from './Recommend'

const Index = () => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (auth === null) {
      window.location = '#登录'
    }
  }, [])

  return (
    <>
      <div className="container-fluid pb-4">
        <Title />
        <Navbar category="简历" totalFlg />
        <Router>
          <Switch>
            <Route exact path="/简历/列表/" ><List /></Route>
            <Route exact path="/简历/列表/详情/:id/"><ListDetails /></Route>
            <Route exact path="/简历/收藏/"><Favorite /></Route>
            <Route path="/简历/:category/详情/:id/"><ResumeDetalis /></Route>
            <Route exact path="/简历/检索/"><Retrieval /></Route>
            <Route exact path="/简历/推荐/"><Recommend /></Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default Index