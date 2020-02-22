import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'
import moment from 'moment'

import { Title, Navbar, BackwardButton, TextRowField, RefreshButton } from './Components'

export default function CommonUserRouter() {
  return (
    <Router>
      <Switch>\
        <Route exact path="/普通用户"><List /></Route>
        <Route exact path="/普通用户/新增"><Detail category="新增" /></Route>
        <Route exact path="/普通用户/:id"><Detail category="编辑" /></Route>
        <Route path="/普通用户/:common_user_id/新增简历"><ResumeDetail category="新增" /></Route>
        <Route path="/普通用户/:common_user_id/简历/:resume_id"><ResumeDetail category="编辑" /></Route>
        <Route path="/普通用户/:id/登录记录"><Journal category="登录" /></Route>
        <Route path="/普通用户/:id/浏览记录"><Journal category="浏览" /></Route>
        <Route path="/普通用户/:id/编辑记录"><Journal category="编辑" /></Route>
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
                      <th>投递</th>
                      <th>收藏</th>
                      <th className="text-right">查看</th>
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
                        <td>{it.qty_delivery}</td>
                        <td>{it.qty_favorite}</td>
                        <td className="text-right">
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a href={`#普通用户/${it.id}/登录记录`}>登录记录</a>
                            </li>
                            <li className="list-inline-item">
                              <a href={`#普通用户/${it.id}/浏览记录`}>浏览记录</a>
                            </li>
                            <li className="list-inline-item">
                              <a href={`#普通用户/${it.id}/编辑记录`}>编辑记录</a>
                            </li>
                          </ul>
                        </td>
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
  const { id } = useParams()
  const [data, setData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  })
  const [dataResumeList, setDataResumeList] = useState([])

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await window.fetch(`/api/common-user/${id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setData(res.content)
      }
      fetchData(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await window.fetch(`/api/common-user/${id}/resume/`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setDataResumeList(res.content)
      }
      fetchData(id)
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
      const response = await window.fetch(`/api/common-user/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#普通用户'
    }
  }

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
            <h3>{props.category} 普通用户</h3>
            <hr />

            <div className="row">
              <div className="col-8">
                <div className="card shadow">
                  <div className="card-header">用户信息</div>

                  <div className="card-body">
                    <TextRowField caption="姓名" name="name" value={data.name || ''} handleChange={handleChange} />

                    <TextRowField caption="用户名" name="username" value={data.username || ''} handleChange={handleChange} />

                    {
                      props.category === '新增' && (
                        <TextRowField caption="密码" name="password" value={data.password || ''} handleChange={handleChange} />
                      )
                    }

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
                        <div className="list-group">
                          {
                            dataResumeList.map(it => (
                              <a href={`#普通用户/${id}/简历/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                                {it.qiwangzhiwei}
                                <span className="pull-right text-muted">{it.yixiangchengshi}</span>
                              </a>
                            ))
                          }
                        </div>
                      </div>

                      <div className="card-footer text-center">
                        <button type="button" className="btn btn-sm btn-outline-success"
                          onClick={() => window.location = `#普通用户/${id}/新增简历`}
                        >
                          <i className="fa fa-fw fa-plus"></i>
                          添加简历
                        </button>
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

function ResumeDetail(props) {
  const { common_user_id, resume_id } = useParams()
  const [ data, setData ] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    birthday: '',
    school: '',
    major: '',
    education: '',
    date_begin: '',
    date_end: '',
    address1: '',
    address2: '',
    address3: '',
    ziwopingjia: '',
    qiwangzhiwei: '',
    qiwanghangye: '',
    yixiangchengshi: ''
  })

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async (common_user_id, resume_id) => {
        const response = await window.fetch(`/api/common-user/${common_user_id}/resume/${resume_id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setData(res.content)
      }
      fetchData(common_user_id, resume_id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common-user/${common_user_id}/resume/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = `#普通用户/${common_user_id}`
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/common-user/${common_user_id}/resume/${resume_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = `#普通用户/${common_user_id}`
    }
  }

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
            <h3>普通用户 {props.category} 简历</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <TextRowField caption="姓名" name="name" value={data.name || ''} handleChange={handleChange} />

                <TextRowField caption="电话" name="phone" value={data.phone || ''} handleChange={handleChange} />

                <TextRowField caption="EMAIL" name="email" value={data.email || ''} handleChange={handleChange} />

                <TextRowField caption="性别" name="gender" value={data.gender || ''} handleChange={handleChange} />

                <TextRowField caption="出生日期" name="birthday" value={data.birthday || ''} handleChange={handleChange} />

                <TextRowField caption="毕业院校" name="school" value={data.school || ''} handleChange={handleChange} />

                <TextRowField caption="专业" name="major" value={data.major || ''} handleChange={handleChange} />

                <TextRowField caption="学历" name="education" value={data.education || ''} handleChange={handleChange} />

                <TextRowField caption="开始日期" name="date_begin" value={data.date_begin || ''} handleChange={handleChange} />

                <TextRowField caption="结束日期" name="date_end" value={data.date_end || ''} handleChange={handleChange} />

                <TextRowField caption="地址" name="address1" value={data.address1 || ''} handleChange={handleChange} />

                <TextRowField caption="" name="address2" value={data.address2 || ''} handleChange={handleChange} />

                <TextRowField caption="" name="address3" value={data.address3 || ''} handleChange={handleChange} />

                <hr />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">自我评价</label>
                  <div className="col-sm-10">
                    <textarea name="ziwopingjia" value={data.ziwopingjia || ''} className="form-control" onChange={handleChange}></textarea>
                  </div>
                </div>

                <TextRowField caption="期望职位" name="qiwangzhiwei" value={data.qiwangzhiwei || ''} handleChange={handleChange} />

                <TextRowField caption="期望行业" name="qiwanghangye" value={data.qiwanghangye || ''} handleChange={handleChange} />

                <TextRowField caption="意向城市" name="yixiangchengshi" value={data.yixiangchengshi || ''} handleChange={handleChange} />
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

function Journal(props) {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [filterParams, setFilterParams] = useState({
    date_begin: moment().format('YYYY-MM-DD'),
    date_end: moment().format('YYYY-MM-DD')
  })

  useEffect(() => {
    if (props.category === '登录') {
      const fetchData = async id => {
        const response = await window.fetch(`/api/common-user/${id}/journal/sign-in/`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setData(res.content)
      }
      fetchData(id)
    } else if (props.category === '浏览') {
      const fetchData = async id => {
        const response = await window.fetch(`/api/common-user/${id}/journal/browse/`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setData(res.content)
      }
      fetchData(id)
    } else if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await window.fetch(`/api/common-user/${id}/journal/edit/`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setData(res.content)
      }
      fetchData(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterParamsChange = e => {
    const { value, name } = e.target
    setFilterParams(prev => ({ ...prev, [name]: value}))
  }

  const handleFilter = async () => {
    if (props.category === '登录') {
      const response = await window.fetch(`/api/common-user/${id}/journal/sign-in/`, {
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
    } else if (props.category === '浏览') {
      const response = await window.fetch(`/api/common-user/${id}/journal/browse/`, {
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
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/common-user/${id}/journal/edit/`, {
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
  }

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
            <h3>普通用户 {props.category}记录</h3>
            <hr />

            <div className="btn-group mb-3">
              <BackwardButton />
            </div>

            <div className="card shadow">
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto mt-2">
                    <label className="sr-only">时间</label>
                    <input type="date" name="date_begin" value={filterParams.date_begin} placeholder="起始时间"
                      className="form-control mb-2"
                      onChange={handleFilterParamsChange}
                    />
                  </div>

                  <div className="col-auto mt-2">
                    <label className="sr-only"></label>
                    <input type="date" name="date_end" value={filterParams.date_end} placeholder="终止时间"
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
                      {
                        props.category === '登录' && (
                          <>
                            <th>时间</th>
                            <th>IP地址</th>
                            <th>大概位置</th>
                            <th>用户类别</th>
                          </>
                        )
                      }
                      {
                        props.category === '浏览' && (
                          <>
                            <th>时间</th>
                            <th>数据类别</th>
                            <th className="text-right">操作</th>
                          </>
                        )
                      }
                      {
                        props.category === '编辑' && (
                          <>
                            <th>时间</th>
                            <th>用户类别</th>
                            <th>操作内容</th>
                          </>
                        )
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      props.category === '登录' && data.map(it => (
                        <tr key={it.id}>
                          <td className="text-right">{it.id}</td>
                          <td>{it.datime}</td>
                          <td>{it.ip}</td>
                          <td>{it.address}</td>
                          <td>{it.category}</td>
                        </tr>
                      ))
                    }
                    {
                      props.category === '浏览' && data.map(it => (
                        <tr key={it.id}>
                          <td className="text-right">{it.id}</td>
                          <td>{it.datime}</td>
                          <td>{it.category}</td>
                          <td className="text-right">
                            <button type="button" data-id={it.data_id}
                              className="btn btn-sm btn-outline-info"
                              onClick={() => window.location = `#岗位/${it.data-id}`}
                            >
                              查看
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                    {
                      props.category === '编辑' && data.map(it => (
                        <tr key={it.id}>
                          <td className="text-right">{it.id}</td>
                          <td>{it.datime}</td>
                          <td>{it.category1}</td>
                          <td>{it.category2}</td>
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