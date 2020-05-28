import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../ComponentSideNav';
import useMessageQty from '../../useMessageQty';

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

  useEffect(() => {
    // 待认证企业数量
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/qty');
      const res = await response.json();
      setQty(res.content.qty);
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

            {parseInt(qty, 10) > 0 && (
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
                <div className="form-row">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">姓名/电话/企业</span>
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
                              <i className="fa fa-fw fa-edit" />
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
