import React, { useEffect, useState } from 'react'
import { View } from './Components'
import { TextField, SelectField, DateField } from '../components/InputField'


const List = () => {

  const [list, setList] = useState([])

  const [auth, setAuth] = useState({})

  const [param, setParam] = useState({
    name: '',
    recruitment_name: '',
    date: '',
    status: '',
    education: ''
  })

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      fetch(`./api/delivery/search?u_id=${_auth.uuid}`,{
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          enterprise_id:_auth.enterprise_id
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setList(res.content)
          }
        })
    }

  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setParam(prev => ({ ...prev, [name]: value }))
  }

  const search = () => {
    fetch(`./api/delivery/search?u_id=${auth.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...param,
        enterprise_id:auth.enterprise_id
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setList(res.content)
        }
      })
  }


  return (
    <View category="列表">
      <div className="row px-5 pt-2 bg-white shadow" >
        <div className="col">
          <TextField
            category="求职者姓名"
            name="name"
            value={param.name}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <TextField
            category="投递职位名称"
            name="recruitment_name"
            value={param.recruitment}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <DateField
            category="投递时间"
            name="date"
            value={param.date}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <SelectField
            category="状态"
            name="status"
            value={param.status}
            handleChange={handleChange}>
            <option></option>
            <option>已查看</option>
            <option>未查看</option>
          </SelectField>
        </div>
        <div className="col">
          <SelectField
            category="求职者学历"
            name="education"
            value={param.education}
            handleChange={handleChange}>
            <option></option>
            <option>高中及以下</option>
            <option>大专</option>
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
          </SelectField>
        </div>
        <div className="col">
          <br />
          <button onClick={search} className="btn btn-primary rounded-0">
            查询
          </button>
        </div>
      </div>

      <div className="row mt-3 bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">已收到简历</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">职位名称</th>
                  {/* <th scope="col">所属行业</th> */}
                  <th scope="col">求职者姓名</th>
                  <th scope="col">毕业院校</th>
                  <th scope="col">学历</th>
                  <th scope="col">投递时间</th>
                  <th scope="col">状态</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map(item => (
                  <tr key={item.id}>
                    <td>{item.recruitment_name}</td>
                    {/* <td>{item.industry}</td> */}
                    <td>{item.name}</td>
                    <td>{item.school}</td>
                    <td>{item.education}</td>
                    <td>{item.datime}</td>
                    <td>{item.status}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <a className="btn btn-primary" href={`#简历/列表/详情/${item.id}?u_id=${item.uuid}`}>
                          查看
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </View>
  )
}

export default List