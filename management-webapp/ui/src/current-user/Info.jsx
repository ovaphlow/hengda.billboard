import React, { useEffect, useState } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';
import IconLogOut from '../icon/LogOut';

export default function Info() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleSave = async () => {
    const response = await window.fetch(`/api/mis-user/${auth.id}?uuid=${auth.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, name }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/登录';
  };

  useEffect(() => {
    setUsername(auth.username);
    setName(auth.name);
  }, []);

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
                  <span className="h1">当前用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        当前用户
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
                      修改用户信息后需要重新登录
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">姓名</label>
                          <input
                            type="text"
                            value={name}
                            className="form-control input-underscore"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">用户名</label>
                          <input
                            type="text"
                            value={username}
                            className="form-control input-underscore"
                            onChange={(event) => setUsername(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                      返回
                    </button>

                    <div className="btn-group float-right">
                      <button type="button" className="btn btn-primary" onClick={handleSave}>
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
