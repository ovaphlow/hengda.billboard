import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

import BottomNav from '../component/BottomNav';
import IconLogIn from '../icon/LogIn';

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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <div className="container-lg">
          <h1>
            龙招聘 - 平台管理系统
          </h1>
        </div>
      </header>

      <main className="flex-grow-1">
        <div className="container-lg d-flex h-100 align-items-center justify-content-center">
          <div className="card bg-dark shadow col-6 col-lg-4">
            <div className="card-header">
              <h2>用户登录</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>用户名</label>
                  <input
                    type="text"
                    value={username || ''}
                    autoComplete="username"
                    className="form-control input-underscore"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input
                    type="password"
                    value={password || ''}
                    autoComplete="current-password"
                    className="form-control input-underscore"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
                <IconLogIn />
                确定
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark mt-3">
        <BottomNav />
      </footer>
    </div>
  );
}
