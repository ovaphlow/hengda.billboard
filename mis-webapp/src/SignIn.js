import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import { Title, Navbar } from './Components'

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
    setData(prev => ({ ...prev, [name]: value}))
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
      <Title />

      <Navbar category="首页" />

      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <h1 className="text-center">用户 登录</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <div className="form-group">
                  <label>用户名</label>
                  <input type="text" name="username" value={data.username}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input type="password" name="password" value={data.password}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
                  <i className="fa fa-fw fa-sign-in"></i>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}