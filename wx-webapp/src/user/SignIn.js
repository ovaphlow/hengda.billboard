import React, { useState, useEffect } from 'react'
import md5 from 'blueimp-md5'

import ToBack from '../components/ToBack'

export default function SignIn() {
  const [data, setData] = useState({
    email: '',
    password1: '',
    password2: '',
    code: '',
    name: ''
  })


  const [err, setErr] = useState({
    email: false,
    password1: false,
    password2: false,
    code: false,
    name: false
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
        password: md5(data.password1),
        code: data.code,
        name: data.name,
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
                errData[key] = '该邮箱已注册'
                break
              case 'name':
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

  const handleCode = () => {
    fetch(`./api/email/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        user_category: '个人用户'
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          window.alert('验证码已发送到您的邮箱')
        }
      })
  }

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(data.email)
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
                  {err.email && <small className="form-text text-danger">{err.email}</small>}
                  <div className="form-group row">
                    <input type="text" name="email" value={data.email}
                      className="input-control col"
                      placeholder="邮箱地址"
                      onChange={handleChange}
                    />
                  </div>

                  {err.name && <small className="form-text text-danger">{err.name}</small>}
                  <div className="form-group row">
                    <input type="text" name="name" value={data.name}
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
                  {err.code && <small className="form-text text-danger">{err.code}</small>}
                  <div className="form-group row">
                    <input type="text" name="code" value={data.code}
                      className="input-control col"
                      placeholder="验证码"
                      onChange={handleChange}
                    />
                    <button type="button" style={{ fontSize: 14 }}
                      disabled={!checkEmail()} onClick={handleCode}
                      className="col-4 btn rounded-0 btn-secondary btn-sm">
                      发送验证码
                    </button>
                  </div>
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