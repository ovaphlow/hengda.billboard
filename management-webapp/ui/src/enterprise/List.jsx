import React, { useState } from 'react';

import Title from '../component/Title';
import Navbar from '../component/Navbar';
import RefreshButton from '../component/RefreshButton';
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
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>企业列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="col row">
                    <div className="input-group col">
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

                  <div className="col-3">
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>状态</th>
                      <th>法人</th>
                      <th>员工数量</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map((it) => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#企业/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>
                            {
                              it.status === '未认证' ? (
                                <span className="text-danger">{it.status}</span>
                              ) : (
                                <>{it.status}</>
                              )
                            }
                          </td>
                          <td>{it.faren}</td>
                          <td>{it.yuangongshuliang}</td>
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
