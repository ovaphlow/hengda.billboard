import React, { useState, useEffect } from 'react'
import { TextField, SelectField, IndustryField } from '../components/InputField'
import RichEditor from '../components/RichEditor'
import { View } from './Components'
import { _EditJournal } from '../commonFetch'

const Save = () => {

  const [data, setData] = useState({
    name: '',
    category: '',
    industry: '',
    position: '',
    status: '',
    education: '',
    salary1: '',
    salary2: '',
    qty: '',
    address1: '',
    address2: '',
    address3: '',
    description: '',
    requirement: '',
  })

  const [city, setCity] = useState([])

  const [area, setArea] = useState([])

  const [level, setLevel] = useState([])

  const [address, setAddress] = useState([])

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth !== null) {
      setData(p => ({
        ...p,
        enterprise_id: auth.enterprise_id,
        enterprise_uuid: auth.enterprise_uuid,
        user_id: auth.id,
      }))
    }
    fetch(`/lib/address.json`)
      .then(res => res.json())
      .then(res => {
        setAddress(res)
        setLevel(
          Object.getOwnPropertyNames(res)
            .filter(item => item.slice(2, 7) === '0000')
            .map(code => ({
              code: code,
              name: res[code]
            }))
        )
      })
  }, [])

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
          _EditJournal({
            category2:'岗位',
            data_id:res.content.id,
            data_uuid: res.content.uuid,
            remark:`新增岗位<${data.name}>`
          }, res => {})
          window.alert('操作成功')
          window.location = '#岗位/列表'
        }
      })
  }

  const handleProvince = e => {
    const value = e.target.value
    console.info(value)
    if (value !== '') {
      setData({
        ...data,
        address1: value,
        address2: '',
        address3: ''
      })
      const a1 = level.find(item => item.name === value)
      if (a1) {
        setCity(Object.getOwnPropertyNames(address)
          .filter(it => a1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== a1.code)
          .map(code => ({
            code: code,
            name: address[code]
          })))
      }
      setArea([])
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
        address2: value,
        address3: ''
      })
      const a2 = city.find(item => item.name === value)
      if (a2) {
        setArea(
          Object.getOwnPropertyNames(address)
            .filter(it => a2.code.slice(0, 4) === it.slice(0, 4) && it !== a2.code)
            .map(code => ({
              code: code,
              name: address[code]
            }))
        )
      }
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
              <IndustryField
                industry={data.industry}
                position={data.position}
                handleChange={handleChange} />
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
                  <option>高中及以上</option>
                  <option>大专及以上</option>
                  <option>本科及以上</option>
                  <option>硕士及以上</option>
                  <option>硕士</option>
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
              <div className="col-2">
                <SelectField
                  category="省"
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
              <div className="col-2">
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
              <div className="col-2">
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
              <div className="col-2">
                <label>薪资要求</label>
                <div className="row pl-3 pr-3">
                  <input type="text"
                    name="salary1"
                    value={data.salary1}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0`} />
                  -
                  <input type="text"
                    name="salary2"
                    value={data.salary2}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0`} />
                </div>
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