import React, { useEffect, useState } from 'react';

import md5 from 'blueimp-md5';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

const Sigin = () => {
  const [data, setData] = useState({
    email: '',
    ent_name: '',
    code: '',
    password1: '',
    password2: '',
  });

  const [count, setCount] = useState({
    countdown: 60,
    flag: true,
  });

  const [err, setErr] = useState({
    email: '',
    ent_name: '',
    code: '',
    password1: '',
    password2: '',
  });

  useEffect(() => {
    sessionStorage.removeItem('auth');
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSigin = async () => {
    const errData = {};

    Object.getOwnPropertyNames(data).forEach((key) => {
      if (data[key].trim() === '') {
        errData[key] = '请填写内容';
      }
    });

    if (Object.getOwnPropertyNames(errData).length !== 0) {
      setErr(errData);
      return;
    }

    if (data.password1 !== data.password2) {
      setErr(() => ({
        password1: '请确认密码',
        password2: '请确认密码',
      }));

      return;
    }

    const response = await fetch('/api/ent-user/sign-in', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        code: data.code,
        ent_name: data.ent_name,
        password: md5(data.password1),
      }),
    });
    const res = await response.json();
    if (res.message) {
      let alertFlg = false;
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message).forEach((key) => {
          switch (key) {
            case 'code':
              errData[key] = '验证码错误';
              break;
            case 'phone':
              errData[key] = '该电话已注册';
              break;
            case 'ent_name':
              errData[key] = '公司名已被使用';
              break;
            case 'email':
              errData[key] = '该邮箱已注册';
              break;
            default:
              alertFlg = true;
          }
        });
      } else {
        alertFlg = true;
      }
      if (alertFlg) {
        window.alert(res.message);
      }
      setErr(errData);
    } else {
      window.alert('注册成功');
      window.location = '#登录';
    }
  };

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(data.email);
  };

  const handleCode = () => {
    fetch('./api/email/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        user_category: '企业用户',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          window.alert('验证码已发送到公司邮箱');
        }
      });
    const code = setInterval(() => {
      if (count.countdown === 1) {
        clearInterval(code);
        setCount({
          flag: true,
          countdown: 60,
        });
      } else {
        setCount({
          flag: false,
          countdown: (count.countdown -= 1),
        });
      }
    }, 1000);
  };

  return (
    <div className="container-fluid bg-white body-login">
      <div className="px-5 fixed-top border-bottom bg-white body-title">
        <div className="row">
          <div className="col-9 item-middle">
            <img className="img-fluid pull-left logo2" alt="" src="./lib/img/logo3.png" />
          </div>
          <div className="col-1 header-right">
            <a
              className="text-warning pull-right"
              href="#登录"
              style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              我要登录
            </a>
          </div>
          <div className="col-2 header-right pull-left">
            <span className="text-secondary border-0 bg-transparent img-weixin">
              <FontAwesomeIcon icon={faQrcode} fixedWidth />
              小程序
              <p>
                <img className="" alt="" src="./lib/img/qrcode.jpg" />
              </p>
            </span>
          </div>
        </div>
      </div>

      <div
        className="row px-5"
        style={{
          height: '70%',
          minHeight: '459px',
          marginTop: 100,
        }}
      >
        <div className="col mt-1">
          <div className="card col-6 offset-3 col-lg-4 offset-lg-4 border-0">
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <h3>新用户注册</h3>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label>公司名称</label>
                  <input
                    className="form-control rounded-0"
                    type="text"
                    placeholder="公司名称"
                    name="ent_name"
                    value={data.ent_name}
                    onChange={handleChange}
                  />
                  {err.ent_name && <small className="form-text text-danger">{err.ent_name}</small>}
                </div>
                <div className="form-group">
                  <label>邮箱地址</label>
                  <input
                    className="form-control rounded-0"
                    type="email"
                    placeholder="邮箱地址"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {err.email && <small className="form-text text-danger">{err.email}</small>}
                </div>
                <div className="form-group">
                  <label>验证码</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      value={data.code || ''}
                      name="code"
                      placeholder="验证码"
                      onChange={handleChange}
                      className="form-control rounded-0"
                    />
                    <div className="input-group-append">
                      {count.flag ? (
                        <button
                          className="btn btn-primary rounded-0"
                          type="button"
                          onClick={handleCode}
                          disabled={!checkEmail()}
                        >
                          发送验证码
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary rounded-0"
                          type="button"
                          disabled="disabled"
                        >
                          已发送{count.countdown}s
                        </button>
                      )}
                    </div>
                  </div>
                  {err.code && <small className="form-text text-danger">{err.code}</small>}
                </div>
                <div className="form-group">
                  <label>登录密码</label>
                  <input
                    className="form-control rounded-0"
                    type="password"
                    placeholder="密码"
                    name="password1"
                    autoComplete="off"
                    value={data.password1}
                    onChange={handleChange}
                  />
                  {err.password1 && (
                    <small className="form-text text-danger">{err.password1}</small>
                  )}
                </div>
                <div className="form-group">
                  <label>确认密码</label>
                  <input
                    className="form-control rounded-0"
                    type="password"
                    placeholder="确认密码"
                    name="password2"
                    autoComplete="off"
                    value={data.password2}
                    onChange={handleChange}
                  />
                  {err.password2 && (
                    <small className="form-text text-danger">{err.password2}</small>
                  )}
                </div>
              </form>
              <div className="text-secondary text-center">
                <span>
                  点击注册即您已同意
                  <a href="/agt/user.html" target="_blank" style={{ textDecoration: 'none' }}>
                    《用户协议》
                  </a>
                  和
                  <a href="/agt/privacy.html" target="_blank" style={{ textDecoration: 'none' }}>
                    《隐私政策》
                  </a>
                </span>
              </div>
              <div className="row mt-2 px-4 ">
                <div className="col">
                  <button
                    className="mt-2 btn btn-login rounded-0"
                    onClick={handleSigin}
                    type="button"
                  >
                    注册
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sigin;
