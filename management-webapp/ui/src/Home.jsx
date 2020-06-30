import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import TopNav from './component/TopNav';
import LeftNav from './component/LeftNav';
import Footer from './component/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Home() {
  const [user_qty, setUserQty] = useState(0);
  const [enterprise_qty, setEnterpriseQty] = useState(0);
  const [delivery_qty, setDeliveryQty] = useState(0);

  useEffect(() => {
    (async () => {
      let response = await window.fetch('/api/stats/user/qty');
      let res = await response.json();
      setUserQty(res.content.qty);

      response = await window.fetch('/api/stats/enterprise/qty');
      res = await response.json();
      setEnterpriseQty(res.content.qty);

      response = await window.fetch('/api/stats/delivery/qty');
      res = await response.json();
      setDeliveryQty(res.content.qty);
    })();
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="首页" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      <i className="fa fa-fw fa-angle-left" />
                      后退
                    </button>
                  </div>
                  <span className="h1">首页</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item active">
                        首页
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">用户数量</p>
                        <h1 className="display-1 text-center">{user_qty}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">企业数量</p>
                        <h1 className="display-1 text-center">{enterprise_qty}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">简历投递次数</p>
                        <h1 className="display-1 text-center">{delivery_qty}</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark shadow flex-grow-1 mt-3">
                  <div className="card-body">
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <Footer />
      </footer>
    </div>
  );
}
