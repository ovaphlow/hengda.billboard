import React, { useState } from 'react';
import md5 from 'blueimp-md5';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconLogOut from '../icon/LogOut';
import useAuth from '../useAuth';

export default function ChangePassword() {
  const auth = useAuth();
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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="当前用户" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="" />
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
                  <span className="h1">修改密码</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="current-user.html" className="text-reset text-decoration-none">
                          当前用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        修改密码
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header d-flex justify-content-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-info btn-sm" onClick={() => { window.location = '#/'; }}>
                        用户信息
                      </button>

                      <button type="button" className="btn btn-warning btn-sm" onClick={() => { window.location = '#/修改密码'; }}>
                        修改密码
                      </button>

                      <button type="button" className="btn btn-danger btn-sm" onClick={() => { window.location = '#/登录'; }}>
                        <IconLogOut />
                        退出登录
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="alert alert-warning">
                      修改密码后需要重新登录
                    </div>

                    <div className="form-group">
                      <label>当前密码</label>
                      <input
                        type="password"
                        value={password || ''}
                        autoComplete="current-password"
                        className="form-control input-underscore"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>新密码</label>
                      <input
                        type="password"
                        value={password1 || ''}
                        autoComplete="new-password"
                        className="form-control input-underscore"
                        onChange={(event) => setPassword1(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>重复新密码</label>
                      <input
                        type="password"
                        value={password2 || ''}
                        autoComplete="new-password"
                        className="form-control input-underscore"
                        onChange={(event) => setPassword2(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>

                    <div className="btn-group float-right">
                      <button type="button" className="btn btn-primary" onClick={handleChange}>
                        更改密码
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
