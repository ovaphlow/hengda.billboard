import React, { useState } from 'react';

import Navbar from '../../component/Navbar';
import IconEditFlipH from '../../icon/EditFlipH';
import IconMail from '../../icon/Mail';
import IconSmartphone from '../../icon/Smartphone';
import IconSync from '../../icon/Sync';

export default function List() {
  const [data, setData] = useState([]);
  const [filter_name, setFilterName] = useState('');

  const handleFilter = async () => {
    setData([]);
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
      <Navbar category="用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">普通用户</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>

            <a href="#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>

            <a href="#/普通用户" className="btn btn-sm btn-info">
              普通用户
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <div className="form-row">
              <div className="col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">姓名/电话</span>
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
                    <IconSync />
                    重置
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body table-responsive">
            <table className="table table-dark table-striped">
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
                      <a href={`#/普通用户/${it.id}?uuid=${it.uuid}`}>
                        <IconEditFlipH />
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>
                      <IconMail />
                      {it.email}
                      <br />
                      <IconSmartphone />
                      {it.phone}
                    </td>
                    <td>{it.qty_favorite}</td>
                    <td className="text-right">
                      {/* <div className="btn-group"> */}
                      <button
                        type="button"
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => { window.location = `journal.html#/登录?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
                      >
                        登录记录
                      </button>

                      <br />

                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        onClick={() => { window.location = `journal.html#/浏览?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
                      >
                        浏览记录
                      </button>

                      <br />

                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => { window.location = `journal.html#/编辑?user_category=个人用户&user_id=${it.id}&user_uuid=${it.uuid}`; }}
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
    </>
  );
}
