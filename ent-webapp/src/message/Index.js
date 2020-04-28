import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Title from '../components/Title'
// import Footer from '../components/Footer'
import Audition from './Audition'
import Offer from './Offer'
import Sys from './Sys'

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
      <Router>
        <Switch>
          <Route exact path="/消息/会话/" ><Audition /></Route>
          <Route exact path="/消息/邀请/"><Offer/></Route>  
          <Route exact path="/消息/系统/"><Sys/></Route>  
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  )
}

export default Index