import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';

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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="个人用户" />
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
                  <span className="h1">用户收藏</span>
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
                        用户收藏
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>用户收藏</caption>
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
                            <td className="text-right">
                              {it.id}
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
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
