import React, { useState } from 'react';
import md5 from 'blueimp-md5';

import Navbar from '../component/Navbar';
import IconPlayListCheck from '../icon/PlayListCheck';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleChange = async () => {
    if (!password || !password1 || !password2) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (password1 !== password2) {
      window.alert('两次输入的新密码不一致');
      return;
    }

    const auth = JSON.parse(sessionStorage.getItem('mis-auth'));

    const data = {
      id: auth.id,
      current_password: md5(password),
      new_password: md5(password1),
    };
    let res = await window.fetch('/api/current-user/change-password', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.alert('数据已经提交至服务器，即将重定向至登录页面。');
    window.location = '#登录';
  };

  return (
    <>
      <Navbar category="当前用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">当前用户</li>

              <li className="breadcrumb-item active" aria-current="page">修改密码</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/待处理" className="btn btn-sm btn-info">
              <IconPlayListCheck />
              待处理
            </a>

            <a href="#/修改密码" className="btn btn-sm btn-warning">
              修改密码
            </a>

            <a href="#/登录" className="btn btn-sm btn-danger">
              退出登录
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow col-8 offset-2 col-lg-6 offset-lg-3">
          <div className="card-header">
            <span className="lead text-danger">修改密码后需要重新登录</span>
          </div>

          <div className="card-body">
            <div className="form-group">
              <label>当前密码</label>
              <input
                type="password"
                value={password || ''}
                autoComplete="current-password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>新密码</label>
              <input
                type="password"
                value={password1 || ''}
                autoComplete="new-password"
                className="form-control"
                onChange={(event) => setPassword1(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>重复新密码</label>
              <input
                type="password"
                value={password2 || ''}
                autoComplete="new-password"
                className="form-control"
                onChange={(event) => setPassword2(event.target.value)}
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
              <button type="button" className="btn btn-primary" onClick={handleChange}>
                更改密码
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
