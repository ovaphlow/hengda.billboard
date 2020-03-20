import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Title, Navbar } from './Components'

export default function FeedbackRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/投诉及反馈/投诉"><Complaint /></Route>
        <Route path="/投诉及反馈/反馈"><Feedback /></Route>
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
        <a href="#投诉及反馈/投诉"
          className={`text-small list-group-item list-group-item-action ${props.category === '投诉' ? 'active' : ''}`}
        >
          投诉
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#投诉及反馈/反馈"
          className={`text-small list-group-item list-group-item-action ${props.category === '反馈' ? 'active' : ''}`}
        >
          反馈
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function Complaint() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/feedback/feedback/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setData(res.content)
    })()
  }, [])

  return (
    <>
      <Title />
      <Navbar category="投诉及反馈" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="投诉" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>投诉</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>用户</th>
                      <th>日期</th>
                      <th>内容</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>
                            <span className="badge badge-info">{it.user_category}</span>
                            {it.name}
                            ({it.username})
                          </td>
                          <td>{it.datime}</td>
                          <td>{it.content}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Feedback() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/feedback/complaint/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setData(res.content)
    })()
  }, [])

  return (
    <>
      <Title />
      <Navbar category="投诉及反馈" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="反馈" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>反馈</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>用户</th>
                      <th>日期</th>
                      <th>内容</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>
                            <span className="badge badge-info">{it.user_category}</span>
                            {it.name}
                            ({it.username})
                          </td>
                          <td>{it.datime}</td>
                          <td>{it.content}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
