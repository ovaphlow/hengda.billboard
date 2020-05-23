import React, { Fragment, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [user_qty, setUserQty] = useState(0);
  const [enterprise_qty, setEnterpriseQty] = useState(0);
  const [delivery_qty, setDeliveryQty] = useState(0)

  return (
    <Fragment>
      <nav className="app-eader navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="#/">#TITLE#</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#/">
                首页
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" className="App-logo" />

          <div className="row">
            <div className="col">
              <div className="card bg-secondary shadow">
                <div className="card-body">
                  <p className="lead">用户数量</p>
                  <h1 className="display-1 text-center">{user_qty}</h1>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card bg-secondary shadow">
                <div className="card-body">
                  <p className="lead">企业数量</p>
                  <h1 className="display-1 text-center">{enterprise_qty}</h1>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card bg-secondary shadow">
                <div className="card-body">
                  <p className="lead">简历投递次数</p>
                  <h1 className="display-1 text-center">{delivery_qty}</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
