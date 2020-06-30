import React, { useState } from 'react';

import Navbar from '../../component/Navbar';
import useMessageQty from '../../useMessageQty';
import IconRename from '../../icon/Rename';
import IconLink from '../../icon/Link';
import IconSearch from '../../icon/Search';
import IconSync from '../../icon/Sync';

export default function List() {
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/enterprise-user/filter', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  return (
    <>
      <Navbar category="用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">企业用户</li>
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
        {parseInt(message_qty, 10) > 0 && (
          <div className="alert alert-warning">
            有
            {' '}
            {message_qty}
            {' '}
            个待认证企业需要
            <a href="enterprise.html#/待认证">处理</a>
            。
          </div>
        )}

        <div className="card bg-dark shadow">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">姓名/电话/企业</span>
                  </div>
                  <input type="text" value={filter} className="form-control" onChange={(event) => setFilter(event.target.value)} />
                </div>
              </div>

              <div className="btn-group col-auto">
                <button type="button" className="btn btn-info" onClick={handleFilter}>
                  <IconSearch />
                  查询
                </button>

                <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                  <IconSync />
                  重置
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-dark table-striped">
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
                          <IconRename />
                        </a>
                      </span>
                      {it.id}
                    </td>
                    <td>{it.name}</td>
                    <td>{it.phone}</td>
                    <td>
                      {it.enterprise}
                      &nbsp;
                      <a href={`enterprise.html#/${it.enterprise_id}?uuid=${it.enterprise_uuid}`}>
                        <IconLink />
                      </a>
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
