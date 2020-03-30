import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useLocation, useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar, BackwardButton, InputRowField, SchoolPickerRowField } from './Components'
import { BANNER_CATEGORY } from './constant'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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
        <Route exact path="/平台内容/banner"><Banner /></Route>
        <Route exact path="/平台内容/banner/新增"><BannerDetail category="新增" /></Route>
        <Route path="/平台内容/banner/:id"><BannerDetail category="编辑" /></Route>
        <Route exact path="/平台内容/首页推荐"><Recommend /></Route>
        <Route exact path="/平台内容/首页推荐/新增"><RecommendDetail category="新增" /></Route>
        <Route path="/平台内容/首页推荐/:id"><RecommendDetail category="编辑" /></Route>
        <Route exact path="/平台内容/校园招聘"><Campus /></Route>
        <Route exact path="/平台内容/校园招聘/新增"><CampusDetail category="新增" /></Route>
        <Route path="/平台内容/校园招聘/:id"><CampusDetail category="编辑" /></Route>
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

        <a href="#平台内容/首页推荐"
          className={`text-small list-group-item list-group-item-action ${props.category === '首页推荐' ? 'active' : ''}`}
        >
          首页推荐
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#平台内容/校园招聘"
          className={`text-small list-group-item list-group-item-action ${props.category === '校园招聘' ? 'active' : ''}`}
        >
          校园招聘
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
  const [filter_category, setFilterCategory] = useState('小程序-首页')
  const [filter_status, setFilterStatus] = useState('启用')

  const handleFilter = async () => {
    setList([])
    const response = await window.fetch(`/api/content/banner/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        category: filter_category,
        status: filter_status
      })
    })
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
              <div className="card-header">
                <div className="row">
                  <div className="form-group col-4 col-lg-2 mb-0">
                    <select value={filter_category || ''} className="form-control"
                      onChange={event => setFilterCategory(event.target.value)}
                    >
                      {
                        BANNER_CATEGORY.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="form-group col-4 col-lg-2 mb-0">
                    <select value={filter_status || ''} className="form-control"
                      onChange={event => setFilterStatus(event.target.value)}
                    >
                      <option value="启用">启用</option>
                      <option value="未启用">未启用</option>
                    </select>
                  </div>

                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-outline-primary btn-sm"
                      onClick={handleFilter}
                    >
                      <i className="fa fa-fw fa-search"></i>
                      检索
                    </button>
                  </div>
                </div>
              </div>

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
                          <a href={`#平台内容/banner/${it.id}?uuid=${it.uuid}`} className="btn btn-outline-info btn-sm">
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
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [data_url, setDataUrl] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
        ;(async (id, uuid) => {
          const response = await window.fetch(`/api/content/banner/${id}?uuid=${uuid}`)
          const res = await response.json()
          if (res.message) {
            window.console.error(res.message)
            return
          }
          setStatus(res.content.status)
          setCategory(res.content.category)
          setTitle(res.content.title)
          setComment(res.content.comment)
          setDataUrl(res.content.data_url)
        })(id, _uuid)
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

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/content/banner/${id}?uuid=${uuid}`, {
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
          category: category,
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
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const uuid = new URLSearchParams(location.search).get('uuid')
      const response = await window.fetch(`/api/content/banner/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status: status,
          category: category,
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
      window.history.go(-1)
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
                <InputRowField caption="标题" value={title || ''}
                  onChange={event => setTitle(event.target.value)}
                />

                <InputRowField caption="内容" value={comment || ''}
                  onChange={event => setComment(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">类别</label>
                  <div className="col-sm-10">
                    <select value={category || ''} className="form-control input-borderless"
                      onChange={event => setCategory(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        BANNER_CATEGORY.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

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
                  <img src={data_url} className="img-fluid" alt={title} />
                </p>
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

function RecommendToolbar() {
  return (
    <div className="mb-2">
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success btn-sm shadow"
          onClick={() => window.location = '#平台内容/首页推荐/新增'}
        >
          <i className="fa fa-fw fa-plus"></i>
          新增
        </button>
      </div>

      <div className="btn-group pull-right">
        <button type="button" className="btn btn-outline-secondary btn-sm shadow"
          onClick={() => window.location = '#平台内容/首页推荐'}
        >
          <i className="fa fa-fw fa-list"></i>
          列表
        </button>
      </div>
    </div>
  )
}

function Recommend() {
  const [list, setList] = useState([])
  const [filter_title, setFilterTitle] = useState('')
  const [filter_date, setFilterDate] = useState(moment().format('YYYY-MM-DD'))

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/content/recommend/`)
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
    const response = await window.fetch(`/api/content/recommend/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        date: filter_date,
        title: filter_title
      })
    })
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="首页推荐" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>首页推荐</h3>
            <hr />

            <RecommendToolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="input-group col-4 col-lg-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text">标题</span>
                    </div>
                    <input type="text" value={filter_title || ''} aria-label="标题"
                      className="form-control"
                      onChange={event => setFilterTitle(event.target.value)}
                    />
                  </div>

                  <div className="input-group col-4 col-lg-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text">日期</span>
                    </div>
                    <input type="date" value={filter_date || ''} aria-label="日期"
                      className="form-control"
                      onChange={event => setFilterDate(event.target.value)}
                    />
                  </div>

                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleFilter}>
                    <i className="fa fa-fw fa-search"></i>
                    查询
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="list-group">
                  {
                    list.map(it => (
                      <a href={`#平台内容/首页推荐/${it.id}?uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{it.title}</h5>
                          <small>{moment(it.date).format('YYYY-MM-DD')} {it.time}</small>
                        </div>
                        <p className="mb-1"></p>
                        {/* <small></small> */}
                      </a>
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

function RecommendDetail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
        ;(async (id, uuid) => {
          const response = await window.fetch(`/api/content/recommend/${id}?uuid=${uuid}`)
          const res = await response.json()
          if (res.message) {
            window.console.error(res.message)
            return
          }
          setTitle(res.content.title)
          setContent(res.content.content)
        })(id, _uuid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/content/recommend/${id}?uuid=${uuid}`, {
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
      const response = await window.fetch(`/api/content/recommend/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: moment().format('YYYY-MM-DD'),
          time: moment().format('HH:mm:ss')
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/recommend/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: moment().format('YYYY-MM-DD'),
          time: moment().format('HH:mm:ss')
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="首页推荐" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 首页推荐</h3>
            <hr />

            <RecommendToolbar />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField caption="标题" value={title || ''}
                  onChange={event => setTitle(event.target.value)}
                />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">内容</label>
                  <div className="col-sm-10">
                    <ReactQuill
                      formats={[
                        'header', 'align', 'bold', 'italic',
                        'underline', 'blockquote', 'link', 'image']}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          [{ 'align': [] }],
                          ['bold', 'italic', 'underline', 'blockquote'],
                          ['link', 'image'],
                        ]
                      }}
                      placeholder="请填写内容"
                      value={content}
                      onChange={setContent} />
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
                      <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
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

function CampusToolbar() {
  return (
    <div className="mb-2">
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success btn-sm shadow"
          onClick={() => window.location = '#平台内容/校园招聘/新增'}
        >
          <i className="fa fa-fw fa-plus"></i>
          新增
        </button>
      </div>

      <div className="btn-group pull-right">
        <button type="button" className="btn btn-outline-secondary btn-sm shadow"
          onClick={() => window.location = '#平台内容/校园招聘'}
        >
          <i className="fa fa-fw fa-list"></i>
          列表
        </button>
      </div>
    </div>
  )
}

function Campus() {
  const [list, setList] = useState([])
  const [filter_title, setFilterTitle] = useState('')
  const [filter_date, setFilterDate] = useState(moment().format('YYYY-MM-DD'))

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/content/campus/`)
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setList(res.content)
    })()
  }, [])

  const handleFilter = async () => {
    setList([])
    const response = await window.fetch(`/api/content/campus/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: filter_title,
        date: filter_date
      })
    })
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="校园招聘" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>校园招聘</h3>
            <hr />

            <CampusToolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="input-group col-4 col-lg-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text">标题</span>
                    </div>
                    <input type="text" value={filter_title || ''} aria-label="标题"
                      className="form-control"
                      onChange={event => setFilterTitle(event.target.value)}
                    />
                  </div>

                  <div className="input-group col-4 col-lg-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text">日期</span>
                    </div>
                    <input type="date" value={filter_date || ''} aria-label="日期"
                      className="form-control"
                      onChange={event => setFilterDate(event.target.value)}
                    />
                  </div>

                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleFilter}>
                    <i className="fa fa-fw fa-search"></i>
                    查询
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="list-group">
                  {
                    list.map(it => (
                      <a href={`#平台内容/校园招聘/${it.id}?uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{it.title}</h5>
                          <small>{moment(it.date).format('YYYY-MM-DD')} {it.time}</small>
                        </div>
                        <p className="mb-1">
                          <span className="badge badge-info">{it.school}</span>
                        </p>
                        {/* <small></small> */}
                      </a>
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

function CampusDetail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [address_keys, setAddressKeys] = useState([])
  const [address_values, setAddressValues] = useState([])
  const [arr1, setArr1] = useState([])
  const [arr2, setArr2] = useState([])
  const [arr3, setArr3] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address_level1, setAddressLevel1] = useState('')
  const [address_level2, setAddressLevel2] = useState('')
  const [address_level3, setAddressLevel3] = useState('')
  const [address_level4, setAddressLevel4] = useState('')
  const [title, setTitle] = useState('')
  const [school, setSchool] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (id, uuid) => {
        const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`)
        const res = await response.json()
        if (res.message) {
          window.alert(res.message)
          return
        }
        setTitle(res.content.title)
        setContent(res.content.content)
        setDate(res.content.date)
        setTime(res.content.time)
        setAddressLevel1(res.content.address_level1)
        setAddressLevel2(res.content.address_level2)
        setAddressLevel3(res.content.address_level3)
        setAddressLevel4(res.content.address_level4)
        setSchool(res.content.school)
      })(id, _uuid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/lib/address.json`)
      const res = await response.json()
      const keys = Object.keys(res)
      setAddressKeys(keys)
      const values = Object.values(res)
      setAddressValues(values)
      let _arr = []
      keys.forEach((e, index) => {
        if (e.slice(-4) === '0000') {
          _arr.push(values[index])
        }
      })
      setArr1(_arr)
    })()
  }, [])

  useEffect(() => {
    let _arr = []
    setArr2(_arr)
    setArr3(_arr)
    for (let i = 0; i < address_values.length; i++) {
      if (address_values[i] === address_level1) {
        const code = address_keys[i]
        for (let j = 0; j < address_keys.length; j++) {
          if (address_keys[j].slice(0, 2) === code.slice(0, 2) && address_keys[j].slice(-2) === '00') {
            if (address_keys[j].slice(-4) !== '0000') _arr.push(address_values[j])
          }
        }
        return
      }
    }
    setArr2(_arr)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level1])

  useEffect(() => {
    let _arr = []
    setArr3(_arr)
    address_values.forEach((e, index) => {
      if (e === address_level2) {
        const code = address_keys[index]
        address_keys.forEach((e, i) => {
          if (e.slice(0, 4) === code.slice(0, 4) && e.slice(-2) !== '00') {
            _arr.push(address_values[i])
          }
        })
        return
      }
    })
    setArr3(_arr)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level2])

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`, {
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
      const response = await window.fetch(`/api/content/campus/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: date,
          time: time,
          address_level1: address_level1,
          address_level2: address_level2,
          address_level3: address_level3,
          address_level4: address_level4,
          school: school
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/campus/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: date,
          time: time,
          address_level1: address_level1,
          address_level2: address_level2,
          address_level3: address_level3,
          address_level4: address_level4,
          school: school
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="校园招聘" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 校园招聘</h3>
            <hr />

            <CampusToolbar />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField caption="标题" value={title || ''}
                  onChange={event => setTitle(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">日期</label>
                  <div className="col-sm-10">
                    <input type="date" value={date || ''}
                      className="form-control input-borderless"
                      onChange={event => setDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">时间</label>
                  <div className="col-sm-10">
                    <input type="time" value={time || ''}
                      className="form-control input-borderless"
                      onChange={event => setTime(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">地址</label>
                  <div className="col-sm-10">
                    <select value={address_level1 || ''}
                      className="form-control input-borderless"
                      onChange={event => setAddressLevel1(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        arr1.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right"></label>
                  <div className="col-sm-10">
                    <select value={address_level2 || ''}
                      className="form-control input-borderless"
                      onChange={event => setAddressLevel2(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        arr2.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right"></label>
                  <div className="col-sm-10">
                    <select value={address_level3 || ''}
                      className="form-control input-borderless"
                      onChange={event => setAddressLevel3(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        arr3.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <InputRowField value={address_level4 || ''}
                  onChange={event => setAddressLevel4(event.target.value)}
                />

                <SchoolPickerRowField value={school || ''}
                  onChange={event => setSchool(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">内容</label>
                  <div className="col-sm-10">
                    <ReactQuill
                      formats={[
                        'header', 'align', 'bold', 'italic',
                        'underline', 'blockquote', 'link', 'image']}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          [{ 'align': [] }],
                          ['bold', 'italic', 'underline', 'blockquote'],
                          ['link', 'image'],
                        ]
                      }}
                      placeholder="请填写内容"
                      value={content}
                      onChange={setContent} />
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-outline-danger"
                    onClick={handleRemove}
                  >
                    <i className="fa fa-fw fa-trash-o"></i>
                    删除
                  </button>

                  <button type="button" className="btn btn-primary"
                    onClick={handleSubmit}
                  >
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
