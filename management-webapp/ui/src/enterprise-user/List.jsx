import React, { useState } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useMessageQty from '../useMessageQty';
import IconLink from '../icon/Link';
import IconRename from '../icon/Rename';
import IconSearch from '../icon/Search';
import IconSync from '../icon/Sync';

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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="企业用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">企业用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        企业用户
                      </li>
                    </ol>
                  </nav>
                </div>

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

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="form-row">
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
                      <caption>企业用户</caption>
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
                              <a href={`#/${it.id}?uuid=${it.uuid}`} className="float-left">
                                <IconRename />
                              </a>
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
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
