import React, { useState, useEffect } from 'react';
import { View } from './Components';

const User = () => {
  const [data, setData] = useState({
    phone: '',
    email: '',
    code: '',
  });

  const [count, setCount] = useState({
    countdown: 60,
    flag: true,
  });

  const [err, setErr] = useState({
    phone: '',
    email: '',
    code: '',
  });

  const [auth, setAuth] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth !== null) {
      setData({
        phone: _auth.phone,
        email: _auth.email,
        code: _auth.code,
      });
      setAuth(_auth);
    } else {
      window.location = '#登录';
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
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

  const handleSave = async () => {
    const err1 = {};
    const res1 = await fetch('./api/ent-user/checkEmail/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        id: auth.id,
      }),
    });

    const emailCheck = await res1.json();
    if (emailCheck.message) {
      err1.email = '该邮箱已注册';
    }

    const res2 = await fetch('./api/ent-user/checkPhone/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        id: auth.id,
      }),
    });
    const phoneCheck = await res2.json();
    if (phoneCheck.message) {
      err1.phone = '该电话号码已被使用';
    }

    window.console.info(phoneCheck);

    if (Object.getOwnPropertyNames(err1).length === 0) {
      fetch(`./api/ent-user/${auth.id}?uuid=${auth.uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            if (typeof res.message === 'object') {
              err1.code = '验证码错误';
            } else {
              window.alert(res.message);
            }
          } else {
            window.alert('操作成功');
            window.location = '#我的/信息';
          }
          setErr(err1);
        });
    } else {
      setErr(err1);
    }
  };

  return (
    <View category="用户信息">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">用户信息</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div className="card col-6 offset-3 col-lg-4 offset-lg-4 border-0">
                  <div className="form-group">
                    <label>电话号码</label>
                    <input
                      className="form-control rounded-0"
                      type="text"
                      placeholder="电话号码"
                      name="phone"
                      value={data.phone || ''}
                      onChange={handleChange}
                    />
                    {err.phone && <small className="form-text text-danger">{err.phone}</small>}
                  </div>
                  <div className="form-group">
                    <label>邮箱地址</label>
                    <input
                      className="form-control rounded-0"
                      type="text"
                      placeholder="邮箱地址"
                      name="email"
                      value={data.email || ''}
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
                  <div className="row ">
                    <div className="col">
                      <button
                        className="btn btn-primary rounded-0 w-100"
                        type="button"
                        onClick={handleSave}
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default User;
