import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconSync from '../icon/Sync';
import useAuth from '../useAuth';

export default function List() {
  const auth = useAuth();
  const location = useLocation();
  const [user_id, setUserID] = useState(0);
  const [user_uuid, setUserUUID] = useState('');
  const [filter_date_begin, setFilterDateBegin] = useState(moment().format('YYYY-MM-01'));
  const [filter_date_end, setFilterDateEnd] = useState(moment().format('YYYY-MM-DD'));
  const [list, setList] = useState([]);

  const handleFilter = async () => {
    const response = await window.fetch(`/api/delivery/?user_id=${user_id}&user_uuid=${user_uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        filter_date_begin,
        filter_date_end,
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  useEffect(() => {
    setUserID(new URLSearchParams(location.search).get('user_id'));
    setUserUUID(new URLSearchParams(location.search).get('user_uuid'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <LeftNav component_option="个人用户" />
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
                  <span className="h1">简历投递记录</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="common-user.html" className="text-reset text-decoration-none">
                          个人用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        简历投递记录
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="form-row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">起始日期</span>
                          </div>
                          <input
                            type="date"
                            value={filter_date_begin}
                            aria-label="起始日期"
                            className="form-control"
                            onChange={(event) => setFilterDateBegin(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">终止日期</span>
                          </div>
                          <input
                            type="date"
                            value={filter_date_end}
                            aria-label="终止日期"
                            className="form-control"
                            onChange={(event) => setFilterDateEnd(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-auto">
                        <div className="btn-group">
                          <button type="button" className="btn btn-info" onClick={handleFilter}>
                            查询
                          </button>

                          <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                            <IconSync />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>简历投递记录</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>简历</th>
                          <th>岗位</th>
                          <th>日期</th>
                          <th className="text-right">状态</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>
                              <a href={`resume.html#/${it.resume_id}?uuid=${it.resume_uuid}`}>{it.resume_name}</a>
                            </td>
                            <td>
                              <a href={`recruitment.html#/${it.recruitment_id}?uuid=${it.recruitment_uuid}`}>{it.recruitment_name}</a>
                            </td>
                            <td>{it.datime}</td>
                            <td className="text-right">{it.status}</td>
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
