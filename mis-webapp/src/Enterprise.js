import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { Title, Navbar, TextRowField } from './Components'

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
        选择功能
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
    faren: '',
    yuangongshuliang: ''
  })
  const { id } = useParams()

  useEffect(() => {
    if (props.caption === '编辑') {
      const fetchData = async id => {
        const response = await fetch(`/api/enterprise/${id}`)
        const res = response.json()
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
    if (props.caption === '新增') {

    } else if (props.caption === '编辑') {

    }
  }

  return (
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={props.caption || '新增'} />
          </div>

          <div className="col-9 col-lg-10">
            <div className="card shadow">
              <div className="card-body">
                <TextRowField caption="名称" name="name" value={data.name} handleChange={handleChange} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => window.history.go(-1)}
                  >
                    返回
                  </button>
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