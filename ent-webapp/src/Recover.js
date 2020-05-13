import React, { useEffect, useState } from 'react'

import md5 from 'blueimp-md5'

const Recover = () => {

  const [data, setData] = useState({
    code: '',
    email: '',
    password1: '',
    password2: ''
  })

  const [err, setErr] = useState({
    code: '',
    email: '',
    password1: '',
    password2: ''
  })

  useEffect(() => {
    sessionStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSigin = async () => {

    const errData = {}

    Object.getOwnPropertyNames(data).forEach(key => {
      if (data[key].trim() === '') {
        errData[key] = '请填写内容'
      }
    })


    if (Object.getOwnPropertyNames(errData).length !== 0) {
      setErr(errData)
      console.info(errData)
      return
    }

    if (data.password1 !== data.password2) {
      setErr(p => ({
        password1: '请确认密码',
        password2: '请确认密码'
      }))

      return
    }

    const response = await fetch(`/api/ent-user/recover`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: md5(data.password1),
        code: data.code,
        email: data.email,
        user_category: '企业用户'
      })
    })
    const res = await response.json()
    if (res.message) {
      let alertFlg = false
      if (typeof res.message === 'object') {
        Object.getOwnPropertyNames(res.message)
          .forEach(key => {
            switch (key) {
              case 'code':
                errData[key] = '验证码错误'
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
      return
    } else {
      window.alert('操作成功')
      window.location = "#登录"
    }
  }

  const handleCode = () => {
    fetch(`./api/ent-user/checkRecover`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          fetch(`./api/email/`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: data.email,
              code: data.code,
              user_category: '企业用户'
            })
          })
            .then(res => res.json())
            .then(res => {
              if (res.message) {
                window.alert(res.message)
              } else {
                window.alert('验证码已发送到公司邮箱')
              }
            })
        }
      })
  }

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(data.email)
  }

  return (
    <div className="container-fluid bg-white" style={{
      height: '100vh'
    }}>
      <div className="row px-5 border-bottom" style={{ height: '15%', minHeight: 99 }}>
        <div className="col item-middle">
          <div className="row ">
            <div className="col">
              <img className="img-fluid pull-left logo2" alt="" src={require('./components/img/logo2.png')} />
            </div>
          </div>
        </div>
        <div className="col flex-end">
          <a href="#登录" className="btn btn-primary btn-lg ">
            我要登录
          </a>
        </div>
      </div>

      <div className="row px-5 " style={{
        height: '70%',
        minHeight: '459px'
      }}>
        <div className="col mt-1" >
          <div className="card col-6 offset-3 col-lg-4 offset-lg-4 border-0">
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <h3>忘记密码</h3>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label>企业邮箱</label>
                  <input className="form-control rounded-0"
                    type="email"
                    placeholder="企业邮箱"
                    name="email"
                    value={data.email}
                    onChange={handleChange} />
                  {err.email && <small className="form-text text-danger">{err.phone}</small>}
                </div>


                <div className="form-group">
                  <label>验证码</label>
                  <div className="input-group mb-3">
                    <input type="text" value={data.code || ''} name="code"
                      placeholder="验证码"
                      onChange={handleChange}
                      className="form-control rounded-0" />
                    <div className="input-group-append">
                      <button className="btn btn-primary rounded-0" type="button"
                        onClick={handleCode} disabled={!checkEmail()}>
                        发送验证码
                      </button>
                    </div>
                  </div>
                  {err.code && <small className="form-text text-danger">{err.code}</small>}
                </div>

                <div className="form-group">
                  <label>新密码</label>
                  <input className="form-control rounded-0"
                    type="password"
                    placeholder="密码"
                    name="password1"
                    autoComplete="off"
                    value={data.password1}
                    onChange={handleChange} />
                  {err.password1 && <small className="form-text text-danger">{err.password1}</small>}
                </div>
                <div className="form-group">
                  <label>确认密码</label>
                  <input className="form-control rounded-0"
                    type="password"
                    placeholder="确认密码"
                    name="password2"
                    autoComplete="off"
                    value={data.password2}
                    onChange={handleChange} />
                  {err.password2 && <small className="form-text text-danger">{err.password2}</small>}
                </div>
              </form>
              <div className="row mt-3 px-4 ">
                <div className="col">
                  <button type="button" className="mt-2 btn btn-login rounded-0" onClick={handleSigin}>
                    提交
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row footer px-5 border-top  text-secondary" style={{
        height: '15%',
        minHeight: 99
      }}>
        <div className="col mt-4">
          <div className="row flex-center">
            <h5>版权声明: xxxxx</h5>
          </div>
          <div className="row flex-center">
            <h5>销售热线:0451-xxxxxxxx
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            客服热线:0451-xxxxxxxx</h5>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Recover