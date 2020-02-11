import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { Title, Navbar, BackwardButton, TextRowField } from './Components'

export default function CommonUserRouter() {
  return (
    <Router>
      <Switch>\
        <Route exact path="/普通用户"><List /></Route>
        <Route path="/普通用户/新增"><Detail category="新增" /></Route>
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
        <a href="#普通用户"
          className={`text-small list-group-item list-group-item-action ${props.category === '列表' ? 'active' : ''}`}
        >
          用户列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#普通用户/新增"
          className={`text-small list-group-item list-group-item-action ${props.category === '新增' ? 'active' : ''}`}
        >
          新增用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function List() {
  return (
    <>
      <Title />
      <Navbar category="普通用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>普通用户 列表</h3>
            <hr />

            <div className="card shadow">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Detail(props) {
  const [data, setData] = useState({
    name: '',
    username: '',
    email: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common-user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#普通用户'
    } else if (props.category === '编辑') {
    }
  }

  return (
    <>
      <Title />
      <Navbar category="普通用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="新增" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 普通用户</h3>
            <hr />

            <div className="row">
              <div className="col-8">
                <div className="card shadow">
                  <div className="card-header">用户信息</div>

                  <div className="card-body">
                    <TextRowField caption="姓名" name="name" value={data.name || ''} handleChange={handleChange} />

                    <TextRowField caption="用户名" name="username" value={data.username || ''} handleChange={handleChange} />

                    <TextRowField caption="Email" name="email" value={data.email || ''} handleChange={handleChange} />
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <BackwardButton />
                    </div>

                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        <i className="fa fa-fw fa-check"></i>
                        确定
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                {
                  props.category === '编辑' && (
                    <div className="card shadow">
                      <div className="card-header">用户简历</div>

                      <div className="card-body">
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}