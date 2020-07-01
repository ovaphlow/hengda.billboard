import React, { useEffect, useState } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import ComponentCertificateList from '../enterprise/ComponentCertificateList';

export default function CheckList() {
  const [certificate_qty, setCertificateQty] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/qty');
      const res = await response.json();
      setCertificateQty(res.content.qty);
    })();
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="待处理任务" />
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
                      返回
                    </button>
                  </div>
                  <span className="h1">待处理任务</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="current-user.html" className="text-reset text-decoration-none">
                          当前用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        待处理任务
                      </li>
                    </ol>
                  </nav>
                </div>

                {certificate_qty > 0 && (
                  <div className="mt-3 flex-grow-1">
                    <h2 className="text-center">待认证企业</h2>
                    <ComponentCertificateList />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
