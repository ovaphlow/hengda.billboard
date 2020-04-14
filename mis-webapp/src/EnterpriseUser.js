import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useLocation, useParams } from 'react-router-dom'

import { Title, Navbar, InputRowField, BackwardButton, RefreshButton } from './Components'
import { SideNav } from './Enterprise'

export default function EnterpriseUserRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/企业用户/新增"><Detail category="新建" /></Route>
      </Switch>
    </Router>
  )
}

function Detail(props) {
  const { id, user_id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (id, user_id, uuid) => {
        const response = await fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${_uuid}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setName(res.content.name)
        setUsername(res.content.username)
      })(id, user_id, uuid)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/${id}/user/`, {
        method: 'POST',
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
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${uuid}`, {
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
      <Navbar />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 企业用户</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField caption="姓名" value={name || ''} onChange={event => setName(event.target.value)} />

                <InputRowField caption="用户名" value={username || ''} onChange={e => setUsername(e.target.value)} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    <i className="fa fa-fw fa-edit"></i>
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
