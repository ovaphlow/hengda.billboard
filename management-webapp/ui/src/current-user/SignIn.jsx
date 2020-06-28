import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

import Navbar from '../component/Navbar';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('mis-auth');
  }, []);

  const handleSignIn = async () => {
    const response = await fetch('/api/mis-user/sign-in', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password: md5(password) }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    sessionStorage.setItem('mis-auth', JSON.stringify(res.content));
    window.history.go(-1);
  };

  return (
    <>
      <Navbar category="首页" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">当前用户</li>

              <li className="breadcrumb-item active" aria-current="page">登录</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
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
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>用户名</label>
                <input
                  type="text"
                  value={username || ''}
                  autoComplete="username"
                  className="form-control"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>密码</label>
                <input
                  type="password"
                  value={password || ''}
                  autoComplete="current-password"
                  className="form-control"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="card-footer">
            <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
              <i className="fa fa-fw fa-sign-in" />
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
