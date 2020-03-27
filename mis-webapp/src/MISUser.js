import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { Title, Navbar, BackwardButton } from './Components'

export default function MISUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/管理端用户"><List /></Route>
        <Route exact path="/管理端用户/新增"><Detail category="新增" /></Route>
        <Route path="/管理端用户/:id"><Detail category="编辑" /></Route>
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
        <a href="#管理端用户"
          className={`text-small list-group-item list-group-item-action ${props.category === '列表' ? 'active' : ''}`}
        >
          用户列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#管理端用户/新增"
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
    ;(async () => {
      const response = await fetch(`/api/mis-user/`)
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
      <Navbar category="管理端用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>管理端用户列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>姓名</th>
                      <th>用户名</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#管理端用户/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit"></i>
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
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
        </div>
      </div>
    </>
  )
}

function Detail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const uuid = new URLSearchParams(location.search).get('uuid')
        setUUID(uuid)
        const response = await fetch(`/api/mis-user/${id}?uuid=${uuid}`)
        const res = await response.json()
        setName(res.content.name)
        setUsername(res.content.username)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemove = async () => {
    if (!!!window.confirm('确定删除当前数据？')) return
    const response = await window.fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await fetch(`/api/mis-user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: md5('112332'),
          name: name
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          username: username
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    }
  }

  return (
    <>
      <Title />
      <Navbar category="管理端用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={props.category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 管理端用户</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">姓名</label>
                  <div className="col-sm-10">
                    <input type="text" value={name || ''}
                      className="form-control input-borderless"
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">用户名</label>
                  <div className="col-sm-10">
                    <input type="text" value={username || ''}
                      className="form-control input-borderless"
                      onChange={event => setUsername(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  {
                    props.category === '编辑' && (
                      <button type="button" className="btn btn-outline-danger"
                        onClick={handleRemove}
                      >
                        <i className="fa fa-fw fa-trash-o"></i>
                        删除
                      </button>
                    )
                  }
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    <i className="fa fa-fw fa-save"></i>
                    保存
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
