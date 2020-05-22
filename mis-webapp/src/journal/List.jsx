import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import {
  Title, Navbar, BackwardButton, RefreshButton,
} from '../Components';
import SideNav from '../common-user/component/SideNav';

export default function List(props) {
  const { category } = props;
  const location = useLocation();
  const [user_category, setUserCategory] = useState('');
  const [user_id, setUserID] = useState(0);
  const [user_uuid, setUserUUID] = useState('');
  const [data, setData] = useState([]);
  const [filter_date_begin, setFilterDateBegin] = useState(moment().format('YYYY-MM-01'));
  const [filter_date_end, setFilterDateEnd] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setUserCategory(new URLSearchParams(location.search).get('user_category'));
    const t_user_id = new URLSearchParams(location.search).get('user_id');
    setUserID(t_user_id);
    const t_user_uuid = new URLSearchParams(location.search).get('user_uuid');
    setUserUUID(t_user_uuid);
    if (category === '登录') {
      (async () => {
        const response = await window.fetch(`/api/journal/sign-in/?user_id=${t_user_id}&user_uuid=${t_user_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setData(res.content);
      })();
    } else if (category === '浏览') {
      (async () => {
        const response = await window.fetch(`/api/journal/browse/?user_id=${t_user_id}&user_uuid=${t_user_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setData(res.content);
      })();
    } else if (category === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/journal/edit/?user_id=${t_user_id}&user_uuid=${t_user_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setData(res.content);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = async () => {
    if (props.category === '登录') {
      const response = await window.fetch(`/api/journal/sign-in/?user_id=${user_id}`, {
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
    } else if (props.category === '浏览') {
      const response = await window.fetch(`/api/journal/browse/?user_id=${user_id}`, {
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
    } else if (props.category === '编辑') {
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
      <Title />
      <Navbar category="普通用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              普通用户
              {category}
              记录
            </h3>
            <hr />

            <div className="alert alert-warning">
              产生操作记录时要同时记录用户的uuid
            </div>

            <div className="btn-group mb-3">
              <BackwardButton />
            </div>

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="col row">
                    <div className="input-group col">
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

                    <div className="input-group col">
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

                  <div className="col-3">
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
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
                            onClick={() => { window.location = `#岗位/${it.data_id}`; }}
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
        </div>
      </div>
    </>
  );
}
