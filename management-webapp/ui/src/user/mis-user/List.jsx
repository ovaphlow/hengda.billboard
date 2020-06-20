import React, { useState, useEffect } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../ComponentSideNav';
import Toolbar from './ComponentToolbar';

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

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>平台用户</h3>
            <hr />

            <Toolbar />

            <div className="card bg-dark shadow">
              <div className="card-body">
                <table className="table table-dark table-striped">
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
        </div>
      </div>
    </>
  );
}
