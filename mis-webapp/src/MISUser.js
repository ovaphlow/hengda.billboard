import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import Title from './components/Title'
import Navbar from './components/Navbar'
import { BackwardButton } from './components/Button'

export default function MISUserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path=""><List /></Route>
        <Route exact path="/管理端用户/新增"><Detail caption="新增" /></Route>
        <Route path="/管理端用户/:id"><Detail caption="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  const [data, setData] = useState([])

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(`/api/mis-user/`)
    //   const res = await response.json()
    //   if (res.message) {
    //     window.console.error(res.message)
    //     return
    //   }
    //   setData(res.content)
    // }
    // fetchData()
  }, [])

  return (
    <>
      <div className="container-fluid">
        <Title category="我的" />
        <div className="row ">
          <div className="col-2 ">
            <img className="img-circle" style={{ height: 50 }} src="lib/img/u868.png" alt="" />
          </div>
          <div className="col">
            <div className="row ">
              <div className="col">
                <h6>未登录</h6>
              </div>
            </div>
            <span className="text-muted">
              你还没有创建简历,暂时无法投递
            </span>

          </div>
        </div>
        <hr />
        <div className="row pb-2 text-center">
          <div className="col">
            <a href="#/" className="text-muted">
              <i class="fa fa-fw fa-3x fa-file-text" aria-hidden="true"></i>
              <br />
              我的简历
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i class="fa fa-fw fa-3x fa-rss-square" aria-hidden="true"></i>
              <br />
              投递情况
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i class="fa fa-fw fa-3x fa-clock-o" aria-hidden="true"></i>
              <br />
              历史记录
            </a>
          </div>
          <div className="col">
            <a href="#/" className="text-muted">
              <i class="fa fa-fw fa-3x fa-star" aria-hidden="true"></i>
              <br />
              我的收藏
            </a>
          </div>
        </div>
        <div className="row" style={{ height: 7, backgroundColor: 'rgb(228, 238, 249)' }}>
        </div>
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>平台介绍</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>日程</strong>
              </h6>
              <span className="pull-right text-muted">
                提示即将进行的日程
                <i className="fa fa-chevron-right fa-fw " aria-hidden="true"></i>     
              </span>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
        <div className="row p-2 mt-2" >
          <div className="col">
            <a className="text-dark" href="#/登录" >
              <h6 className="pull-left" >
                <strong>意见反馈</strong>
              </h6>
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <hr style={{ marginTop: '0', marginBottom: '0' }} />
      </div>
      <Navbar category="我的" />
    </>
  )
}

function Detail(props) {
  const [data, setData] = useState({
    id: 0,
    username: '',
    name: ''
  })
  const { id } = useParams()

  useEffect(() => {
    if (props.caption === '编辑') {
      const fetchData = async id => {
        const response = await fetch(`/api/mis-user/${id}`)
        const res = await response.json()
        setData(res.content)
      }
      fetchData(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (props.caption === '新增') {
      const response = await fetch(`/api/mis-user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#管理端用户'
    } else if (props.caption === '编辑') {
      const response = await fetch(`/api/mis-user/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#管理端用户'
    }
  }

  return (
    <>



      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
          </div>

          <div className="col-9 col-lg-10">
            <h3>管理端用户 {props.caption}</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">姓名</label>
                  <div className="col-sm-10">
                    <input type="text" name="name" value={data.name || ''}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">用户名</label>
                  <div className="col-sm-10">
                    <input type="text" name="username" value={data.username || ''}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
        </div>
      </div>
    </>
  )
}