import React, { useState } from 'react';

import Navbar from '../component/Navbar';
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
      <Navbar category="普通用户" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>普通用户 列表</h3>
            <hr />

            <div className="card bg-dark shadow">
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
                      <button type="button" className="btn btn-info" onClick={handleFilter}>
                        查询
                      </button>

                      <button type="button" className="btn btn-secondary" onClick={() => { window.reload(true); }}>
                        <i className="fa fa-fw fa-refresh" />
                        重置
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body table-responsive">
                <table className="table table-dark table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>用户</th>
                      <th>联系方式</th>
                      <th>收藏</th>
                      <th className="text-right">查看</th>
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
                        <td>
                          {it.name}
                          <br />
                          <small className="text-muted">{it.username}</small>
                        </td>
                        <td>
                          <i className="fa fa-fw fa-envelope-o" />
                          {it.email}
                          <br />
                          <i className="fa fa-fw fa-mobile" />
                          {it.phone}
                        </td>
                        <td>{it.qty_favorite}</td>
                        <td className="text-right">
                          {/* <div className="btn-group"> */}
                            <button
                              type="button"
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => { window.location = `#登录记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
                            >
                              登录记录
                            </button>

                            <br />

                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm"
                              onClick={() => {window.location = `#浏览记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
                            >
                              浏览记录
                            </button>

                            <br />

                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm"
                              onClick={() => { window.location = `#编辑记录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
                            >
                              编辑记录
                            </button>
                          {/* </div> */}
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
