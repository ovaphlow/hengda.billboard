import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import ToBack from '../components/ToBack';

export default function LogIn() {
  const [data, setData] = useState({
    phone_email: '',
    password: '',
  });

  useEffect(() => {
    localStorage.removeItem('auth');
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogIn = async () => {
    const response = await fetch('/api/common-user/log-in', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ip: window.returnCitySN.cip,
        address: window.returnCitySN.cname,
        phone_email: data.phone_email,
        password: md5(data.password),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
    } else {
      localStorage.setItem('auth', JSON.stringify(res.content));
      window.location = '#';
    }
  };

  return (
    <>
      <div className="container-fluid background-login">
        <br />
        <ToBack href="#" />
        <div className="mt-4 bg-transparent text-white pt-5 text-center">
          <h4>
            <strong className="text-warning">Hi</strong>
            &nbsp;&nbsp;龙江学子就业平台
          </h4>
        </div>

        <div className="row mt-3 bg-transparent text-dark">
          <div className="col">
            <div className="card border-0 bg-transparent text-dark">
              <div className="card-body">
                <div className="input-group mb-3 input-group-lg input-control">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-transparent text-white border-0">
                      <FontAwesomeIcon icon={faUserCircle} fixedWidth />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="phone_email"
                    value={data.phone_email}
                    className="form-control bg-transparent text-white border-0 input-placeholder input-f"
                    placeholder="手机号码/邮箱"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3 input-group-lg input-control">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-transparent text-white border-0">
                      <FontAwesomeIcon icon={faLock} fixedWidth />
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    className="form-control bg-transparent text-white border-0 input-placeholder input-f"
                    placeholder="登陆密码"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  style={{ width: '85%' }}
                  className="btn btn-block mx-auto rounded-pill button-background text-white font-weight"
                  onClick={handleLogIn}
                >
                  登&nbsp;录
                </button>
              </div>
              <div
                style={{
                  width: '95%',
                  fontSize: 13,
                }}
                className="row mx-auto"
              >
                <div className="col text-center">
                  <a className="text-white font-weight" href="#/注册">
                    立即注册&nbsp;
                  </a>
                  <span className="text-white font-weight">|</span>
                  <a className="text-warning font-weight" href="#/忘记密码">
                    &nbsp;忘记密码
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
