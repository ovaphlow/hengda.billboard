import React, { useEffect, useState } from 'react';

import md5 from 'blueimp-md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import Hover from './components/Hover';
import Footer from './components/Footer';

const Login = () => {
  const [data, setData] = useState({
    phone_email: '',
    password: '',
  });

  useEffect(() => {
    sessionStorage.removeItem('auth');
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogIn = async () => {
    const response = await fetch('/api/ent-user/log-in', {
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
      sessionStorage.setItem('auth', JSON.stringify(res.content));
      window.location = '#/';
    }
  };

  return (
    <div className="container-fluid bg-light body-login">
      <div className="px-5 fixed-top bg-white border-bottom body-title">
        <div className="row">
          <div className="col item-middle">
            <img className="img-fluid pull-left logo2" alt="" src="./lib/img/logo3.png" />
          </div>
          <div className="col-1 header-right">
            <a
              className="text-warning pull-right"
              href="#注册"
              style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              企业注册
            </a>
          </div>
          <div className="col-2 header-right pull-left">
            <span className="text-secondary border-0 bg-transparent img-weixin">
              <FontAwesomeIcon icon={faQrcode} fixedWidth />
              小程序
              <p>
                <img className="" alt="" src="./lib/img/qr.png" />
              </p>
            </span>
          </div>
        </div>
      </div>

      <div
        className="row login-body px-5 header"
        style={{
          height: 'calc(100vw * 0.33)',
          minHeight: '520px',
        }}
      >
        <div className="col w-25 mt-5">
          <div className="card pull-right rounded-0">
            <div className="card-body text-center">
              <h5>登录</h5>
              <hr />
              <form onSubmit={handleLogIn}>
                <div className="row px-4">
                  <div className="col form-group">
                    <input
                      className="mt-3 form-control rounded-0"
                      type="text"
                      placeholder="请输入手机号码或邮箱"
                      value={data.phone_email}
                      name="phone_email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row px-4">
                  <div className="col form-group">
                    <input
                      className="mt-2 form-control rounded-0"
                      type="password"
                      placeholder="请输入密码"
                      name="password"
                      autoComplete="off"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row px-4" style={{ visibility: 'hidden' }}>
                  <div className="col-7">
                    <input type="text" className="col form-control rounded-0" />
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-0"
                      style={{ height: '100%', fontSize: 'small' }}
                    >
                      发送验证码
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3 px-4 ">
                <div className="col">
                  <button
                    type="button"
                    className="mt-2 btn btn-login rounded-0"
                    onClick={handleLogIn}
                  >
                    登录
                  </button>
                </div>
              </div>
              <div className="row mt-2 px-4 ">
                <div className="col">
                  <a
                    className="text-dark pull-right"
                    href="#忘记密码"
                    style={{ fontSize: 'small', textDecoration: 'none' }}
                  >
                    忘记密码?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Hover />
      <div className="between-box card shadow mt-3 pb-4">
        <div className="pt-3 pb-4">
          <h2>合作企业</h2>
        </div>
        <div className="text-center">
          <div>
            <img className="border between-content shadow-sm" alt="" src="./lib/img/1.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/4.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/10.png" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/5.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/17.png" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/19.png" />
          </div>
          <div>
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/2.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/3.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/7.png" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/8.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/9.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/13.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/15.png" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/16.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/21.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/22.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/23.jpg" />
            <img className="border between-content1 shadow-sm" alt="" src="./lib/img/24.jpg" />
          </div>
          <div>
            <img className="border between-content shadow-sm" alt="" src="./lib/img/6.png" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/11.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/12.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/14.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/18.jpg" />
            <img className="border between-content shadow-sm" alt="" src="./lib/img/20.jpg" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
