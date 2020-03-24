import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useLocation, useParams } from 'react-router-dom'

import { Title, Navbar, TextRowField, BackwardButton, RefreshButton } from './Components'

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
        <Route path="/系统设置/院校/:id"><SchoolDetail category="编辑" /></Route>
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
  const [list, setList] = useState([])
  const [filter_name, setFilterName] = useState('')

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/settings/school/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setList(res.content)
    })()
  }, [])

  const handleFilter = async () => {
    setList([])
    const response = await window.fetch(`/api/settings/school/?name=${filter_name}`)
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setList(res.content)
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
            <h3>院校</h3>
            <hr />

            <SchoolToolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">名称</span>
                      </div>

                      <input type="text" value={filter_name} aria-label="名称"
                        className="form-control"
                        onChange={event => setFilterName(event.target.value)}
                      />
                    </div>
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
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>备注</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      list.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#系统设置/院校/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit"></i>
                            </a>

                            <span className="pull-right">
                              {it.id}
                            </span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.comment}</td>
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

function SchoolDetail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (id, uuid) => {
        const response = await window.fetch(`/api/settings/school/${id}?uuid=${uuid}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setName(res.content.name)
        setComment(res.content.comment)
      })(id, _uuid)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      const response = await window.fetch(`/api/settings/school/${id}?uuid=${uuid}`, {
        method: 'PUT',
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
                  onChange={event => setName(event.target.value)}
                />

                <TextRowField caption="备注" value={comment || ''}
                  onChange={event => setComment(event.target.value)}
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
