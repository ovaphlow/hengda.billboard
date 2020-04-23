import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'

import { Title, Navbar, InputRowField, BackwardButton } from './Components'
import { SideNav } from './Enterprise'

export default function RecruitmentRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth')
    if (!!!auth) {
      window.location = '#登录'
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/岗位"><List /></Route>
        <Route path="/岗位/:recruitment_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

export function DataList(props) {
  const [data_list, setDataList] = useState([])

  useEffect(() => {
    ;(async (enterprise_id, enterprise_uuid) => {
      const response = await window.fetch(`/api/recruitment/?enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataList(res.content)
    })(props.enterprise_id, props.enterprise_uuid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="list-group">
      {
        data_list.map(it => (
          <a href={`#岗位/${it.id}?uuid=${it.uuid}`}
            className="list-group-item list-group-item-action"
            key={it.id}
          >
            {it.name}
            <span className="pull-right text-muted">{it.qty}</span>
          </a>
        ))
      }
    </div>
  )
}

// 2020-04-16
// 不使用此页面
function List() {
  const location = useLocation()
  const [enterprise_id, setEnterpriseID] = useState(0)
  const [enterprise_uuid, setEnterpriseUUID] = useState('')
  const [data_list, setDataList] = useState([])

  useEffect(() => {
    const _ent_id = new URLSearchParams(location.search).get('enterprise_id')
    setEnterpriseID(_ent_id)
    const _ent_uuid = new URLSearchParams(location.search).get('enterprise_uuid')
    setEnterpriseUUID(_ent_uuid)
    ;(async (id, uuid) => {
      const response = await window.fetch(`/api/recruitment?enterprise_id=${id}&uuid=${uuid}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataList(res.content)
    })(_ent_id, _ent_uuid)
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
                style={{ display: 'none' }}
                onClick={() => window.location = `#企业/${enterprise_id}/新增职位`}
              >
                <i className="fa fa-fw fa-plus"></i>
                新增
              </button>
            </div>

            <div className="card shadow mt-3">
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>职位</th>
                      <th>人数</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data_list.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#岗位/${it.id}?uuid=${it.uuid}&enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`}>
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

function Detail(props) {
  const { recruitment_id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
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

  useEffect(() => {
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (recruitment_id, recruitment_uuid) => {
        const response = await window.fetch(`/api/recruitment/${recruitment_id}?uuid=${recruitment_uuid}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
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
      })(recruitment_id, _uuid)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (props.category === '编辑') {
      const response = await window.fetch(`/api/recruitment/${recruitment_id}?recruitment_uuid=${uuid}`, {
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
      window.history.go(-1)
    }
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/recruitment/${recruitment_id}?recruitment_uuid=${uuid}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
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
                <InputRowField caption="职位" value={name || ''} onChange={e => setName(e.target.value)} />

                <InputRowField caption="人数" value={qty || ''} onChange={e => setQty(e.target.value)} />

                <InputRowField caption="地址" value={address1 || ''} onChange={e => setAddress1(e.target.value)} />

                <InputRowField caption="" value={address2 || ''} onChange={e => setAddress2(e.target.value)} />

                <InputRowField caption="" value={address3 || ''} onChange={e => setAddress3(e.target.value)} />

                <InputRowField caption="发布日期" value={date || ''} onChange={e => setDate(e.target.date)} />

                <InputRowField caption="薪资范围" value={salary1 || ''} onChange={e => setSalary1(e.target.salary1)} />

                <InputRowField caption="" value={salary2 || ''} onChange={e => setSalary2(e.target.salary2)} />

                <InputRowField caption="学历" value={education || ''} onChange={e => setEducation(e.target.education)} />

                <InputRowField caption="类别" value={category || ''} onChange={e => setCategory(e.target.category)} />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">工作职责</label>
                  <div className="col-sm-10">
                    <textarea value={description || ''} className="form-control input-borderless" onChange={e => setDescription(e.target.value)}></textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">岗位要求</label>
                  <div className="col-sm-10">
                    <textarea value={requirement || ''} className="form-control input-borderless" onChange={e => setRequirement(e.target.value)}></textarea>
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
                      <button type="button" className="btn btn-outline-danger"
                        onClick={handleRemove}
                      >
                        <i className="fa fa-fw fa-trash-o"></i>
                        删除
                      </button>
                    )
                  }

                  <button type="button" className="btn btn-primary"
                    style={{ display: 'none' }}
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
