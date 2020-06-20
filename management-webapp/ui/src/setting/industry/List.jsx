import React, { useState, useEffect } from 'react';

import Navbar from '../../component/Navbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/industry/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  return (
    <>
      <Navbar category="系统设置" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active" aria-current="page">行业</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/通知公告" className="btn btn-sm btn-info">
              通知/公告
            </a>

            <a href="#/行业" className="btn btn-sm btn-success">
              行业
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <a href="#/行业/新增" className="btn btn-sm btn-secondary">
              <i className="fa fa-fw fa-plus" />
              新增
            </a>
          </div>

          <div className="card-body">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>名称</th>
                  <th>备注</th>
                </tr>
              </thead>

              <tbody>
                {list.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#/行业/${it.id}?uuid=${it.uuid}`}>
                        <i className="fa fa-fw fa-edit" />
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.comment}</td>
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
