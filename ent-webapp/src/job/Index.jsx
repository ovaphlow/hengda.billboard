import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';
import List from './List';
import Update from './Update';

const Index = () => {
  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if (auth === null) {
      window.location = '#登录';
    } else {
      fetch(`./api/enterprise/check/${auth.enterprise_id}?uuid=${auth.enterprise_uuid}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
            window.location = '#岗位';
          } else if (!res.content) {
            window.alert('您的企业尚未完成认证!');
            window.location = '#岗位';
          }
        });
    }
  }, []);

  return (
    <>
      <div className="flex-shrink-0">
        <div className="container-fluid pb-4">
          <Title />
          <Navbar category="招聘会" totalFlg />
          <Router>
            <Switch>
              <Route exact path="/招聘会/列表/">
                <List />
              </Route>
              <Route exact path="/招聘会/报名/:id/">
                <Update />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
