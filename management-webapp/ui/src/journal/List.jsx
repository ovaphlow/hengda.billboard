import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import Navbar from '../component/Navbar';

export default function List({ category }) {
  const location = useLocation();
  const [user_category, setUserCategory] = useState('');
  const [user_id, setUserID] = useState(0);
  const [user_uuid, setUserUUID] = useState('');
  const [data, setData] = useState([]);
  const [filter_date_begin, setFilterDateBegin] = useState(moment().format('YYYY-MM-01'));
  const [filter_date_end, setFilterDateEnd] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    const t_user_category = new URLSearchParams(location.search).get('user_category');
    setUserCategory(t_user_category);
    const t_user_id = new URLSearchParams(location.search).get('user_id');
    setUserID(t_user_id);
    const t_user_uuid = new URLSearchParams(location.search).get('user_uuid');
    setUserUUID(t_user_uuid);
    if (category === '登录') {
      (async () => {
        const response = await window.fetch(`/api/journal/sign-in/?user_id=${t_user_id}&user_uuid=${t_user_uuid}?category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    } else if (category === '浏览') {
      (async () => {
        const response = await window.fetch(`/api/journal/browse/?user_id=${t_user_id}&user_uuid=${t_user_uuid}?category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    } else if (category === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/journal/edit/?user_id=${t_user_id}&user_uuid=${t_user_uuid}&category=${t_user_category}`);
        const res = await response.json();
        setData(res.content);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = async () => {
    if (category === '登录') {
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
    } else if (category === '浏览') {
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
    } else if (category === '编辑') {
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
    <>
      <Navbar category="普通用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="#/普通用户" className="text-light">普通用户</a>
              </li>
              <li className="breadcrumb-item active">
                {category}
                {' '}
                记录
              </li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="user.html#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>
            <a href="user.html#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>
            <a href="user.html#/普通用户" className="btn btn-sm btn-info">
              普通用户
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="btn-group mb-3">
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => { window.history.go(-1); }}>
            返回
          </button>
        </div>

        <div className="card bg-dark shadow">
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
                    查询
                  </button>

                  <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                    <i className="fa fa-fw fa-refresh" />
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
                  {category === '登录' && (
                  <>
                    <th>时间</th>
                    <th>IP地址</th>
                    <th>大概位置</th>
                    <th>用户类别</th>
                  </>
                  )}
                  {category === '浏览' && (
                  <>
                    <th>时间</th>
                    <th>数据类别</th>
                    <th className="text-right">操作</th>
                  </>
                  )}
                  {category === '编辑' && (
                  <>
                    <th>时间</th>
                    <th>用户类别</th>
                    <th>操作内容</th>
                  </>
                  )}
                </tr>
              </thead>

              <tbody>
                {category === '登录' && data.map((it) => (
                  <tr key={it.id}>
                    <td className="text-right">{it.id}</td>
                    <td>{it.datime}</td>
                    <td>{it.ip}</td>
                    <td>{it.address}</td>
                    <td>{it.category}</td>
                  </tr>
                ))}
                {category === '浏览' && data.map((it) => (
                  <tr key={it.id}>
                    <td className="text-right">{it.id}</td>
                    <td>{it.datime}</td>
                    <td>{it.category}</td>
                    <td className="text-right">
                      <button
                        type="button"
                        data-id={it.data_id}
                        className="btn btn-sm btn-outline-info"
                        onClick={() => { window.location = `recruitment.html#/${it.data_id}?uuid=${it.data_uuid}`; }}
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
                {category === '编辑' && data.map((it) => (
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
    </>
  );
}

List.propTypes = {
  category: PropTypes.string.isRequired,
};