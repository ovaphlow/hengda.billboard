import React, { useState, useEffect } from 'react';

import Navbar from '../../component/Navbar';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/mis-user/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <>
      <Navbar category="用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">平台用户</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>

            <a href="#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>

            <a href="#/普通用户" className="btn btn-sm btn-info">
              普通用户
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="btn-group">
          <a href="#/平台用户/新增" className="btn btn-sm btn-light">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </div>

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <table className="table table-dark table-striped">
              <caption>管理端用户</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>姓名</th>
                  <th>用户名</th>
                </tr>
              </thead>
              <tbody>
                {data.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#/平台用户/${it.id}?uuid=${it.uuid}`}>
                        <i className="fa fa-fw fa-edit" />
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
