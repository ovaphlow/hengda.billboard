import React, { useState, useEffect } from 'react'

import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'

import {
  Title, Navbar, BackwardButton, InputRowField,
  SchoolPickerRowField, IndustryPickerRowField, EducationPickerRowField,
  AddressLevel3PickerRowField
} from './Components'
import { SideNav } from './CommonUser'

export default function ResumeRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/简历/新增"><ResumeDetail category="新增" /></Route>
        <Route path="/简历/:id"><ResumeDetail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function ResumeDetail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [uuid, setUUID] = useState('')
  const [master_id, setMasterID] = useState(0)
  const [address_keys, setAddressKeys] = useState([])
  const [address_values, setAddressValues] = useState([])
  const [arr1, setArr1] = useState([])
  const [arr2, setArr2] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [school, setSchool] = useState('')
  const [major, setMajor] = useState('')
  const [education, setEducation] = useState('')
  const [date_begin, setDateBegin] = useState('')
  const [date_end, setDateEnd] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [ziwopingjia, setZiwopingjia] = useState('')
  const [qiwangzhiwei, setQiwangzhiwei] = useState('')
  const [qiwanghangye, setQiwanghangye] = useState('')
  const [yixiangchengshi, setYixiangchengshi] = useState('')

  useEffect(() => {
    const _master_id = new URLSearchParams(location.search).get('master_id')
    setMasterID(_master_id)
    if (props.category === '编辑') {
      const _uuid = new URLSearchParams(location.search).get('uuid')
      setUUID(_uuid)
      ;(async (master_id, id, uuid) => {
        const response = await window.fetch(`/api/common-user/${master_id}/resume/${id}?uuid=${uuid}`)
        const res = await response.json()
        if (res.message) {
          window.console.error(res.message)
          return
        }
        setName(res.content.name)
        setPhone(res.content.phone)
        setEmail(res.content.email)
        setGender(res.content.gender)
        setBirthday(res.content.birthday)
        setSchool(res.content.school)
        setMajor(res.content.major)
        setEducation(res.content.education)
        setDateBegin(res.content.date_begin)
        setDateEnd(res.content.date_end)
        setAddress1(res.content.address1)
        setAddress2(res.content.address2)
        setZiwopingjia(res.content.ziwopingjia)
        setQiwangzhiwei(res.content.qiwangzhiwei)
        setQiwanghangye(res.content.qiwanghangye)
        setYixiangchengshi(res.content.yixiangchengshi)
      })(_master_id, id, _uuid)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/lib/address.json`)
      const res = await response.json()
      const keys = Object.keys(res)
      setAddressKeys(keys)
      const values = Object.values(res)
      setAddressValues(values)
      let _arr = []
      keys.forEach((e, index) => {
        if (e.slice(-4) === '0000') {
          _arr.push(values[index])
        }
      })
      setArr1(_arr)
    })()
  }, [])

  useEffect(() => {
    let _arr = []
    setArr2(_arr)
    for (let i = 0; i < address_values.length; i++) {
      if (address_values[i] === address1) {
        const code = address_keys[i]
        for (let j = 0; j < address_keys.length; j++) {
          if (address_keys[j].slice(0, 2) === code.slice(0, 2) && address_keys[j].slice(-2) === '00') {
            if (address_keys[j].slice(-4) !== '0000') _arr.push(address_values[j])
          }
        }
        return
      }
    }
    setArr2(_arr)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address1])

  const handleRemove = async () => {
    if (!!!window.confirm('确定删除当前数据？')) return
    const response = await window.fetch(`/api/common-user/${master_id}/resume/${id}?uuid=${uuid}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common-user/${master_id}/resume/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          gender: gender,
          birthday: birthday,
          school: school,
          major: major,
          education: education,
          date_begin: date_begin,
          date_end: date_end,
          address1: address1,
          address2: address2,
          ziwopingjia: ziwopingjia,
          qiwangzhiwei: qiwangzhiwei,
          qiwanghangye: qiwanghangye,
          yixiangchengshi: yixiangchengshi
        })
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/common-user/${master_id}/resume/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          gender: gender,
          birthday: birthday,
          school: school,
          major: major,
          education: education,
          date_begin: date_begin,
          date_end: date_end,
          address1: address1,
          address2: address2,
          ziwopingjia: ziwopingjia,
          qiwangzhiwei: qiwangzhiwei,
          qiwanghangye: qiwanghangye,
          yixiangchengshi: yixiangchengshi
        })
      })
      const res = response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
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
                <InputRowField caption="姓名" value={name || ''} autocomplete="name"
                  onChange={event => setName(event.target.value)}
                />

                <InputRowField caption="电话" type="tel" value={phone || ''} autocomplete="tel"
                  onChange={event => setPhone(event.target.value)}
                />

                <InputRowField caption="EMAIL" type="email" value={email || ''} autocomplete="email"
                  onChange={event => setEmail(event.target.value)}
                />

                <InputRowField caption="性别" value={gender || ''} autocomplete="sex"
                  onChange={event => setGender(event.target.value)}
                />

                <InputRowField caption="出生日期" type="date" value={birthday || ''} autocomplete="bday"
                  onChange={event => setBirthday(event.target.value)}
                />

                <SchoolPickerRowField caption="毕业院校" value={school || ''}
                  onChange={event => setSchool(event.target.value)}
                />

                <InputRowField caption="专业" value={major || ''}
                  onChange={event => setMajor(event.target.value)}
                />

                <EducationPickerRowField caption="学历" value={education || ''}
                  onChange={event => setEducation(event.target.value)}
                />

                <InputRowField caption="开始日期" type="date" value={date_begin || ''}
                  onChange={event => setDateBegin(event.target.value)}
                />

                <InputRowField caption="结束日期" type="date" value={date_end || ''}
                  onChange={event => setDateEnd(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">地址</label>
                  <div className="col-sm-10">
                    <select value={address1 || ''}
                      className="form-control input-borderless"
                      onChange={event => setAddress1(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        arr1.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right"></label>
                  <div className="col-sm-10">
                    <select value={address2 || ''}
                      className="form-control input-borderless"
                      onChange={event => setAddress2(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {
                        arr2.map((it, index) => (
                          <option value={it} key={index}>{it}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <hr />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">自我评价</label>
                  <div className="col-sm-10">
                    <textarea value={ziwopingjia || ''} className="form-control input-borderless"
                      onChange={event => setZiwopingjia(event.target.value)}
                    >
                    </textarea>
                  </div>
                </div>

                <InputRowField caption="期望职位" value={qiwangzhiwei || ''}
                  onChange={event => setQiwangzhiwei(event.target.value)}
                />

                <IndustryPickerRowField caption="期望行业" value={qiwanghangye || ''}
                  onChange={event => setQiwanghangye(event.target.value)}
                />

                <AddressLevel3PickerRowField caption="意向城市" value={yixiangchengshi || ''}
                  onChange={event => setYixiangchengshi(event.target.value)}
                />
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

                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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
