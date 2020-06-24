import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Navbar from '../component/Navbar';

export default function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/report/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  const handleRedirect = (event) => {
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    const category = event.target.getAttribute('data-category');
    if (category === '岗位') {
      window.location = `recruitment.html#/${id}?uuid=${uuid}`;
    } else if (category === '企业') {
      window.location = `enterprise.html#/${id}?uuid=${uuid}`;
    } else if (category === '简历') {
      window.location = `resume.html#/${id}?uuid=${uuid}`;
    }
  };

  return (
    <>
      <Navbar category="投诉反馈举报" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">举报</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/投诉" className="btn btn-sm btn-info">投诉</a>
            <a href="#/意见反馈" className="btn btn-sm btn-info">意见反馈</a>
            <a href="#/举报" className="btn btn-sm btn-info">举报</a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container">
        <div className="card bg-dark shadow">
          <div className="card-body">
            <table className="table table-dark table-striped">
              <caption>举报</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>用户</th>
                  <th>时间</th>
                  <th>类别</th>
                  <th>内容</th>
                  <th className="text-right">举报对象</th>
                </tr>
              </thead>

              <tbody>
                {data.map((it) => (
                  <tr key={it.id}>
                    <td className="text-right">{it.id}</td>
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
                    <td>{moment(it.datime).format('YYYY-MM-DD')}</td>
                    <td>{it.category}</td>
                    <td>{it.content}</td>
                    <td className="text-right">
                      <button
                        type="button"
                        data-id={it.data_id}
                        data-category={it.category}
                        data-uuid={it.data_uuid}
                        className="btn btn-sm btn-danger"
                        onClick={handleRedirect}
                      >
                        查看
                      </button>
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
