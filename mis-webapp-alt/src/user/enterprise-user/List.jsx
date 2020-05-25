import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../ComponentSideNav';

export default function List() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = async () => {
    console.info(111)
  }

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
              <div className="card-header">
                <div className="form-row">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">姓名/用户名/电话</span>
                      </div>
                      <input type="text" value={filter} className="form-control" onChange={(event) => setFilter(event.target.value)} />
                    </div>
                  </div>

                  <div className="btn-group col-auto">
                    <button type="button" className="btn btn-info" onClick={handleFilter}>
                      <i className="fa fa-fw fa-search" />
                      查询
                    </button>

                    <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                      <i className="fa fa-fw fa-refresh" />
                      重置
                    </button>
                  </div>
                </div>
              </div>

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
