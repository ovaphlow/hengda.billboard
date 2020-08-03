import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

import ToBack from '../components/ToBack';

const Recover = () => {
  const [data, setData] = useState({
    password1: '',
    password2: '',
    code: '',
    email: '',
  });

  const [err, setErr] = useState({

    password1: false,
    password2: false,
    code: false,
    email: false,
  });

  useEffect(() => {
    sessionStorage.removeItem('auth');
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecover = async () => {
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
      setErr((p) => ({
        password1: '请确认密码',
        password2: '请确认密码',
      }));
      return;
    }

    const response = await fetch('/api/common-user/recover/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: md5(data.password1),
        code: data.code,
        email: data.email,
        user_category: '个人用户',
      }),
    });
    const res = await response.json();
    if (res.message) {
      let alertFlg = false;
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message)
          .forEach((key) => {
            switch (key) {
              case 'code':
                errData[key] = '验证码错误';
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
      window.alert('密码已重置');
      window.location = '#/登录';
    }
  };

  const handleCode = () => {
    fetch('./api/common-user/checkRecover', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          fetch('./api/email/', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: data.email,
              user_category: '个人用户',
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.message) {
                window.alert(res.message);
              } else {
                window.alert('验证码已发送到您的邮箱');
              }
            });
        }
      });
  };

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(data.email);
  };

  return (
    <>
      <div className="container-fluid background-login">
        <ToBack />
        <div className="row mt-3 bg-transparent text-white">
          <div className="col">
            <h4 className="text-center ">
              密码重置
            </h4>
          </div>
        </div>

        <div className="row bg-transparent text-dark">
          <div className="col">
            <div className="card border-0 bg-transparent text-dark">
              <div className="card-body card-p">
                <form>
                  {err.email && <small className="form-text text-danger">{err.email}</small>}
                  <div className="input-group row mb-3 input-group-lg input-control">
                    <div className="input-group-prepend ">
                      <span className="input-group-text bg-transparent text-white border-0">
                        <i className="fa-fw fa fa-envelope fa-1x" aria-hidden="true" />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="email"
                      value={data.email}
                      className="form-control col border-0 bg-transparent text-white input-placeholder input-f"
                      placeholder="电子邮箱"
                      onChange={handleChange}
                    />
                  </div>
                  {err.code && <small className="form-text text-danger">{err.code}</small>}
                  <div className="input-group row mb-3 input-group-lg input-control">
                    <input
                      type="text"
                      name="code"
                      value={data.code}
                      className="form-control col border-0  bg-transparent text-white input-placeholder input-f"
                      placeholder="验证码"
                      onChange={handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="col btn btn-secondary btn-sm btn-outline-secondary border-0 text-white"
                        disabled={!checkEmail()}
                        onClick={handleCode}
                        style={{ fontSize: 14 }}
                      >
                        发送验证码
                      </button>
                    </div>

                  </div>
                  {err.password1 && <small className="form-text text-danger">{err.password1}</small>}
                  <div className="input-group row mb-3 input-group-lg input-control">
                    <div className="input-group-prepend ">
                      <span className="input-group-text bg-transparent text-white  border-0">
                        <i className="fa-fw fa fa-lock fa-1x" aria-hidden="true" />
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password1"
                      value={data.password1}
                      autoComplete="off"
                      className="form-control col border-0 bg-transparent text-white input-placeholder input-f"
                      placeholder="密码"
                      onChange={handleChange}
                    />
                  </div>
                  {err.password2 && <small className="form-text text-danger">{err.password2}</small>}
                  <div className="input-group row mb-3 input-group-lg input-control">
                    <div className="input-group-prepend ">
                      <span className="input-group-text bg-transparent text-white  border-0">
                        <i className="fa-fw fa fa-lock fa-1x" aria-hidden="true" />
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password2"
                      value={data.password2}
                      className="form-control col border-0  bg-transparent text-white input-placeholder input-f"
                      autoComplete="off"
                      placeholder="确认密码"
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>

              <div className="form-group row">
                <button
                  type="button"
                  style={{ width: '80%' }}
                  className="btn btn-block mx-auto rounded-pill button-background text-white"
                  onClick={handleRecover}
                >
                  确&nbsp;定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recover;
