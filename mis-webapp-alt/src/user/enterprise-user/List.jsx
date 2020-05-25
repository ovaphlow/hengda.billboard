import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../ComponentSideNav';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/enterprise-user/', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      });
      const res = await response.json();
      setList(res.content);
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
            <h3>企业用户</h3>
            <hr />

            <div className="card bg-dark shadow">
              <div className="card-body">
                <table className="table table-dark table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>用户</th>
                      <th>电话</th>
                      <th>企业</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((it) => (
                      <tr key={it.id}>
                        <td className="text-right">
                          <span className="pull-left">
                            <a href={`#/企业用户/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                          </span>
                          {it.id}
                        </td>
                        <td>
                          {it.name}
                          <br />
                          <small className="text-secondary">{it.username}</small>
                        </td>
                        <td>{it.phone}</td>
                        <td>
                          {it.enterprise}
                          &nbsp;
                          <a href={`enterprise.html#/${it.enterprise_id}?uuid=${it.enterprise_uuid}`}>
                            <i className="fa fa-fw fa-link" />
                          </a>
                        </td>
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
