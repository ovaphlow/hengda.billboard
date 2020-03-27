import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import { Title, Navbar } from './Components'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    sessionStorage.removeItem('mis-auth')
  }, [])

  const handleSignIn = async () => {
    const response = await fetch(`/api/mis-user/sign-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: username, password: md5(password) })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    sessionStorage.setItem('mis-auth', JSON.stringify(res.content))
    // window.location = '#/'
    window.history.go(-1)
  }

  return (
    <>
      <Title />

      <Navbar category="首页" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <h1 className="text-center">用户 登录</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>用户名</label>
                    <input type="text" value={username || ''} autoComplete="username"
                      className="form-control input-borderless"
                      onChange={event => setUsername(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>密码</label>
                    <input type="password" value={password || ''} autoComplete="current-password"
                      className="form-control input-borderless"
                      onChange={event => setPassword(event.target.value)}
                    />
                  </div>
                </form>
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
