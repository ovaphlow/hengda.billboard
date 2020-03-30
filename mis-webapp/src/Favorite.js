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
      console.info(res)
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
          </div>
        </div>
      </div>
    </>
  )
}
