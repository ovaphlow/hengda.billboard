import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import ToBack from '../components/ToBack';

const Edit = () => {
  const [data, setData] = useState({
    old_password: '',
    new_password: '',
    password2: '',
    code: '',
    email: '',
  });

  const [err, setErr] = useState({
    old_password: false,
    new_password: false,
    password2: false,
    code: false,
    email: false,
  });
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      setData({
        email: _auth.email,
      });
    }
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

    if (data.new_password !== data.password2) {
      setErr(() => ({
        new_password: '请确认密码',
        password2: '请确认密码',
      }));
      return;
    }

    const response = await fetch(`/api/common-user/updatePassword/?uuid=${auth.uuid}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: auth.id,
        email: auth.email,
        old_password: md5(data.old_password),
        new_password: md5(data.new_password),
        code: data.code,
      }),
    });
    const res = await response.json();
    if (res.message) {
      let alertFlg = false;
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message).forEach((key) => {
          switch (key) {
            case 'old_password':
              errData[key] = '旧密码错误';
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
      window.alert('密码修改完成!');
      window.location = '#/我的';
    }
  };

  const handleCode = () => {
    fetch('./api/email/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        user_category: '个人用户',
      }),
    })
      .then((res1) => res1.json())
      .then((res1) => {
        if (res1.message) {
          window.alert(res1.message);
        } else {
          window.alert('验证码已发送到您的邮箱');
        }
      });
  };

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(data.email);
  };

  const handleLogIn = async () => {
    window.location = '#/登录';
  };
  return (
    <>
      {auth === 0 ? (
        <div className="container-fluid">
          <ToBack href="#我的" category="我的简历" />
          <div className="chat-login">
            <h6>登录后可以修改密码</h6>
            <button
              type="button"
              style={{ width: '25%' }}
              className="btn btn-block mx-auto rounded-pill button-background text-white font-weight"
              onClick={handleLogIn}
            >
              登&nbsp;录
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="card mt-3">
            <ToBack />
            <div className="row mt-3 bg-transparent">
              <div className="col">
                <h5 className="text-center">
                  修改密码
                </h5>
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
                          <span className="input-group-text bg-transparent border-0">
                            <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                          </span>
                        </div>
                        <input
                          type="text"
                          readOnly="readonly"
                          name="email"
                          style={{ fontSize: 18 }}
                          value={data.email}
                          className="form-control col border-0 bg-transparent input-f"
                          placeholder="电子邮箱"
                          onChange={handleChange}
                        />
                      </div>
                      {err.old_password && (
                        <small className="form-text text-danger">{err.old_password}</small>
                      )}
                      <div className="input-group row mb-3 input-group-lg input-control">
                        <div className="input-group-prepend ">
                          <span className="input-group-text bg-transparent text-secondary  border-0">
                            <FontAwesomeIcon icon={faLock} fixedWidth />
                          </span>
                        </div>
                        <input
                          type="password"
                          name="old_password"
                          value={data.old_password || ''}
                          autoComplete="off"
                          className="form-control col border-0 bg-transparent input-f"
                          style={{ fontSize: 18 }}
                          placeholder="请输入旧密码"
                          onChange={handleChange}
                        />
                      </div>
                      {err.new_password && (
                        <small className="form-text text-danger">{err.new_password}</small>
                      )}
                      <div className="input-group row mb-3 input-group-lg input-control">
                        <div className="input-group-prepend ">
                          <span className="input-group-text bg-transparent text-secondary  border-0">
                            <FontAwesomeIcon icon={faLock} fixedWidth />
                          </span>
                        </div>
                        <input
                          type="password"
                          name="new_password"
                          value={data.new_password || ''}
                          autoComplete="off"
                          className="form-control col border-0 bg-transparent input-f"
                          style={{ fontSize: 18 }}
                          placeholder="请输入新密码"
                          onChange={handleChange}
                        />
                      </div>
                      {err.password2 && (
                        <small className="form-text text-danger">{err.password2}</small>
                      )}
                      <div className="input-group row mb-3 input-group-lg input-control">
                        <div className="input-group-prepend ">
                          <span className="input-group-text bg-transparent text-secondary  border-0">
                            <FontAwesomeIcon icon={faLock} fixedWidth />
                          </span>
                        </div>
                        <input
                          type="password"
                          name="password2"
                          value={data.password2 || ''}
                          className="form-control col border-0  bg-transparent input-f"
                          style={{ fontSize: 18 }}
                          autoComplete="off"
                          placeholder="请确认新密码"
                          onChange={handleChange}
                        />
                      </div>
                      {err.code && <small className="form-text text-danger">{err.code}</small>}
                      <div className="input-group row mb-3 input-group-lg input-control">
                        <input
                          type="text"
                          name="code"
                          value={data.code || ''}
                          className="form-control col border-0  bg-transparent input-f"
                          style={{ fontSize: 18 }}
                          placeholder="验证码"
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="col btn btn-sm btn-outline-secondary border-0"
                            disabled={!checkEmail()}
                            onClick={handleCode}
                            style={{ fontSize: 14 }}
                          >
                            发送验证码
                          </button>
                        </div>
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
        </div>
      )}
    </>
  );
};
export default Edit;
