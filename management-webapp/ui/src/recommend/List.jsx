import React, { useState, useEffect } from 'react';

import Navbar from '../component/Navbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/content/recommend/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  return (
    <>
      <Navbar category="推荐信息" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">推荐信息</li>
            </ol>
          </h1>
        </nav>
        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="btn-group">
          <a href="#/新增" className="btn btn-sm btn-light">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </div>

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <table className="table table-dark table-striped">
              <caption>推荐信息</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>分类</th>
                  <th>标题</th>
                  <th>发布/截止日期</th>
                </tr>
              </thead>

              <tbody>
                {list.map((it) => (
                  <tr key={it.id}>
                    <td className="text-right">
                      <span className="pull-left">
                        <a href={`#/${it.id}?uuid=${it.uuid}`}>
                          <i className="fa fa-fw fa-edit" />
                        </a>
                      </span>
                      {it.id}
                    </td>
                    <td>{it.category}</td>
                    <td>{it.title}</td>
                    <td>
                      {it.date1}
                      <br />
                      {it.date2}
                    </td>
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
