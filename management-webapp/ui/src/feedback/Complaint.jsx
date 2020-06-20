import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Navbar from '../component/Navbar';

export default function Complaint() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/feedback/complaint/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  const handleReply = async (event) => {
    const content = window.prompt('对投诉回复的内容');
    const response = await window.fetch('/api/feedback/complaint/reply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        user_category: event.target.getAttribute('data-user-category'),
        category: '系统消息',
        title: '对用户投诉内容的回复',
        content,
        datime: moment().format('YYYY-MM-DD'),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload(true);
  };

  return (
    <>
      <Navbar category="投诉反馈举报" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
          </div>

          <div className="col-9 col-lg-10">
            <h3>投诉</h3>
            <hr />

            <div className="card bg-dark shadow">
              <div className="card-body">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>状态</th>
                      <th>用户</th>
                      <th>时间</th>
                      <th>内容</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((it) => (
                      <tr key={it.id}>
                        <td className="text-right">{it.id}</td>
                        <td>
                          {it.status === '已处理' ? (
                            <span className="badge badge-secondary">已处理</span>
                          ) : (
                            <span className="badge badge-danger">未处理</span>
                          )}
                        </td>
                        <td>
                          {it.user_category === '企业用户' && (
                            <span className="badge badge-success">{it.user_category}</span>
                          )}
                          {it.user_category === '个人用户' && (
                            <span className="badge badge-info">{it.user_category}</span>
                          )}
                          &nbsp;
                          {it.name}
                          <br />
                          <small className="text-muted">{it.phone}</small>
                        </td>
                        <td>
                          {moment(it.datime).format('YYYY-MM-DD')}
                          <br />
                          <small className="text-muted">{moment(it.datime).format('HH:mm')}</small>
                        </td>
                        <td>{it.content}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            data-id={it.id}
                            data-user-id={it.user_id}
                            data-user-category={it.user_category}
                            onClick={handleReply}
                          >
                            <i className="fa fa-fw fa-reply" />
                            回复
                          </button>
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
