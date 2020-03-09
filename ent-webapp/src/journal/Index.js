import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Edit from './Edit'
import Login from './Login'
import Report from './Report'

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
      <Navbar category="记录" totalFlg />
      <Router>
        <Switch>
          <Route exact path="/记录/登录/" ><Login/></Route>
          <Route exact path="/记录/操作/" ><Edit/></Route>
          <Route exact path="/记录/举报/" ><Report/></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default Index