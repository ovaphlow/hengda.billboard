import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './component/Navbar';

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
    <>
      <Navbar category="首页" />

      <div className="container">
        <div className="row mt-5">
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
      </div>
    </>
  );
}
