import React, { useState, useEffect } from 'react'
import { TextField, SelectField } from '../components/InputField'
import RichEditor from '../components/RichEditor'
import level from '../components/level.json'
import { View } from './Components'

const Save = () => {

  const [data, setData] = useState({
    name: '',
    category: '',
    industry: '',
    status: '',
    education: '',
    salary1: '',
    salary2: '',
    address1: '',
    address2: '',
    address3: '',
    description: '',
    requirement: '',
  })

  const [city, setCity] = useState([])

  const [area, setArea] = useState([])




  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth !== null) {
      setData(p=> ({
        ...p,
        enterprise_id: auth.enterprise_id,
        user_id:auth.id
      }))
    } 
  },[])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`./api/recruitment/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          window.alert('操作成功')
          window.location = '#岗位/列表'
        }
      })
  }

  const handleProvince = e => {
    const value = e.target.value
    if (value !== '') {
      switch (value) {
        case '北京市':
        case '上海市':
        case '天津市':
        case '重庆市':
          setData({
            ...data,
            address1: value,
            address2: value
          })
          const item = level.find(item => item.name === value)
          setCity([item])
          setArea(item.children.filter(it => it.province === item.code.slice(0, 2)))
          break
        default:
          setData({
            ...data,
            address1: value
          })
          setCity(level.find(item => item.name === value).children)
          setArea([])
      }
    } else {
      setData({
        ...data,
        address1: value,
        address2: value,
        address3: value
      })
      setCity([])
      setArea([])
    }
  }

  const handleCity = e => {
    const value = e.target.value
    if (value !== '') {
      setData({
        ...data,
        address2: value
      })
      const item = city.find(it => it.name === value)
      setArea(item.children.filter(it => it.province === item.code.slice(0, 2)))
    } else {
      setData({
        ...data,
        address2: value,
        address3: value
      })
      setArea([])
    }
  }


  return (
    <View category="我的职位">
      <div className="row bg-white shadow" >
        <div className="col card rounded-0">
          <div className="card-body">
            <h3>新增岗位</h3>
            <hr />
            <div className="row">
              <div className="col">
                <TextField
                  category="职位名称"
                  name="name"
                  value={data.name}
                  handleChange={handleChange} />
              </div>
              <div className="col">
                <TextField
                  category="所属行业"
                  name="industry"
                  value={data.industry}
                  handleChange={handleChange} />
              </div>
              <div className="col">
                <SelectField
                  category="职位类型"
                  name="category"
                  value={data.category}
                  handleChange={handleChange}>
                  <option></option>
                  <option>全职</option>
                  <option>兼职</option>
                  <option>实习</option>
                </SelectField>
              </div>
              <div className="col">
                <SelectField
                  category="学历要求"
                  name="education"
                  value={data.education}
                  handleChange={handleChange}>
                  <option></option>
                  <option>不限</option>
                  <option>高中以上</option>
                  <option>专科以上</option>
                  <option>本科以上</option>
                </SelectField>
              </div>
              <div className="col">
                <TextField
                  category="招聘人数"
                  name="qty"
                  value={data.qty}
                  handleChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <SelectField
                  category="省/直辖市"
                  name="address1"
                  value={data.address1}
                  handleChange={handleProvince}>
                  <option></option>
                  {
                    level.map((item, inx) =>
                      <option key={inx}>{item.name}</option>)
                  }
                </SelectField>
              </div>
              <div className="col">
                <SelectField
                  category="市"
                  name="address2"
                  value={data.address2}
                  handleChange={handleCity}>
                  <option></option>
                  {
                    city.map((item, inx) =>
                      <option key={inx}>{item.name}</option>)
                  }
                </SelectField>
              </div>
              <div className="col">
                <SelectField
                  category="区/县"
                  name="address3"
                  value={data.address3}
                  handleChange={handleChange}>
                  <option></option>
                  {
                    area.map((item, inx) =>
                      <option key={inx}>{item.name}</option>)
                  }
                </SelectField>
              </div>
              <div className="col">
                <TextField
                  category="薪资要求1"
                  name="salary1"
                  value={data.salary1}
                  handleChange={handleChange} />
              </div>
              <div className="col">
                <TextField
                  category="薪资要求2"
                  name="salary2"
                  value={data.salary2}
                  handleChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>职位要求</label>
                  <RichEditor
                    value={data.requirement}
                    name="requirement"
                    handleChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>工作内容</label>
                  <RichEditor
                    value={data.description}
                    name="description"
                    handleChange={handleChange} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <a className="btn btn-primary" href="#岗位/列表">
                  返回
                </a>
              </div>
              <div className="col">
                <button className="pull-right btn btn-success" onClick={handleSave}>
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  )
}

export default Save