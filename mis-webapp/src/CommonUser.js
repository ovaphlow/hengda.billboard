import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { Title, Navbar, BackwardButton, TextRowField, RefreshButton } from './Components'

export default function CommonUserRouter() {
  return (
    <Router>
      <Switch>\
        <Route exact path="/普通用户"><List /></Route>
        <Route exact path="/普通用户/新增"><Detail category="新增" /></Route>
        <Route path="/普通用户/:id"><Detail category="编辑" /></Route>
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
  const [data, setData] = useState([])
  const [filterParams, setFilterParams] = useState({
    filter_name: '',
  })

  const handleFilterParamsChange = e => {
    const { value, name } = e.target
    setFilterParams(prev => ({ ...prev, [name]: value}))
  }

  const handleFilter = async () => {
    const response = await window.fetch(`/api/common-user/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(filterParams)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setData(res.content)
  }

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
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto mt-2">
                    <label className="sr-only">姓名</label>
                    <input type="text" name="filter_name" value={filterParams.filter_name} placeholder="姓名"
                      className="form-control mb-2"
                      onChange={handleFilterParamsChange}
                    />
                  </div>

                  <div className="col-auto">
                    <div className="btn-group">
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>姓名</th>
                      <th>用户名</th>
                      <th>EMAIL</th>
                      <th>电话</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map(it => (
                      <tr key={it.id}>
                        <td>
                          <a href={`#普通用户/${it.id}`}>
                            <i className="fa fa-fw fa-edit"></i>
                          </a>
                          <span className="pull-right">{it.id}</span>
                        </td>
                        <td>{it.name}</td>
                        <td>{it.username}</td>
                        <td>{it.email}</td>
                        <td>{it.phone}</td>
                      </tr>
                    ))}
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

function Detail(props) {
  const [data, setData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  })
  const { id } = useParams()

  useEffect(() => {
    if (props.category === '编辑') {
      console.info(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common-user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          password: md5(data.password),
          email: data.email,
          phone: data.phone
        })
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

                    <TextRowField caption="密码" name="password" value={data.password || ''} handleChange={handleChange} />

                    <TextRowField caption="EMAIL" name="email" value={data.email || ''} handleChange={handleChange} />

                    <TextRowField caption="电话" name="phone" value={data.phone || ''} handleChange={handleChange} />
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