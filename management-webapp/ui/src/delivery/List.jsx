import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import Navbar from '../component/Navbar';
import IconSync from '../icon/Sync';

export default function List() {
  const location = useLocation();
  const [user_id, setUserID] = useState(0);
  const [user_uuid, setUserUUID] = useState('');
  const [filter_date_begin, setFilterDateBegin] = useState(moment().format('YYYY-MM-01'));
  const [filter_date_end, setFilterDateEnd] = useState(moment().format('YYYY-MM-DD'));
  const [list, setList] = useState([]);

  useEffect(() => {
    setUserID(new URLSearchParams(location.search).get('user_id'));
    setUserUUID(new URLSearchParams(location.search).get('user_uuid'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <Navbar category="普通用户" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2" />

          <div className="col-9 col-lg-10">
            <h3>普通用户 简历投递记录</h3>
            <hr />

            <div className="btn-group mb-3">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => { window.history.go(-1); }}>
                返回
              </button>
            </div>

            <div className="card bg-dark shadow">
              <div className="card-header">
                <div className="form-row">
                  <div className="col-auto">
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

                  <div className="col-auto">
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
    </>
  );
}
