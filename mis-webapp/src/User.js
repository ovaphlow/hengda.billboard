import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Title, Navbar } from './Components'

export function UserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/用户"><List /></Route>
        <Route path="/用户/新增"><Detail caption="新增" /></Route>
      </Switch>
    </Router>
  )
}

function SideNav(props) {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">
        选项功能
      </h6>

      <div>
        <a href="#用户"
          className={`text-small list-group-item list-group-item-action ${props.category === '列表' ? 'active' : ''}`}
        >
          用户列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#用户/新增"
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
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setData(res.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title />
      <Navbar category="用户" />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>用户列表</h3>
            <hr />

            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>用户名</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(it => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td>{it.name}</td>
                      <td>{it.username}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

function Detail(props) {
  const [data, setData] = useState({
    id: 0,
    username: '',
    name: ''
  })

  useEffect(() => {
    if (props.caption === '编辑') {
      console.info('edit')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    console.info('submit')
  }

  return (
    <>
      <Title />
      <Navbar category="用户" />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={props.caption} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>用户 {props.caption}</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">姓名</label>
                  <div className="col-sm-10">
                    <input type="text" name="name" value={data.name || ''}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>用户名</label>
                  <input type="text" name="username" value={data.username || ''}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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