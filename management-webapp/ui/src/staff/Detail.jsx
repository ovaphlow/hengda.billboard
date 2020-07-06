import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    if (!name || !username) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      username,
      password: md5('112332'),
      name,
    };

    if (component_option === '新增') {
      const response = await fetch('/api/mis-user/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (component_option === '编辑') {
      const response = await fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  useEffect(() => {
    if (component_option === '编辑') {
      setUUID(new URLSearchParams(location.search).get('uuid'));
    }
  }, []);

  useEffect(() => {
    if (!uuid) return;
    (async () => {
      const response = await fetch(`/api/mis-user/${id}?uuid=${uuid}`);
      const res = await response.json();
      setName(res.content.name);
      setUsername(res.content.username);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="平台用户" />
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
                  <span className="h1">平台用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="staff.html" className="text-reset text-decoration-none">
                          平台用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">{component_option}</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    {component_option === '新增' && (
                      <div className="alert alert-warning">
                        新增用户的默认密码为112332
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">姓名</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">用户名</label>
                      <input
                        type="text"
                        value={username || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => { window.history.go(-1); }}
                      >
                        返回
                      </button>
                    </div>

                    <div className="btn-group float-right">
                      {component_option === '编辑' && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleRemove}
                        >
                          删除
                        </button>
                      )}
                      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        保存
                      </button>
                    </div>
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

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
