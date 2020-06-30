import React, { useEffect, useState } from 'react';

import Navbar from '../component/Navbar';
import ComponentCertificateList from '../enterprise/ComponentCertificateList';
import IconPlayListCheck from '../icon/PlayListCheck';

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
    <>
      <Navbar category="当前用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active" aria-current="page">待处理</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/待处理" className="btn btn-sm btn-info">
              <IconPlayListCheck />
              待处理
            </a>

            <a href="#/修改密码" className="btn btn-sm btn-warning">
              修改密码
            </a>

            <a href="#/登录" className="btn btn-sm btn-danger">
              退出登录
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      {certificate_qty > 0 && (
        <div className="container-lg">
          <h2>待认证企业</h2>
          <ComponentCertificateList />
        </div>
      )}
    </>
  );
}
