import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import ToBack from './components/ToBack'

export default function SignIn() {
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    sessionStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {
    const response = await fetch(`/api/sign-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: data.username, password: md5(data.password) })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#/'
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="row mt-5">
          <div className="col">
            <h4 className="text-center">
              <span className="text-primary">hi</span>
              &nbsp;
              欢迎来到龙江学子就业平台
            </h4>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="card border-0">
              <div className="card-body">
                <div className="form-group ">
                  <input type="text" name="username" value={data.username}
                    className="input-control"
                    placeholder="手机号码"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={data.password}
                    className="input-control"
                    placeholder="登陆密码"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={data.password}
                    className="input-control"
                    placeholder="确认密码"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={data.password}
                    className="input-control"
                    placeholder="验证码"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
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