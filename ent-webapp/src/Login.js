import React, { useEffect, useState } from 'react'

import md5 from 'blueimp-md5'
import Hover from './components/Hover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'

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
    <div className="container-fluid bg-light body-login">
      <div className="px-5 fixed-top bg-white border-bottom body-title">
        <div className="row">
          <div className="col item-middle">
            <img className="img-fluid pull-left logo2" alt="" src={require('./components/img/logo3.png')} />
          </div>
          <div className="col-1 header-right">
            <a className="text-warning pull-right" href="#注册" style={{ fontSize: '16px', textDecoration: 'none' }}>
              企业注册
              </a>
          </div>
          <div className="col-2 header-right pull-left">
            <a className="text-secondary border-0 bg-transparent img-weixin"
              style={{ textDecoration: 'none' }}
              href={{ javascript: void (0) }}>
              <FontAwesomeIcon icon={faQrcode} fixedWidth />
                小程序
              <p><img className="" alt="" src={require('./components/img/qr.png')} /></p>
            </a>
          </div>
        </div>
      </div>

      <div className="row login-body px-5 header" style={{
        height: '90vh',
        minHeight: '459px'
      }}>
        <div className="col w-25 mt-5" >
          <div className="card pull-right rounded-0">
            <div className="card-body text-center">
              <h5>登录</h5>
              <hr />
              <form onSubmit={handleLogIn}>
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
                <div className="row px-4" style={{ visibility: 'hidden' }}>
                  <div className="col-7">
                    <input type="text" className="col form-control rounded-0" />
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-secondary rounded-0" style={{ height: '100%', fontSize: 'small' }}>
                      发送验证码
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3 px-4 ">
                <div className="col">
                  <button type="button" className="mt-2 btn btn-login rounded-0" onClick={handleLogIn}>
                    登录
                    </button>
                </div>
              </div>
              <div className="row mt-2 px-4 ">
                <div className="col">
                  <a className="text-dark pull-right" href="#忘记密码" style={{ fontSize: 'small', textDecoration: 'none' }}>
                    忘记密码?
                      </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Hover />
      <div className="between-box card shadow mt-3" style={{ height: '50%', minHeight: '459px' }}>
        <div className="pt-5 pb-3">
          <h2>合作企业</h2>
        </div>
        <div className="text-center m-auto">
          <div>
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/1.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/4.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/10.png')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/5.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/17.png')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/19.png')} />
          </div>
          <div>
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/2.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/3.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/7.png')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/9.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/8.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/13.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/15.png')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/16.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/21.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/22.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/23.jpg')} />
            <img className="border between-content1 shadow-sm" alt="" src={require('./components/img/24.jpg')} />
          </div>
          <div>
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/6.png')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/11.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/12.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/14.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/18.jpg')} />
            <img className="border between-content shadow-sm" alt="" src={require('./components/img/20.jpg')} />
          </div>
        </div>
      </div>
      <div className="row footer px-6 text-white bg-dark border-top pb-3">
        <div className="col mt-4">
          <div className="row flex-center">
            <a className="footer-word" href="www.baidu.com">
              法律声明|
            </a>
            <a className="footer-word" href="www.baidu.com">
              隐私政策|
            </a>
            <span>版权声明: xxxxx|</span>
            <a className="footer-word" href="http://www.beian.miit.gov.cn/">
              互联网ICP备案:黑ICP备20002542号
            </a>
          </div>
          <div className="row flex-center">
            <span>
              合作咨询热线:0451-xxxxxxxx|客服热线:0451-xxxxxxxx|
              违法和不良信息举报电话:0451-xxxxxxxx|举报邮箱:
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login