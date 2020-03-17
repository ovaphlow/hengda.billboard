import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar, BackwardButton, TextRowField } from './Components'

export default function MISUserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/平台内容/banner"><Banner /></Route>
        <Route exact path="/平台内容/banner/新增"><BannerDetail category="新增" /></Route>
        <Route path="/平台内容/banner/:id"><BannerDetail category="编辑" /></Route>
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
        <a href="#平台内容/banner"
          className={`text-small list-group-item list-group-item-action ${props.category === 'banner' ? 'active' : ''}`}
        >
          BANNER
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}

function BannerToolbar() {
  return (
    <div className="mb-2">
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success btn-sm shadow"
          onClick={() => window.location = `#平台内容/banner/新增`}
        >
          <i className="fa fa-fw fa-plus"></i>
          新增
        </button>
      </div>

      <div className="btn-group pull-right">
        <button type="button" className="btn btn-outline-secondary btn-sm shadow"
          onClick={() => window.location = `#平台内容/banner`}
        >
          <i className="fa fa-fw fa-list"></i>
          列表
        </button>
      </div>
    </div>
  )
}

function Banner() {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/content/banner/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setList(res.content)
      console.info(res.content)
    })()
  }, [])

  return (
    <>
      <Title />
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="banner" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>BANNER</h3>
            <hr />

            <BannerToolbar />

            <div className="card shadow">
              <div className="card-body">
                <div className="row">
                  {
                    list.map(it => (
                      <div className="card" style={{ width: '18rem', marginLeft: '1rem', marginBottom: '1rem' }} key={it.id}>
                        <img src={it.data_url} className="card-img-top" alt={it.title} />
                        <div className="card-body">
                          <h5 className="card-title">
                            {it.title}
                            <span className="pull-right">
                              {
                                it.status === '启用' ? (
                                  <span className="badge badge-success">{it.status}</span>
                                ) : (
                                  <span className="badge badge-danger">{it.status}</span>
                                )
                              }
                            </span>
                          </h5>
                          <p className="card-text">{it.comment}</p>
                        </div>

                        <div className="card-footer text-center">
                          <a href={`#平台内容/banner/${it.id}`} className="btn btn-outline-info btn-sm">
                            查看
                          </a>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BannerDetail(props) {
  const { id } = useParams()
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [data_url, setDataUrl] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      (async id => {
        const response = await window.fetch(`/api/content/banner/${id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setStatus(res.content.status)
        setTitle(res.content.title)
        setComment(res.content.comment)
        setDataUrl(res.content.data_url)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const convertImg2Data = event => {
    if (!!!event.target.files[0]) return
    const reader = new FileReader()
    reader.onload = e => {
      setDataUrl(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleSubmit = async () => {
    if (!!!title || !!!comment || !!!data_url) {
      window.alert('请完整填写所需信息')
      return
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/content/banner/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status: status,
          title: title,
          comment: comment,
          datime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data_url: data_url
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#平台内容/banner'
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/banner/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status: status,
          title: title,
          comment: comment,
          datime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data_url: data_url
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#平台内容/banner'
    }
  }

  return (
    <>
      <Title />
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="banner" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} BANNER</h3>
            <hr />

            <BannerToolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile"
                    onChange={convertImg2Data}
                  />
                  <label className="custom-file-label" htmlFor="customFile" data-browse="选择文件">
                    图片文件
                  </label>
                </div>
              </div>

              <div className="card-body">
                <TextRowField caption="标题" value={title || ''}
                  handleChange={event => setTitle(event.target.value)}
                />

                <TextRowField caption="内容" value={comment || ''}
                  handleChange={event => setComment(event.target.value)}
                />

                <div className="form-group row">
                  <div className="col-sm-2 text-right">状态</div>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="status"
                        checked={status === '启用' ? true : false}
                        onChange={event => event.target.checked ? setStatus('启用') : setStatus('未启用')}
                      />
                      <label htmlFor="status" className="form-check-label">
                        启用
                      </label>
                    </div>
                  </div>
                </div>

                <hr />

                <p className="text-muted text-center">
                  预览
                  <br />
                  <img src={data_url} className="img-fluid" />
                </p>
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
