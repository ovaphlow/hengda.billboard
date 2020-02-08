import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { Title, Navbar, TextRowField, BackwardButton } from './Components'
import { YUAN_GONG_SHU_LIANG } from './constant'

export default function EnterpriseRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/企业"><List /></Route>
        <Route exact path="/企业/新增"><Detail category="新增" /></Route>
        <Route path="/企业/:id"><Detail category="编辑" /></Route>
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await window.fetch(`/api/enterprise/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setData(res.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>企业列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>法人</th>
                      <th>员工数量</th>
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
  const [data, setData] = useState({
    id: 0,
    name: '',
    yingyezhizhao: '',
    faren: '',
    zhuceriqi: '',
    zhiziguimo: '',
    yuangongshuliang: ''
  })
  const { id } = useParams()

  useEffect(() => {
    if (props.category === '编辑') {
      const fetchData = async id => {
        const response = await fetch(`/api/enterprise/${id}`)
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

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
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
        body: JSON.stringify(data)
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

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={props.category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>{props.category} 企业</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <TextRowField caption="名称" name="name" value={data.name || ''} handleChange={handleChange} />

                <TextRowField caption="营业执照" name="yingyezhizhao" value={data.yingyezhizhao || ''} handleChange={handleChange} />

                <TextRowField caption="法人" name="faren" value={data.faren || ''} handleChange={handleChange} />

                <TextRowField caption="注册日期" name="zhuceriqi" value={data.zhuceriqi || ''} handleChange={handleChange} />

                <TextRowField caption="注册规模" name="zhuziguimo" value={data.zhuziguimo || ''} handleChange={handleChange} />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">员工数量</label>
                  <div className="col-sm-10">
                    <select name="yuangongshuliang" value={data.yuangongshuliang} className="form-control" onChange={handleChange}>
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
        </div>
      </div>
    </>
  )
}