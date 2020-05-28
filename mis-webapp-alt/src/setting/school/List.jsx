import React, { useState, useEffect } from 'react';

import Navbar from '../../component/Navbar';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function List() {
  const [list, setList] = useState([]);
  const [filter_name, setFilterName] = useState('');

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/school/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch(`/api/settings/school/?name=${filter_name}`);
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  return (
    <>
      <Navbar category="系统设置" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>院校</h3>
            <hr />

            <Toolbar />

            <div className="card bg-dark shadow">
              <div className="card-header">
                <div className="form-row">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">名称</span>
                      </div>

                      <input
                        type="text"
                        value={filter_name}
                        aria-label="名称"
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

                      <button type="button" className="btn btn-light" onClick={() => { window.location.reload(true); }}>
                        <i className="fa fa-fw fa-refresh" />
                        重置
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-dark table-striped">
                  <caption>院校列表</caption>
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>备注</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((it) => (
                      <tr key={it.id}>
                        <td>
                          <a href={`#/院校/${it.id}?uuid=${it.uuid}`}>
                            <i className="fa fa-fw fa-edit" />
                          </a>

                          <span className="pull-right">
                            {it.id}
                          </span>
                        </td>
                        <td>{it.name}</td>
                        <td>{it.comment}</td>
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
