import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import moment from 'moment'


import ToBack from '../components/ToBack'
import { InputField, SelectField } from './Components'

import ProvinceCity from './ProvinceCity'


const UserRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的/简历/"><Resume /></Route>
      <Route exact path="/我的/简历/个人信息"><Personal /></Route>
      <Route exact path="/我的/简历/毕业院校"><School /></Route>
      <Route exact path="/我的/简历/求职意向"><Intention /></Route>
      <Route exact path="/我的/简历/自我评价"><Evaluation /></Route>
      <Route exact path="/我的/简历/所在地"><ProvinceCity /></Route>
    </Switch>
  </Router>
)


const Resume = () => {

  const [data, setData] = useState({
    name: '',
    gender: '',
    birthday: '',
    address1: '',
    address2: '',
    address3: '',
    address4:'',
    phone: '',
    email: '',
    school: '',
    education: '',
    major: '',
    date_begin: '',
    date_end: '',
    qiwangzhiwei: '',
    qiwanghangye: '',
    yixiangchengshi: '',
    ziwopingjia: ''
  })

  const [ auth, setAuth ] = useState(0)

  useState(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#/登录'
    } 
    setAuth(_auth)
    const resume = JSON.parse(sessionStorage.getItem('resume'))
    if (resume !== null) {
      setData(resume)
    } else {
      fetch(`./api/resume/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          if (res.content) {
            res.content.birthday = 
            `${res.content.birthday.slice(8,12)}/${res.content.birthday.slice(0,2)}/${res.content.birthday.slice(4,6)}`
            sessionStorage.setItem('resume', JSON.stringify(res.content))
            setData(res.content)
          } else {
            if (res.content !== undefined) {
              fetch(`./api/resume/init`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ common_user_id: _auth.id })
              })
                .then(res1 => res1.json())
                .then(res1 => {
                  sessionStorage.setItem('resume', JSON.stringify({
                    ...data,
                    phone: _auth.phone,
                    email: _auth.email,
                    name: _auth.name
                  }))
                  setData(p => ({
                    ...p,
                    phone: _auth.phone,
                    email: _auth.email,
                    name: _auth.name
                  }))
                })
            } else {
              alert(res.message)
            }
          }
        })
    }
  }, [])

  const age = birthday => {
    if (birthday && birthday!=='') {
      
      return `${parseInt(moment().format('YYYY')) - parseInt(birthday.slice(0,4))}岁`
    }  else {
      return '0岁'
    }
  }


  const handleSave = () => {
    fetch(`./api/resume/${auth.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          alert('已保存修改')
        }
      })
  }

  const handleBack = () => {
    sessionStorage.removeItem('resume')
  }

  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <ToBack handleBack={handleBack}/>
        <div className="row mt-2">
          <div className="col">
            <img style={{ height: 60 }} src="lib/img/user.jpg" alt="" />
          </div>
          <div className="col-9 " style={{ paddingLeft: 0 }}>
            <div className="pull-left">
              <span style={{ fontSize: 18 }}>{data.name}</span>
              <span>/{data.gender === '男' ? '先生' : '女士'}</span>
              <br />
              {age(data.birthday)} | {data.address1}-{data.address2}-{data.address3}
            </div>
            <div className="pull-right">
              <a href="#/我的/简历/个人信息">
                <i className="fa fa-pencil-square-o fa-fw"></i>
                编辑
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <i className="fa fa-phone fa-fw"></i>
            &nbsp;&nbsp;&nbsp;{data.phone}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col">
            <i className="fa fa-envelope fa-fw"></i>
            &nbsp;&nbsp;&nbsp;{data.email}
          </div>
        </div>

        <hr/>

        <div className="row">
          <div className="col">
            <h5>毕业院校</h5>
          </div>
          <div className="col">
            <a className="pull-right" href="#/我的/简历/毕业院校">
              <i className="fa fa-pencil-square-o fa-fw"></i>
              编辑
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <i className="fa fa-book fa-fw"></i>
            <strong style={{ fontSize: 15 }}>{data.school}</strong>
            <br />
            &nbsp;
            <span className="text-muted" style={{ fontSize: 12 }}>
              {data.date_begin} - {data.date_end}
            </span>
            <br />
            {data.education} | {data.major}
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col">
            <h5>求职意向</h5>
          </div>
          <div className="col">
            <a className="pull-right" href="#/我的/简历/求职意向">
              <i className="fa fa-pencil-square-o fa-fw"></i>
              编辑
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div>
              <i className="fa fa-map-marker fa-fw"></i>
              &nbsp;&nbsp;&nbsp; {data.yixiangchengshi}
            </div>

            <div className="mt-1">
              <i className="fa fa-briefcase fa-fw"></i>
              &nbsp;&nbsp;&nbsp; {data.qiwanghangye}/{data.qiwangzhiwei}
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col">
            <h5>自我评价</h5>
          </div>
          <div className="col">
            <a className="pull-right" href="#/我的/简历/自我评价">
              <i className="fa fa-pencil-square-o fa-fw"></i>
              编辑
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col">
            {data.ziwopingjia}
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            保存
        </button>
        </div>
      </ul>
    </>
  )
}

const Personal = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem('resume')))
  }, [])

  const toProvinceCity = () => {
    sessionStorage.setItem('resume',JSON.stringify(data))
    window.location = '#/我的/简历/所在地'
  }

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    sessionStorage.setItem('resume',JSON.stringify(data))
    window.history.go(-1)
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>个人信息</h4>
        </div>

        <div className="row mt-3">
          <InputField
            name="name"
            category="姓名"
            value={data.name}
            placeholder="请填写姓名,用于投递简历"
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <SelectField
            name="gender"
            category="性别"
            value={data.gender}
            placeholder="请选择性别"
            handleChange={handleChange}>
            <option>男</option>
            <option>女</option>
          </SelectField>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <span className="text-muted" style={{ fontSize: 13 }}>
                出生日期
              </span>
              <input type="date"
                name="birthday"
                value={data.birthday}
                className="input-control"
                onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="row" onClick={toProvinceCity}>
          <InputField
            name="address1"
            category="现居住地"
            value={`${data.address1}-${data.address2}-${data.address3}`}
            onClick={toProvinceCity}
            placeholder="请提供现居住地,用于投递简历"
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <InputField
            name="phone"
            category="手机号码"
            value={data.phone}
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <InputField
            name="email"
            category="电子邮箱"
            value={data.email}
            placeholder="请提供电子邮箱,用于企业联系"
            handleChange={handleChange}
          />
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            确定
        </button>
        </div>
      </ul>
    </>
  )
}

const School = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem('resume')))
  }, [])


  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    sessionStorage.setItem('resume',JSON.stringify(data))
    window.history.go(-1)
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>毕业院校</h4>
        </div>
        <div className="row">
          <InputField
            name="school"
            category="毕业院校"
            value={data.school}
            placeholder="请提供现毕业院校,用于投递简历"
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <InputField
            name="education"
            category="学历"
            value={data.education}
            placeholder="请提供现学历,用于投递简历"
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <InputField
            name="major"
            category="专业名称"
            value={data.major}
            placeholder="如: 计算机科学与技术"
            handleChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <span className="text-muted" style={{ fontSize: 13 }}>
                在校时间
              </span>
              <div className="row">
                <div className="col" style={{ paddingRight: 5 }}>
                  <input type="date"
                    name="date_begin"
                    value={data.date_begin}
                    className="input-control"
                    placeholder="入学时间"
                    onChange={handleChange} />
                </div>
                <span style={{ fontSize: 16 }}>-</span>
                <div className="col" style={{ paddingLeft: 5 }} >
                  <input type="date"
                    name="date_end"
                    value={data.date_end}
                    className="input-control"
                    placeholder="毕业时间"
                    onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            确定
        </button>
        </div>
      </ul>
    </>
  )
}

const Intention = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem('resume')))
  }, [])


  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    sessionStorage.setItem('resume',JSON.stringify(data))
    window.history.go(-1)
  }
  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>求职意向</h4>
        </div>

        <div className="row mt-3">
          <InputField
            name="qiwangzhiwei"
            category="期望职位"
            value={data.qiwangzhiwei}
            handleChange={handleChange}
          />
        </div>
        <div className="row ">
          <InputField
            name="qiwanghangye"
            category="期望行业"
            value={data.qiwanghangye}
            handleChange={handleChange}
          />
        </div>
        <div className="row ">
          <InputField
            name="yixiangchengshi"
            category="工作地点"
            value={data.yixiangchengshi}
            handleChange={handleChange}
          />
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            确定
        </button>
        </div>
      </ul>
    </>
  )
}

const Evaluation = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem('resume')))
  }, [])


  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    sessionStorage.setItem('resume',JSON.stringify(data))
    window.history.go(-1)
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />

        <div className="mt-2">
          <h4>自我评价</h4>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <textarea 
              className="form-control" 
              name="ziwopingjia" 
              value={data.ziwopingjia}
              onChange={handleChange} 
              rows="6"></textarea>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            确定
        </button>
        </div>
      </ul>
    </>
  )
}

export default UserRouter