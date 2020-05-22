import React, { useState, useEffect } from 'react';

import Title from './component/Title';
import Navbar from './component/Navbar';

export default function Home() {
  const [user_qty, setUserQty] = useState(0);
  const [enterprise_qty, setEnterpriseQty] = useState(0);
  const [delivery_qty, setDeliveryQty] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/stats/user/qty');
      const res = await response.json();
      setUserQty(res.content.qty);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/stats/enterprise/qty');
      const res = await response.json();
      setEnterpriseQty(res.content.qty);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/stats/delivery/qty');
      const res = await response.json();
      setDeliveryQty(res.content.qty);
    })();
  }, []);

  return (
    <>
      <Title />
      <Navbar category="首页" />

      <div className="container mt-3 mb-5">
        <h1>#SLOGAN#</h1>

        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <p className="lead">用户数量</p>
                <h1 className="display-1 text-center">{user_qty}</h1>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <p className="lead">企业数量</p>
                <h1 className="display-1 text-center">{enterprise_qty}</h1>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow">
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
