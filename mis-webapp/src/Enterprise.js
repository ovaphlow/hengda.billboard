import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { Title, Navbar, TextRowField, BackwardButton, RefreshButton } from './Components'
import { YUAN_GONG_SHU_LIANG } from './constant'

export default function EnterpriseRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/企业"><List /></Route>
        <Route exact path="/企业/新增"><Detail category="新增" /></Route>
        <Route exact path="/企业/:id"><Detail category="编辑" /></Route>
        <Route path="/企业/:id/新增用户"><UserDetail category="新增" /></Route>
        <Route path="/企业/:id/编辑用户/:user_id"><UserDetail category="编辑" /></Route>
        <Route exact path="/企业/:id/职位"><RecruitmentList /></Route>
        <Route path="/企业/:enterprise_id/新增职位"><RecruitmentDetail category="新增" /></Route>
        <Route path="/企业/:enterprise_id/职位/:recruitment_id"><RecruitmentDetail category="编辑" /></Route>
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
        <a href="#企业"
          className={`text-small list-group-item list-group-item-action ${props.category === '列表' ? 'active' : ''}`}
        >
          企业列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#企业/新增"
          className={`text-small list-group-item list-group-item-action ${props.category === '新增' ? 'active' : ''}`}
        >
          新增企业
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
  const [filter_name, setFilterName] = useState('')

  const handleFilter = async () => {
    const response = await window.fetch(`/api/enterprise/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter_name: filter_name })
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
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>企业列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto mt-2">
                    <label className="sr-only">企业名称</label>
                    <input type="text" value={filter_name} placeholder="企业名称"
                      className="form-control mb-2"
                      onChange={event => setFilterName(event.target.value)}
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
                      <th>名称</th>
                      <th>法人</th>
                      <th>员工数量</th>
                      <th>操作</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#企业/${it.id}`}>
                              <i className="fa fa-fw fa-edit"></i>
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.faren}</td>
                          <td>{it.yuangongshuliang}</td>
                          <td>
                            <a href={`#企业/${it.id}/职位`}>
                              <i className="fa fa-fw fa-list"></i>
                              查看发布的职位
                            </a>
                          </td>
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
  const [name, setName] = useState('')
  const [yingyezhizhao, setYingyezhizhao] = useState('')
  const [faren, setFaren] = useState('')
  const [zhuceriqi, setZhuceriqi] = useState('')
  const [zhuziguimo, setZhuziguimo] = useState('')
  const [yuangongshuliang, setYuangongshuliang] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [address3, setAddress3] = useState('')
  const [address4, setAddress4] = useState('')
  const [user_list, setUserList] = useState([])

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await fetch(`/api/enterprise/${id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        // setData(res.content)
        setName(res.content.name)
        setYingyezhizhao(res.content.yingyezhizhao)
        setFaren(res.content.faren)
        setZhuceriqi(res.content.zhuceriqi)
        setZhuziguimo(res.content.zhuziguimo)
        setYuangongshuliang(res.content.yuangongshuliang)
        setAddress1(res.content.address1)
        setAddress2(res.content.address2)
        setAddress3(res.content.address3)
        setAddress4(res.content.address4)
      }
      fetchData(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await fetch(`/api/enterprise/${id}/user/`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setUserList(res.content)
      }
      fetchData(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          yingyezhizhao: yingyezhizhao,
          faren: faren,
          zhuceriqi: zhuceriqi,
          zhuziguimo: zhuziguimo,
          yuangongshuliang: yuangongshuliang,
          address1: address1,
          address2: address2,
          address3: address3,
          address4: address4
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#企业'
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          yingyezhizhao: yingyezhizhao,
          faren: faren,
          zhuceriqi: zhuceriqi,
          zhuziguimo: zhuziguimo,
          yuangongshuliang: yuangongshuliang,
          address1: address1,
          address2: address2,
          address3: address3,
          address4: address4
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#企业'
    }
  }

  return (
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={props.category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 企业</h3>
            <hr />

            <div className="row">
              <div className="col-8">
                <div className="card shadow">
                  <div className="card-header">
                    企业信息
                  </div>

                  <div className="card-body">
                    <TextRowField caption="名称" value={name || ''} handleChange={event => setName(event.target.value)} />

                    <TextRowField caption="营业执照" value={yingyezhizhao || ''}
                      handleChange={event => setYingyezhizhao(event.target.value)}
                    />

                    <TextRowField caption="法人" value={faren || ''}
                      handleChange={event => setFaren(event.target.value)}
                    />

                    <TextRowField caption="注册日期" value={zhuceriqi || ''}
                      handleChange={event => setZhuceriqi(event.target.value)}
                    />

                    <TextRowField caption="注资规模" value={zhuziguimo || ''}
                      handleChange={event => setZhuziguimo(event.target.value)}
                    />

                    <TextRowField caption="地址" value={address1 || ''}
                      handleChange={event => setAddress1(event.target.value)}
                    />

                    <TextRowField caption="" value={address2 || ''}
                      handleChange={event => setAddress2(event.target.value)}
                    />

                    <TextRowField caption="" value={address3 || ''}
                      handleChange={event => setAddress3(event.target.value)}
                    />

                    <TextRowField caption="" value={address4 || ''}
                      handleChange={event => setAddress4(event.target.value)}
                    />

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label text-right">员工数量</label>
                      <div className="col-sm-10">
                        <select value={yuangongshuliang} className="form-control"
                          onChange={event => setYuangongshuliang(event.target.value)}
                        >
                          <option value="未选择">未选择</option>
                          {
                            YUAN_GONG_SHU_LIANG.map((it, index) => (
                              <option value={it} key={index}>{it}</option>
                            ))
                          }
                        </select>
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

              <div className="col-4">
                {
                  props.category === '编辑' && (
                    <div className="card shadow">
                      <div className="card-header">
                        企业用户
                      </div>

                      <div className="card-body">
                        <div className="list-group">
                          {
                            user_list.map(it => (
                              <a href={`#企业/${id}/编辑用户/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                                {it.name}
                                <span className="pull-right text-muted">{it.username}</span>
                              </a>
                            ))
                          }
                        </div>
                      </div>

                      <div className="card-footer text-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-success"
                            onClick={() => window.location = `#企业/${id}/新增用户`}
                          >
                            <i className="fa fa-fw fa-plus"></i>
                            添加用户
                          </button>
                        </div>
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

function UserDetail(props) {
  const { id, user_id } = useParams()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async (id, user_id) => {
        const response = await fetch(`/api/enterprise/${id}/user/${user_id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setName(res.content.name)
        setUsername(res.content.username)
      }
      fetchData(id, user_id)
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
      window.location = `#企业/${id}`
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}/user/${user_id}`, {
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
      window.location = `#企业/${id}`
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
                <TextRowField caption="姓名" value={name || ''} handleChange={event => setName(event.target.value)} />

                <TextRowField caption="用户名" value={username || ''} handleChange={e => setUsername(e.target.value)} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    <i className="fa fa-fw fa-edit"></i>
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

function RecruitmentList() {
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async id => {
      const response = await window.fetch(`/api/enterprise/${id}/recruitment/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setData(res.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <h3>企业用户 发布的职位</h3>
            <hr />

            <div className="btn-group">
              <BackwardButton />
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-outline-success"
                onClick={() => window.location = `#企业/${id}/新增职位`}
              >
                <i className="fa fa-fw fa-plus"></i>
                新增
              </button>
            </div>

            <div className="card shadow mt-3">
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-right">序号</th>
                      <th>职位</th>
                      <th>人数</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#企业/${id}/职位/${it.id}`}>
                              <i className="fa fa-fw fa-edit"></i>
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.qty}</td>
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

export function RecruitmentDetail(props) {
  const { enterprise_id, recruitment_id } = useParams()
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [address3, setAddress3] = useState('')
  const [date, setDate] = useState('')
  const [salary1, setSalary1] = useState('')
  const [salary2, setSalary2] = useState('')
  const [education, setEducation] = useState('')
  const [category, setCategory] = useState('')
  const [data, setData] = useState({
    name: '',
    qty: '',
    description: '',
    requirement: '',
    address1: '',
    address2: '',
    address3: '',
    data: '',
    salary1: 0,
    salary2: 0,
    education: '',
    category: ''
  })

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async (enterprise_id, recruitment_id) => {
        const response = await window.fetch(`/api/enterprise/${enterprise_id}/recruitment/${recruitment_id}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        // setData(res.content)
        setName(res.content.name)
        setQty(res.content.qty)
        setDescription(res.content.description)
        setRequirement(res.content.requirement)
        setAddress1(res.content.address1)
        setAddress2(res.content.address2)
        setAddress3(res.content.address3)
        setDate(res.content.date)
        setSalary1(res.content.salary1)
        setSalary2(res.content.salary2)
        setEducation(res.content.education)
        setCategory(res.content.category)
      }
      fetchData(enterprise_id, recruitment_id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/${enterprise_id}/recruitment/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          qty: qty,
          description: description,
          requirement: requirement,
          address1: address1,
          address2: address2,
          address3: address3,
          date: date,
          salary1: salary1,
          salary2: salary2,
          education: education,
          category: category
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = `#企业/${enterprise_id}/职位`
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${enterprise_id}/recruitment/${recruitment_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          qty: qty,
          description: description,
          requirement: requirement,
          address1: address1,
          address2: address2,
          address3: address3,
          date: date,
          salary1: salary1,
          salary2: salary2,
          education: education,
          category: category
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = `#企业/${enterprise_id}/职位`
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
            <h3>企业用户 {props.category} 职位</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <TextRowField caption="职位" value={name || ''} handleChange={e => setName(e.target.value)} />

                <TextRowField caption="人数" value={qty || ''} handleChange={e => setQty(e.target.value)} />

                <TextRowField caption="地址" value={address1 || ''} handleChange={e => setAddress1(e.target.value)} />

                <TextRowField caption="" value={address2 || ''} handleChange={e => setAddress2(e.target.value)} />

                <TextRowField caption="" value={address3 || ''} handleChange={e => setAddress3(e.target.value)} />

                <TextRowField caption="发布日期" value={date || ''} handleChange={e => setDate(e.target.date)} />

                <TextRowField caption="薪资范围" value={salary1 || ''} handleChange={e => setSalary1(e.target.salary1)} />

                <TextRowField caption="" value={salary2 || ''} handleChange={e => setSalary2(e.target.salary2)} />

                <TextRowField caption="学历" value={education || ''} handleChange={e => setEducation(e.target.education)} />

                <TextRowField caption="类别" value={category || ''} handleChange={e => setCategory(e.target.category)} />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">工作职责</label>
                  <div className="col-sm-10">
                    <textarea value={description || ''} className="form-control" onChange={e => setDescription(e.target.value)}></textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">岗位要求</label>
                  <div className="col-sm-10">
                    <textarea value={requirement || ''} className="form-control" onChange={e => setRequirement(e.target.value)}></textarea>
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
