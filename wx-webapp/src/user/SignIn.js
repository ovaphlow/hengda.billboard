import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import ToBack from '../components/ToBack'

export default function SignIn() {
  const [data, setData] = useState({
    phone: '',
    password1: '',
    password2: '',
    // code: '',
    username: ''
  })


  const [err, setErr] = useState({
    phone: false,
    password1: false,
    password2: false,
    code: false,
    username: false
  })

  useEffect(() => {
    sessionStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {

    const errData = {}

    Object.getOwnPropertyNames(data).forEach(key => {
      if (data[key].trim() === '') {
        errData[key] = '请填写内容'
      }
    })

    if (Object.getOwnPropertyNames(errData).length !== 0) {
      setErr(errData)
      return
    }

    if (data.password1 !== data.password2) {
      setErr(p => ({
        password1: '请确认密码',
        password2: '请确认密码'
      }))
      return
    }

    const response = await fetch(`/api/common-user/sign-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        password: md5(data.password1),
        code: data.code,
        username: data.username,
        email: data.email
      })
    })
    const res = await response.json()
    if (res.message) {
      let alertFlg = false
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message)
          .forEach(key => {
            switch (key) {
              case 'phone':
                errData[key] = '该电话号已注册'
                break
              case 'username':
                errData[key] = '用户名已被使用'
                break
              default:
                alertFlg = true
            }
          })
      } else {
        alertFlg = true
      }
      if (alertFlg) {
        window.alert(res.message)
      }
      setErr(errData)
    } else {
      window.alert('注册成功')
      window.history.go(-1)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="row mt-3">
          <div className="col">
            <h4 className="text-center">
              <span className="text-primary">hi</span>
              &nbsp;
              欢迎来到龙江学子就业平台
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card border-0">
              <div className="card-body">
                <form>
                  {err.phone && <small className="form-text text-danger">{err.phone}</small>}
                  <div className="form-group row">
                    <input type="text" name="phone" value={data.phone}
                      className="input-control col"
                      placeholder="手机号码"
                      onChange={handleChange}
                    />
                  </div>
                  
                  {err.username && <small className="form-text text-danger">{err.username}</small>}
                  <div className="form-group row">
                    <input type="text" name="username" value={data.username}
                      className="input-control col"
                      placeholder="用户名称"
                      onChange={handleChange}
                    />
                  </div>
                  {err.password1 && <small className="form-text text-danger">{err.password1}</small>}
                  <div className="form-group row">
                    <input type="password"
                      name="password1"
                      value={data.password1}
                      autoComplete="off"
                      className="input-control col"
                      placeholder="登陆密码"
                      onChange={handleChange}
                    />
                  </div>
                  {err.password2 && <small className="form-text text-danger">{err.password2}</small>}
                  <div className="form-group row">
                    <input type="password" name="password2" value={data.password2}
                      className="input-control col"
                      autoComplete="off"
                      placeholder="确认密码"
                      onChange={handleChange}
                    />
                  </div>
                  {/* {err.code && <small className="form-text text-danger">{err.code}</small>}
                  <div className="form-group row">
                    <div className="col">
                      <input type="text" name="code" value={data.code}
                        className="input-control"
                        placeholder="验证码"
                        onChange={handleChange}
                      />
                    </div>
                    <button className="col-3 btn rounded-0 btn-secondary btn-sm" style={{ fontSize: 14 }}>
                      发送验证码
                    </button>
                  </div> */}

                </form>
              </div>

              <div className="form-group row">
                <button
                  type="button"
                  style={{ width: '80%' }}
                  className="btn btn-block btn-primary mx-auto"
                  onClick={handleSignIn}>
                  注册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}