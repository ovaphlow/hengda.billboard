import React, { useState, useEffect } from 'react';

import { Title, Navbar } from '../Components';
import SideNav from './component/SideNav';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/mis-user/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setData(res.content);
    })();
  }, []);

  return (
    <>
      <Title />
      <Navbar category="管理端用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>管理端用户列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>姓名</th>
                      <th>用户名</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((it) => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#管理端用户/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.username}</td>
                        </tr>
                      ))
                    }
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
