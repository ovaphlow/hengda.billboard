import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';

import Home from './Home';
import Topic from './topic';
import Banner from './Banner';

const Index = () => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <>
      <div className="container-fluid pb-4">
        <Title />
        <Navbar category="首页" totalFlg />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/首页/banner/:id">
              <Banner />
            </Route>
            <Route exact path="/首页/:id/">
              <Topic />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
};

export default Index;
