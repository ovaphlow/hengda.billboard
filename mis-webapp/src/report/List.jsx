import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Title, Navbar } from '../Components';
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
      window.location = `#岗位/${id}?uuid=${uuid}`;
    } else if (category === '企业') {
      window.location = `#企业/${id}?uuid=${uuid}`;
    } else if (category === '简历') {
      window.location = `#简历/${id}?uuid=${uuid}`;
    }
  };

  return (
    <>
      <Title />
      <Navbar category="举报" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="举报" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>举报</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>用户</th>
                      <th>时间</th>
                      <th>类别</th>
                      <th>内容</th>
                      <th className="text-right">举报对象</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map((it) => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>
                            <span className="badge badge-info">{it.user_category}</span>
                            {it.name}
                            (
                            {it.username}
                            )
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
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleRedirect}
                            >
                              <i className="fa fa-fw fa-link" />
                              查看
                            </button>
                          </td>
                        </tr>
                      ))
                    }
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
