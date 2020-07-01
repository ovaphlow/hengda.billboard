import React, { useState, useEffect } from 'react';
import moment from 'moment';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconAdd from '../icon/Add';
import IconRename from '../icon/Rename';
import IconSearch from '../icon/Search';
import IconSync from '../icon/Sync';
import useAuth from '../useAuth';

export default function List() {
  const auth = useAuth();
  const [list, setList] = useState([]);
  const [filter_title, setFilterTitle] = useState('');
  const [filter_date, setFilterDate] = useState();

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/content/campus/');
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/content/campus/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: filter_title,
        date: filter_date,
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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="校园招聘" />
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
                  <span className="h1">校园招聘</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        校园招聘
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="form-row">
                      <div className="col-auto">
                        <a href="#/新增" className="btn btn-secondary">
                          <IconAdd />
                          新增
                        </a>
                      </div>
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
                            <IconSearch />
                            查询
                          </button>

                          <button type="button" className="btn btn-secondary" onClick={() => window.location.reload(true)}>
                            <IconSync />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>校园招聘</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>类型</th>
                          <th>院校</th>
                          <th>标题</th>
                          <th>时间</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <span className="float-left">
                                <a href={`#/${it.id}?uuid=${it.uuid}`}>
                                  <IconRename />
                                </a>
                              </span>
                              {it.id}
                            </td>
                            <td>{it.category}</td>
                            <td>{it.school}</td>
                            <td>{it.title}</td>
                            <td>
                              {moment(it.date).format('YYYY-MM-DD')}
                              <br />
                              {it.time}
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
