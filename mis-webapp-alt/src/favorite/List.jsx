import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import Navbar from '../component/Navbar';
import SideNav from '../user/ComponentSideNav';

export default function List() {
  const location = useLocation();
  const [list, setList] = useState([]);

  useEffect(() => {
    const t_master_id = new URLSearchParams(location.search).get('master_id');
    (async () => {
      const response = await window.fetch(`/api/favorite/?master_id=${t_master_id}`);
      const res = await response.json();
      setList(res.content);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect2Resource = async (event) => {
    const t_cat = event.target.getAttribute('data-category');
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    if (t_cat === '推荐信息') {
      window.location = `recommend.html#/${id}?uuid=${uuid}`;
    } else if (t_cat === '校园招聘') {
      window.location = `campus.html#/${id}?uuid=${uuid}`;
    } else if (t_cat === '岗位') {
      window.location = `recruitment.html#/${id}?uuid=${uuid}`;
    } else {
      window.alert('未知类型，解析失败。');
    }
  };

  return (
    <>
      <Navbar category="普通用户" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>用户收藏</h3>
            <hr />

            <div className="btn-group mb-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => { window.history.go(-1); }}
              >
                返回
              </button>
            </div>

            <div className="card bg-dark shadow">
              <div className="card-body">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>用户</th>
                      <th>类型</th>
                      <th>时间</th>
                      <th>内容</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((it) => (
                      <tr key={it.id}>
                        <td>
                          <span className="pull-right">{it.id}</span>
                        </td>
                        <td>
                          <span className="badge badge-info">{it.category1}</span>
                          &nbsp;
                          {it.name}
                          <br />
                          <small className="text-muted">{it.phone}</small>
                        </td>
                        <td>{it.category2}</td>
                        <td>
                          {moment(it.datime).format('YYYY-MM-DD')}
                          &nbsp;
                          <span className="text-muted">{moment(it.datime).format('HH:mm:ss')}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info btn-sm"
                            data-id={it.data_id}
                            data-uuid={it.data_uuid}
                            data-category={it.category2}
                            onClick={handleRedirect2Resource}
                          >
                            <i className="fa fa-fw fa-link" />
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
