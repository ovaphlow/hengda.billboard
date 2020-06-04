import React, { useEffect, useState } from 'react'

import md5 from 'blueimp-md5'

const Login = () => {


  const [data, setData] = useState({
    phone_email: '',
    password: ''
  })

  useEffect(() => {
    sessionStorage.removeItem('auth')
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogIn = async () => {
    const response = await fetch(`/api/ent-user/log-in`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ip: window.returnCitySN.cip,
        address: window.returnCitySN.cname,
        phone_email: data.phone_email,
        password: md5(data.password)
      })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    } else {
      sessionStorage.setItem('auth', JSON.stringify(res.content))
      window.location = "#/"
    }
  }

  return (
    <div className="container-fluid bg-white" style={{
      height: '100vh'
    }}>
      <div className="row px-5" style={{ height: '15%', minHeight: 99 }}>
        <div className="col item-middle">
          <div className="row ">
            <div className="col">
              <img className="img-fluid pull-left logo2" alt="" src={require('./components/img/logo2.png')} />
            </div>
          </div>
        </div>
      </div>

      <div className="row login-body px-5" style={{
        height: '70%',
        minHeight: '459px'
      }}>
        <div className="col w-25 mt-5" >
          <div className="card pull-right rounded-0">
            <div className="card-body text-center">
              <h5>登录</h5>
              <hr />
              <form>
                <div className="row px-4">
                  <div className="col form-group">
                    <input className="mt-3 form-control rounded-0"
                      type="text"
                      placeholder="请输入手机号码或邮箱"
                      value={data.phone_email}
                      name="phone_email"
                      onChange={handleChange} />
                  </div>
                </div>
                <div className="row px-4">
                  <div className="col form-group">
                    <input className="mt-2 form-control rounded-0"
                      type="password"
                      placeholder="请输入密码"
                      name="password"
                      autoComplete="off"
                      value={data.password}
                      onChange={handleChange} />
                  </div>
                </div>
                <div className="row px-4" style={{visibility:'hidden'}}>
                  <div className="col-7">
                    <input type="text" className="col form-control rounded-0" />
                  </div>
                  <div className="col">
                    <button className="btn btn-secondary rounded-0" style={{ height: '100%', fontSize: 'small' }}>
                      发送验证码
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3 px-4 ">
                <div className="col">
                  <button className="mt-2 btn btn-login rounded-0" onClick={handleLogIn}>
                    登录
                    </button>
                </div>
              </div>
              <div className="row mt-2 px-4 ">
                <div className="col">
                  <a className="pull-left" href="#注册" style={{ fontSize: 'small' }}>
                    注册
                      </a>
                </div>
                <div className="col">
                  <a className="text-dark pull-right" href="#忘记密码" style={{ fontSize: 'small' }}>
                    忘记密码?
                      </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row footer px-5  text-secondary bg-white " style={{
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
          <div className="row flex-center">
            <a className="text-secondary" href="http://www.beian.miit.gov.cn/">
              互联网ICP备案:黑ICP备20002542号
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login