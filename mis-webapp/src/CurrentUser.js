import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { Title, Navbar, BackwardButton } from './Components'

export default function CurrentUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/当前用户/修改密码"><ChangePassword /></Route>
      </Switch>
    </Router>
  )
}

function SideNav(props) {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a href="#当前用户/修改密码"
          className={`text-small list-group-item list-group-item-action ${props.category === '修改密码' ? 'active' : ''}`}
        >
          修改密码
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function ChangePassword() {
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleChange = async () => {
    if (!!!password || !!!password1 || !!!password2) {
      window.alert('请完整填写所需信息')
      return
    }
    if (password1 !== password2) {
      window.alert('两次输入的新密码不一致')
      return
    }

    const auth = JSON.parse(sessionStorage.getItem('mis-auth'))

    const data = {
      id: auth.id,
      current_password: md5(password),
      new_password: md5(password1)
    }
    let res = await window.fetch(`/api/current-user/change-password`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    res = await res.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.alert('数据已经提交至服务器，即将重定向至登录页面。')
    window.location = '#登录'
  }

  return (
    <>
      <Title />
      <Navbar category="当前用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="修改密码" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>当前用户 - 修改密码</h3>
            <hr />

            <div className="row">
              <div className="offset-lg-4 col-lg-4 offset-3 col-6">
                <div className="card shadow">
                  <div className="card-header">
                    <span className="lead text-danger">修改密码后需要重新登录</span>
                  </div>

                  <div className="card-body">
                    <div className="form-group">
                      <label>当前密码</label>
                      <input type="password" value={password || ''} autoComplete="current-password"
                        className="form-control"
                        onChange={event => setPassword(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>新密码</label>
                      <input type="password" value={password1 || ''} autoComplete="new-password"
                        className="form-control"
                        onChange={event => setPassword1(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>重复新密码</label>
                      <input type="password" value={password2 || ''} autoComplete="new-password"
                        className="form-control"
                        onChange={event => setPassword2(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <BackwardButton />
                    </div>

                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-primary" onClick={handleChange}>
                        <i className="fa fa-fw fa-save"></i>
                        更改密码
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
