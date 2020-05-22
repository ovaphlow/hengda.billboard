import React, { useState } from 'react';

import Title from '../component/Title';
import Navbar from '../component/Navbar';
import RefreshButton from '../component/RefreshButton';
import SideNav from './component/SideNav';

export default function List() {
  const [data, setData] = useState([]);
  const [filter_name, setFilterName] = useState('');

  const handleFilter = async () => {
    const response = await window.fetch('/api/common-user/', {
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
      <Navbar category="普通用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>普通用户 列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">姓名</span>
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
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>用户</th>
                      <th>EMAIL</th>
                      <th>电话</th>
                      <th>收藏</th>
                      <th className="text-right">查看</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((it) => (
                      <tr key={it.id}>
                        <td>
                          <a href={`#普通用户/${it.id}?uuid=${it.uuid}`}>
                            <i className="fa fa-fw fa-edit" />
                          </a>
                          <span className="pull-right">{it.id}</span>
                        </td>
                        <td>
                          {it.name}
                          <br />
                          (
                          {it.username}
                          )
                        </td>
                        <td>{it.email}</td>
                        <td>{it.phone}</td>
                        <td>{it.qty_favorite}</td>
                        <td className="text-right">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => {
                                window.location = `#登录记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`;
                              }}
                            >
                              登录记录
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm"
                              onClick={() => {
                                window.location = `#浏览记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`;
                              }}
                            >
                              浏览记录
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm"
                              onClick={() => {
                                window.location = `#编辑记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`;
                              }}
                            >
                              编辑记录
                            </button>
                          </div>
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
