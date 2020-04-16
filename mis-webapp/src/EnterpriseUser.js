import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useLocation, useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { Title, Navbar, InputRowField, BackwardButton } from './Components'
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
        <Route exact path="/企业用户/新增"><Detail category="新增" /></Route>
        <Route path="/企业用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

export function List(props) {
  const [data_list, setDataList] = useState([])

  useEffect(() => {
    ;(async enterprise_id => {
      const response = await fetch(`/api/enterprise/${enterprise_id}/user/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataList(res.content)
    })(props.enterprise_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="list-group">
      {
        data_list.map(it => (
          <a href={`#企业用户/${it.id}?uuid=${it.uuid}&enterprise_id=${props.enterprise_id}&enterprise_uuid=${props.enterprise_uuid}`} className="list-group-item list-group-item-action" key={it.id}>
            {it.name}
            <span className="pull-right text-muted">{it.username}</span>
          </a>
        ))
      }
    </div>
  )
}

function Detail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [enterprise_id, setEnterpriseID] = useState(0)
  const [enterprise_uuid, setEnterpriseUUID] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const _master_id = new URLSearchParams(location.search).get('enterprise_id')
    setEnterpriseID(_master_id)
    const _master_uuid = new URLSearchParams(location.search).get('enterprise_uuid')
    setEnterpriseUUID(_master_uuid)
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (enterprise_id, id, uuid) => {
        const response = await fetch(`/api/enterprise/${enterprise_id}/user/${id}?uuid=${uuid}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setName(res.content.name)
        setUsername(res.content.username)
        setPhone(res.content.phone)
      })(_master_id, id, _uuid)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/${enterprise_id}/user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          enterprise_uuid: enterprise_uuid,
          name: name,
          username: username,
          password: md5(password),
          phone: phone
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${enterprise_id}/user/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          username: username,
          phone: phone
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

                {
                  props.category === '新增' && (
                    <InputRowField caption="密码" value={password || ''}
                      onChange={event => setPassword(event.target.value)}
                    />
                  )
                }

                <InputRowField caption="电话" value={phone || ''}
                  onChange={event => setPhone(event.target.value)}
                />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary"
                    style={{ display: 'none' }}
                    onClick={handleSubmit}
                  >
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
