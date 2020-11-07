import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Title from '../components/Title';
import Footer from '../components/Footer';
import Register from '../operation/Register';
import Certification from '../operation/Certification';

const Index = () => {
  return (
    <>
      <div className="container-fluid pb-4">
        <Title />
        <Router>
          <Switch>
            <Route exact path="/操作手册/注册">
              <Register />
            </Route>
            <Route exact path="/操作手册/企业认证">
              <Certification />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
};

export default Index;
