import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Navbar from '../component/Navbar';

export default function List() {
  const [list, setList] = useState([]);
  const [filter_title, setFilterTitle] = useState('');
  const [filter_date, setFilterDate] = useState('');

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/content/topic/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/content/topic/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        date: filter_date,
        title: filter_title,
      }),
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
      <Navbar category="热门话题" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">热门话题</li>
            </ol>
          </h1>
        </nav>
        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="btn-group">
          <a href="#/新增" className="btn btn-sm btn-light">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </div>

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-header">
            <div className="form-row">
              <div className="col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">标题</span>
                  </div>
                  <input
                    type="text"
                    value={filter_title || ''}
                    className="form-control"
                    onChange={(event) => setFilterTitle(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">日期</span>
                  </div>
                  <input
                    type="date"
                    value={filter_date || ''}
                    className="form-control"
                    onChange={(event) => setFilterDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-auto">
                <div className="btn-group">
                  <button type="button" className="btn btn-info" onClick={handleFilter}>
                    <i className="fa fa-fw fa-search" />
                    查询
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => window.location.reload(true)}
                  >
                    <i className="fa fa-fw fa-refresh" />
                    重置
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-dark table-striped">
              <caption>热门话题</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>类别</th>
                  <th>标题</th>
                  <th>日期</th>
                </tr>
              </thead>

              <tbody>
                {list.map((it) => (
                  <tr key={it.id}>
                    <td className="text-right">
                      <span className="pull-left">
                        <a href={`#/${it.id}?uuid=${it.uuid}`}>
                          <i className="fa fa-fw fa-edit" />
                        </a>
                      </span>
                      {it.id}
                    </td>
                    <td>{it.tag}</td>
                    <td>{it.title}</td>
                    <td>{moment(it.date).format('YYYY-MM-DD')}</td>
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
