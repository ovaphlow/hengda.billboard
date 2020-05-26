import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Navbar from '../component/Navbar';
import SideNav from './component/SideNav';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/report/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
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
      <Navbar category="举报" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>举报</h3>
            <hr />

            <div className="card bg-dark shadow">
              <div className="card-body">
                <table className="table table-dark table-striped">
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
        </div>
      </div>
    </>
  );
}
