import React, { useEffect, useState } from 'react'
import { View } from './Components'
import { TextField, SelectField } from '../components/InputField'

const Favorite = () => {

  const [list, setList] = useState([])

  const [auth, setAuth] = useState({})

  const [param, setParam] = useState({
    name: '',
    qiwanghangye: '',
    qiwangzhiwei: '',
    yixiangchengshi: '',
    education: ''
  })


  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      fetch(`./api/favorite/search/resume/`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          user_id: _auth.id
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
    fetch(`./api/favorite/search/resume/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...param,
        user_id: auth.id
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
    <View category="收藏">
      <div className="row px-5 pt-2 bg-white shadow" >
        <div className="col">
          <TextField
            category="姓名"
            name="name"
            value={param.name}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <TextField
            category="期望行业"
            name="qiwanghangye"
            value={param.qiwanghangye}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <TextField
            category="期望职位"
            name="qiwangzhiwei"
            value={param.qiwangzhiwei}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <TextField
            category="期望地点"
            name="yixiangchengshi"
            value={param.status}
            handleChange={handleChange} />
        </div>
        <div className="col">
          <SelectField
            category="学历"
            name="education"
            value={param.education}
            handleChange={handleChange}>
            <option></option>
            <option>高中</option>
            <option>大专</option>
            <option>本科</option>
            <option>研究生</option>
            <option>博士</option>
          </SelectField>
        </div>
        <div className="col-1">
          <br />
          <button onClick={search} className="btn btn-primary rounded-0">
            查询
        </button>
        </div>
      </div>

      <div className="row mt-3 bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">我的收藏</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">姓名</th>
                  <th scope="col">期望行业</th>
                  <th scope="col">期望职位</th>
                  <th scope="col">期望地点</th>
                  <th scope="col">毕业院校</th>
                  <th scope="col">学历</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qiwanghangye}</td>
                    <td>{item.qiwangzhiwei}</td>
                    <td>{item.yixiangchengshi}</td>
                    <td>{item.school}</td>
                    <td>{item.education}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <a className="btn btn-primary" href={`#简历/详情/${item.resume_id}?u_id=${item.uuid}`}>
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

export default Favorite