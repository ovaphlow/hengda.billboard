import React, { useEffect, useState } from 'react'
import { View } from './Components'

const List = () => {

  const [list, setList] = useState([])

  useEffect(() => {

    const auth = JSON.parse(sessionStorage.getItem('auth'))

    fetch(`./api/recruitment/enterprise/${auth.enterprise_id}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setList(res.content)
        }
      })
  }, [])


  return (
    <View>
      <div className="row px-5 pt-2 bg-white shadow" >
        <div className="col">
          <div class="form-group row">
            <label>职位名称</label>
            <input type="text" className="form-control form-control-sm rounded-0" />
          </div>
        </div>
        <div className="col">
          <div class="form-group">
            <label>职位类型</label>
            <input type="text" className="form-control form-control-sm rounded-0" />
          </div>
        </div>
        <div className="col">
          <div class="form-group ">
            <label>发布日期</label>
            <input type="text" className="form-control form-control-sm rounded-0" />
          </div>
        </div>
        <div className="col">
          <div class="form-group ">
            <label>状态</label>
            <input type="text" className="form-control form-control-sm rounded-0" />
          </div>
        </div>
      </div>

      <div className="row mt-3 bg-white shadow">
        <div className="col">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">编号</th>
                <th scope="col">职位名称</th>
                <th scope="col">职位类型</th>
                <th scope="col">招聘人数</th>
                <th scope="col">工作地点</th>
                <th scope="col">状态</th>
                <th scope="col">发布日期</th>
              </tr>
            </thead>
            <tbody>
              {list && list.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.qty}</td>
                  <td>{item.address1}-{item.address2}-{item.address3}</td>
                  <td>在招</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </View>
  )
}

export default List