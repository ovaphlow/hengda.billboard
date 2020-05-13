import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import ToBack from '../components/ToBack'

export default function LogIn() {
  const [data, setData] = useState({
    phone: '',
    password: ''
  })

  useEffect(() => {
    localStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogIn = async () => {
    const response = await fetch(`/api/common-user/log-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        ip: window.returnCitySN.cip,
        address: window.returnCitySN.cname,
        phone: data.phone, password: md5(data.password) 
      })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    } else {
      localStorage.setItem('auth', JSON.stringify(res.content))
      window.location='#'
    }
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack href="#" />
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
                  <input type="text"
                    name="phone"
                    value={data.phone}
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
              </div>
              <div className="form-group">
                <button
                  type="button"
                  style={{ width: '80%' }}
                  className="btn btn-block btn-primary mx-auto"
                  onClick={handleLogIn}>
                  登录
                </button>
              </div>
              <div
                style={{
                  width: '95%',
                  fontSize: 13
                }}
                className="row mx-auto">
                <div className="col">
                  <a className="text-muted" href="#/注册">
                    立即注册
                  </a>
                </div>
                <div className="col">
                  <a className="pull-right text-muted" href="#/忘记密码">
                    忘记密码
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}