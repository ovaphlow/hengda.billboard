import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconSearch from '../icon/Search';
import IconSync from '../icon/Sync';

export default function List({ option }) {
  const location = useLocation();
  const [user_category, setUserCategory] = useState('');
  const [user_id, setUserID] = useState(0);
  const [user_uuid, setUserUUID] = useState('');
  const [data, setData] = useState([]);
  const [filter_date_begin, setFilterDateBegin] = useState(moment().format('YYYY-MM-01'));
  const [filter_date_end, setFilterDateEnd] = useState(moment().format('YYYY-MM-DD'));

  const handleRedirect = async (event) => {
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    const category = event.target.getAttribute('data-category');
    window.console.info(category);
    if (category === '校园招聘') {
      window.location = `campus.html#/${id}?uuid=${uuid}`;
    } else if (category === '热门话题') {
      window.location = `topic.html#/${id}?uuid=${uuid}`;
    } else if (category === '岗位') {
      window.location = `recruitment.html#/${id}?uuid=${uuid}`;
    } else {
      window.alert('数据类型解析失败');
    }
  };

  useEffect(() => {
    const t_user_category = new URLSearchParams(location.search).get('user_category');
    setUserCategory(t_user_category);
    const t_user_id = new URLSearchParams(location.search).get('user_id');
    setUserID(t_user_id);
    const t_user_uuid = new URLSearchParams(location.search).get('user_uuid');
    setUserUUID(t_user_uuid);
    if (option === '登录') {
      (async () => {
        const response = await window.fetch(`/api/journal/sign-in/?user_id=${t_user_id}&user_uuid=${t_user_uuid}?category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    } else if (option === '浏览') {
      (async () => {
        const response = await window.fetch(`/api/journal/browse/?user_id=${t_user_id}&user_uuid=${t_user_uuid}?category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    } else if (option === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/journal/edit/?user_id=${t_user_id}&user_uuid=${t_user_uuid}&category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = async () => {
    if (option === '登录') {
      const response = await window.fetch(`/api/journal/sign-in/?user_id=${user_id}&user_uuid=${user_uuid}&category=${user_category}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          date_begin: filter_date_begin,
          date_end: filter_date_end,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      setData(res.content);
    } else if (option === '浏览') {
      const response = await window.fetch(`/api/journal/browse/?user_id=${user_id}&user_uuid=${user_uuid}&category=${user_category}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          date_begin: filter_date_begin,
          date_end: filter_date_end,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      setData(res.content);
    } else if (option === '编辑') {
      const response = await window.fetch(`/api/journal/edit/?user_id=${user_id}&user_uuid=${user_uuid}&user_category=${user_category}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          date_begin: filter_date_begin,
          date_end: filter_date_end,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      setData(res.content);
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
                <LeftNav cat="操作记录" />
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
                  <span className="h1">
                    操作记录：
                    {option}
                  </span>
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
                      <li className="breadcrumb-item">
                        操作记录：
                        {option}
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
                            <span className="input-group-text">起</span>
                          </div>
                          <input
                            type="date"
                            value={filter_date_begin || ''}
                            aria-label="起"
                            className="form-control"
                            onChange={(event) => setFilterDateBegin(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">止</span>
                          </div>
                          <input
                            type="date"
                            value={filter_date_end || ''}
                            aria-label="止"
                            className="form-control"
                            onChange={(event) => setFilterDateEnd(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-auto">
                        <div className="btn-group">
                          <button type="button" className="btn btn-info" onClick={handleFilter}>
                            <IconSearch />
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
                      <caption>
                        {option}
                        记录
                      </caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          {option === '登录' && (
                          <>
                            <th>时间</th>
                            <th>IP地址</th>
                            <th>大概位置</th>
                            <th>用户类别</th>
                          </>
                          )}
                          {option === '浏览' && (
                          <>
                            <th>时间</th>
                            <th>数据类别</th>
                            <th className="text-right">操作</th>
                          </>
                          )}
                          {option === '编辑' && (
                          <>
                            <th>时间</th>
                            <th>用户类别</th>
                            <th>操作内容</th>
                          </>
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {option === '登录' && data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.datime}</td>
                            <td>{it.ip}</td>
                            <td>{it.address}</td>
                            <td>{it.category}</td>
                          </tr>
                        ))}
                        {option === '浏览' && data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.datime}</td>
                            <td>{it.category}</td>
                            <td className="text-right">
                              <button
                                type="button"
                                data-id={it.data_id}
                                data-uuid={it.data_uuid}
                                data-category={it.category}
                                className="btn btn-sm btn-outline-info"
                                onClick={handleRedirect}
                              >
                                查看
                              </button>
                            </td>
                          </tr>
                        ))}
                        {option === '编辑' && data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.datime}</td>
                            <td>{it.category1}</td>
                            <td>{it.category2}</td>
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

List.propTypes = {
  option: PropTypes.string.isRequired,
};
