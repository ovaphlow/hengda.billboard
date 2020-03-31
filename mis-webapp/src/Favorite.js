import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'

import { Title, Navbar, BackwardButton, InputRowField } from './Components'

import { SideNav } from './CommonUser'

export default function FavoriteRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/收藏"><List /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  const location = useLocation()
  const [master_id, setMasterID] = useState(0)
  const [list, setList] = useState([])

  useEffect(() => {
    const _master_id = new URLSearchParams(location.search).get('master_id')
    ;(async master_id => {
      const response = await window.fetch(`/api/favorite/?master_id=${master_id}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setList(res.content)
    })(_master_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Title />
      <Navbar category="普通用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>用户收藏</h3>
            <hr />

            <div className="btn-group">
              <BackwardButton />
            </div>

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>用户类型</th>
                      <th>用户</th>
                      <th>收藏类型</th>
                      <th>收藏内容</th>
                      <th>收藏时间</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      list.map(it => (
                        <tr key={it.id}>
                          <td>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.category1}</td>
                          <td>{it.user_id}</td>
                          <td>{it.category2}</td>
                          <td>
                            <button type="button" className="btn btn-link">
                              {it.data_id}
                            </button>
                          </td>
                          <td>{it.datime}</td>
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
