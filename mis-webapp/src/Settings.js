import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useLocation, useParams } from 'react-router-dom'

import { Title, Navbar, TextRowField, BackwardButton } from './Components'

export default function SettingsRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/系统设置/院校"><School /></Route>
        <Route exact path="/系统设置/院校/新增"><SchoolDetail category="新增" /></Route>
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
        <a href="#系统设置/院校"
          className={`text-small list-group-item list-group-item-action ${props.category === '院校' ? 'active' : ''}`}
        >
          院校
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function SchoolToolbar() {
  return (
    <div className="mb-2">
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success btn-sm shadow"
          onClick={() => window.location = `#系统设置/院校/新增`}
        >
          <i className="fa fa-fw fa-plus"></i>
          新增
        </button>
      </div>

      <div className="btn-group pull-right">
        <button type="button" className="btn btn-outline-secondary btn-sm shadow"
          onClick={() => window.location = `#系统设置/院校`}
        >
          <i className="fa fa-fw fa-list"></i>
          列表
        </button>
      </div>
    </div>
  )
}

function School() {
  return (
    <>
      <Title />
      <Navbar category="系统设置" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="院校" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>院校</h3>
            <hr />

            <SchoolToolbar />

            <div className="card shadow">
              <div className="card-header"></div>

              <div className="card-body">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SchoolDetail(props) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/settings/school/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          comment: comment
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {

    }
  }

  return (
    <>
      <Title />
      <Navbar category="系统设置" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="院校" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 院校</h3>
            <hr />

            <SchoolToolbar />

            <div className="card shadow">
              <div className="card-body">
                <TextRowField caption="名称" value={name || ''}
                  handleChange={event => setName(event.target.value)}
                />

                <TextRowField caption="备注" value={comment || ''}
                  handleChange={event => setComment(event.target.value)}
                />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    <i className="fa fa-fw fa-check"></i>
                    确定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
