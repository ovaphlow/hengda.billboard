import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import ToBack from '../components/ToBack'

export default function SignIn() {
  const [data, setData] = useState({
    phone: '',
    password1: '',
    password2: '',
    code: ''
  })

  useEffect(() => {
    sessionStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {
    if (data.password1 !== data.password2) {
      alert('请确认密码!')
      return
    }

    const response = await fetch(`/api/common-user/sign-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        password: md5(data.password),
        code: data.code
      })
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
                <form>
                  <div className="form-group ">
                    <input type="text" name="phone" value={data.phone}
                      className="input-control"
                      placeholder="手机号码"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password1" value={data.password1}
                      className="input-control"
                      placeholder="登陆密码"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password2" value={data.password2}
                      className="input-control"
                      placeholder="确认密码"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password" name="code" value={data.code}
                      className="input-control"
                      placeholder="验证码"
                      onChange={handleChange}
                    />
                  </div>
                </form>
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