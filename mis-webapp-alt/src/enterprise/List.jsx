import React, { useState } from 'react';

import Navbar from '../component/Navbar';
import SideNav from './component/SideNav';

export default function List() {
  const [data, setData] = useState([]);
  const [filter_name, setFilterName] = useState('');

  const handleFilter = async () => {
    const response = await window.fetch('/api/enterprise/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter_name }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setData(res.content);
  };

  return (
    <>
      <Navbar category="企业" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>企业列表</h3>
            <hr />

            <div className="card bg-dark shadow">
              <div className="card-header">
                <div className="form-row">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">企业名称</span>
                      </div>
                      <input
                        type="text"
                        value={filter_name}
                        aria-label="企业名称"
                        className="form-control"
                        onChange={(event) => setFilterName(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="btn-group">
                      <button type="button" className="btn btn-info" onClick={handleFilter}>
                        查询
                      </button>

                      <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                        <i className="fa fa-fw fa-refresh" />
                        重置
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>状态</th>
                      <th>法人</th>
                      <th>员工数量</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((it) => (
                      <tr key={it.id}>
                        <td>
                          <a href={`#/${it.id}?uuid=${it.uuid}`}>
                            <i className="fa fa-fw fa-edit" />
                          </a>
                          <span className="pull-right">{it.id}</span>
                        </td>
                        <td>{it.name}</td>
                        <td>
                          {it.status === '未认证' ? (
                            <span className="text-danger">{it.status}</span>
                          ) : (
                            <>{it.status}</>
                          )}
                        </td>
                        <td>{it.faren}</td>
                        <td>{it.yuangongshuliang}</td>
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
