import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'
import moment from 'moment'

import ToBack from '../components/ToBack'
import { _EditJournal } from '../commonFetch'
import { InputField, SelectField } from './Components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const UserRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/我的/简历/"><Resume /></Route>
      <Route exact path="/我的/简历/个人信息/:id"><Personal /></Route>
      <Route exact path="/我的/简历/毕业院校/:id"><School /></Route>
      <Route exact path="/我的/简历/求职意向/:id"><Intention /></Route>
      <Route exact path="/我的/简历/自我评价/:id"><Evaluation /></Route>
      <Route exact path="/我的/简历/所在地/:id"><ProvinceCity /></Route>
      <Route exact path="/我的/简历/行业/:id"><Industry /></Route>
    </Switch>
  </Router>
)


const Resume = () => {

  const [data, setData] = useState(0)

  const [auth, setAuth] = useState(0)

  const [file, setFile] = useState([])


  useState(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#/登录'
    } else {

      if (!_auth.phone || _auth.phone === '') {
        window.location = '#/我的/电话'
      }

      setAuth(_auth)
      fetch(`./api/resume/user/${_auth.id}?u_id=${_auth.uuid}`)
        .then(res => res.json())
        .then(res => {
          if (res.content) {
            setData(res.content)
          } else {
            if (res.content !== undefined) {
              fetch(`./api/resume/init?u_id=${_auth.uuid}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ common_user_id: _auth.id })
              })
                .then(res1 => res1.json())
                .then(res1 => {
                  setData(p => ({
                    phone: '',
                    email: '',
                    name: '',
                    gender: '',
                    birthday: '',
                    address1: '',
                    address2: '',
                    address3: '',
                    address4: '',
                    school: '',
                    education: '',
                    major: '',
                    date_begin: '',
                    date_end: '',
                    qiwangzhiwei: '',
                    qiwanghangye: '',
                    yixiangchengshi: '',
                    ziwopingjia: '',
                    status: '保密'
                  }))
                })
            } else {
              alert(res.message)
            }
          }
        })

      fetch(`./api/common-user-file/${_auth.id}/简历/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setFile(res.content)
          }
        })
    }

  }, [])

  const age = birthday => {
    if (birthday && birthday !== '') {
      return `${parseInt(moment().format('YYYY')) - parseInt(birthday.slice(0, 4))}岁`
    } else {
      return '0岁'
    }
  }

  const changeStatus = status => {
    fetch(`./api/resume/status/${data.common_user_id}/?u_id=${data.uuid}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: status })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          setData(p => ({
            ...p,
            status: status
          }))
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '修改简历状态'
          }, res => { })
        }
      })
  }

  const handleFileChange = e => {
    if (e.target.files.length === 0) {
      return
    }

    const list = e.target.files

    for (let i = 0; i < list.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(list[i])
      reader.onloadend = () => {
        const f = reader.result
        fetch(`./api/common-user-file/`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            file: f,
            common_user_id: auth.id,
            category: '简历',
          })
        })
          .then(res => res.json())
          .then(res => {
            if (res.message) {
              window.alert(res.message)
            } else {
              _EditJournal({
                category2: '简历',
                data_id: data.id,
                data_uuid: data.uuid,
                remark: '编辑我的证书'
              }, res => { })
              setFile(p => p.concat({
                id: res.content,
                file: f,
                common_user_id: auth.id,
                category: '简历',
              }))
            }
          })
      }
    }
  }

  const handleUpload = () => {
    document.getElementById('file').click()
  }

  const handleFileDelete = id => {
    fetch(`./api/common-user-file/${id}?user_id=${auth.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '编辑我的证书'
          }, res => { })
          setFile(p => p.filter(it => it.id !== id))
        }
      })
  }


  if (data) {
    return (
      <>
        <div className="container-fluid background-login1" style={{ fontSize: 14 }}>
          <ToBack herf='#我的' category="我的简历" />
          {/* <div className="row mt-2">
            <div className="col" >
              <img style={{ height: 60 }} src="lib/img/user.jpg" alt="" />
            </div>
            <div className="col-9 " style={{ paddingLeft: 0 }}>
              <div className="pull-left">
                <span style={{ fontSize: 18 }}>{data.name}</span>
                <span>/{!data.gender || (data.gender === '男' ? '先生' : '女士')}</span>
                <br />
                {age(data.birthday)} | {data.address1}-{data.address2}-{data.address3}
              </div>
              <div className="pull-right">
                <a href={`#/我的/简历/个人信息/${auth.id}?u_id=${auth.uuid}`}>
                  <i className="fa fa-pencil-square-o fa-fw"></i>
                  编辑
                </a>
              </div>
            </div>
          </div> */}
          <div className="card mt-3 border-0 mb-5">
            <div className="mt-3 resume-personal pt-2 text-center">
              <h6>简历预览</h6>
            </div>
            <div className="card-body ">
              <div className="row">
                <div className="col">
                  <span style={{ fontSize: '1.25rem' }}>{data.name}</span>
                  <span>/{!data.gender || (data.gender === '男' ? '先生' : '女士')}</span>
                </div>
                <div className="col">
                  <a className="pull-right" href={`#/我的/简历/个人信息/${auth.id}?u_id=${auth.uuid}`}>
                    <i className="fa fa-pencil-square-o fa-fw"></i>
                  编辑
                </a>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {age(data.birthday)} | {data.address1}-{data.address2}-{data.address3}
                </div>
              </div>
              <div className="row mt-2">
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

              <hr />

              <div className="row">
                <div className="col">
                  <h5>毕业院校</h5>
                </div>
                <div className="col">
                  <a className="pull-right" href={`#/我的/简历/毕业院校/${auth.id}?u_id=${auth.uuid}`}>
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
              <span className="text-muted" style={{ fontSize: 14 }}>
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
                  <a className="pull-right" href={`#/我的/简历/求职意向/${auth.id}?u_id=${auth.uuid}`}>
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
                &nbsp;&nbsp;&nbsp; {data.qiwanghangye}-{data.qiwangzhiwei}
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col">
                  <h5>自我评价</h5>
                </div>
                <div className="col">
                  <a className="pull-right" href={`#/我的/简历/自我评价/${auth.id}?u_id=${auth.uuid}`}>
                    <i className="fa fa-pencil-square-o fa-fw"></i>
                编辑
              </a>
                </div>
              </div>

              <div className="row">
                <div className="col" dangerouslySetInnerHTML={{ __html: data.ziwopingjia }} />
              </div>
              <hr />
              <div className="row mb-2">
                <div className="col flex-start">
                  <h5>我的证书</h5>
                </div>
                <div className="col">
                  <button className="btn btn-primary btn-sm pull-right" onClick={handleUpload}>
                    <i className="fa fa-plus"></i>
                添加
              </button>
                  <input type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file"
                    accept="image/png, image/jpeg" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  {file && file.map((item, inx) =>
                    <div className="card mb-2 shadow" key={inx}>
                      <img className="card-img-top" alt="" src={item.file} />
                      <div className="card-body p-1">
                        <button
                          onClick={() => handleFileDelete(item.id)}
                          className="btn btn-danger w-100">
                          删除
                    </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top" >
          <div className="row text-center nav-row">
            {
              data.status === '保密' ? (
                <button className="btn btn-primary nav-btn" onClick={() => changeStatus('公开')}>
                  公开简历
                </button>
              ) : (
                  <button className="btn btn-danger nav-btn" onClick={() => changeStatus('保密')}>
                    停止公开
                  </button>
                )
            }
          </div>
        </ul>
      </>)
  } else {
    return <></>
  }
}

const Personal = () => {

  const [data, setData] = useState({})

  const { id } = useParams()

  const { search } = useLocation()

  useEffect(() => {
    fetch(`./api/resume/user/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
        } else {
          alert(res.message)
        }
      })
  }, [id, search])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${data.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '修改简历个人信息'
          }, re => { })
          window.history.go(-1)
        }
      })
  }

  const toProvinceCity = () => {
    window.location = `#/我的/简历/所在地/${id}${search}`
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack category="我的简历" />
        <div className="card mt-4 mb-5 bg-white rounded border-0">
          <div className="mt-3 resume-personal pt-2 text-center">
            <h6>个人信息</h6>
          </div>
          <div className="row mt-3 p-1" >
            <InputField
              name="name"
              category="姓名"
              value={data.name}
              placeholder="请填写姓名,用于投递简历"
              handleChange={handleChange}
            />
          </div>
          <div className="row p-1">
            <SelectField
              name="gender"
              category="性别"
              value={data.gender}
              placeholder="请选择性别"
              handleChange={handleChange}>
              <option></option>
              <option>男</option>
              <option>女</option>
            </SelectField>
          </div>
          <div className="form-group row input-label">
            <label className="col-4 col-form-label text-right text-muted">
              出生日期
              </label>
            <div className="col-8">
              <input type="date"
                name="birthday"
                value={data.birthday || ''}
                className="form-control-plaintext input-f"
                onChange={handleChange} />
            </div>
          </div>
          <div className="row p-1" onClick={toProvinceCity}>
            <InputField
              name="address1"
              category="现居住地"
              value={`${data.address1}-${data.address2}-${data.address3}`}
              placeholder="请提供现居住地,用于投递简历"
              handleChange={handleChange}
            />
          </div>
          <div className="row p-1">
            <InputField
              name="phone"
              category="手机号码"
              value={data.phone}
              handleChange={handleChange}
            />
          </div>
          <div className="row p-1">
            <InputField
              name="email"
              category="电子邮箱"
              value={data.email}
              placeholder="请提供电子邮箱,用于企业联系"
              handleChange={handleChange}
            />
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

const School = () => {

  const [data, setData] = useState({})

  const { id } = useParams()

  const { search } = useLocation()

  useEffect(() => {
    fetch(`./api/resume/user/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
        } else {
          alert(res.message)
        }
      })
  }, [id, search])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${data.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '修改简历毕业院校'
          }, re => { })
          window.history.go(-1)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack category="我的简历" />
        <div className="card mt-4 mb-5 bg-white rounded border-0 rounded">
          <div className="mt-3 resume-personal pt-2 text-center">
            <h6>毕业院校</h6>
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
            <SelectField
              name="education"
              category="学历"
              value={data.education}
              placeholder="请提供现学历,用于投递简历"
              handleChange={handleChange}>
              <option></option>
              <option>高中及以下</option>
              <option>大专</option>
              <option>本科</option>
              <option>硕士</option>
              <option>博士</option>
            </SelectField>
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
            <div className="form-group row input-label">
              <label className="col-4 col-form-label text-right text-muted">
                入学时间
            </label>
              <div className="col">
                <input type="date"
                  name="date_begin"
                  value={data.date_begin}
                  className="form-control-plaintext input-f"
                  placeholder="入学时间"
                  onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group row input-label">
              <label className="col-4 col-form-label text-right text-muted">
                毕业时间
            </label>
              <div className="col">
                <input type="date"
                  name="date_end"
                  value={data.date_end}
                  className="form-control-plaintext input-f"
                  placeholder="毕业时间"
                  onChange={handleChange} />
              </div>
            </div>
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

const Intention = () => {

  const [data, setData] = useState({})

  const { id } = useParams()

  const { search } = useLocation()

  useEffect(() => {
    fetch(`./api/resume/user/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
        } else {
          alert(res.message)
        }
      })
  }, [id, search])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${data.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '修改简历求职意向'
          }, re => { })
          window.history.go(-1)
        }
      })
  }


  const toIndustry = () => {
    window.location = `#/我的/简历/行业/${id}${search}`
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack category="我的简历" />
        <div className="card mt-4 mb-5 bg-white rounded border-0 rounded">
          <div className="mt-3 resume-personal pt-2 text-center">
            <h6>求职意向</h6>
          </div>

          <div className="row mt-3" onClick={toIndustry}>
            <InputField
              name="qiwangzhiwei"
              category="期望职位"
              value={`${data.qiwanghangye}-${data.qiwangzhiwei}`}
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

const Evaluation = () => {

  const [data, setData] = useState({})

  const { id } = useParams()

  const { search } = useLocation()

  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`./api/resume/user/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
          setContent(res.content.ziwopingjia)
        } else {
          alert(res.message)
        }
      })
  }, [id, search])

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${data.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        ziwopingjia: content
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: data.id,
            data_uuid: data.uuid,
            remark: '修改简历自我评价'
          }, re => { })
          window.history.go(-1)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack category="我的简历" />
        <div className="card mt-4 mb-5 bg-white rounded border-0 rounded">
          <div className="mt-3 resume-personal pt-2 text-center">
            <h6>自我评价</h6>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <ReactQuill
                  formats={[
                    'header', 'align', 'bold', 'italic',
                    'underline', 'blockquote']}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      [{ 'align': [] }],
                      ['bold', 'italic', 'underline', 'blockquote'],
                    ]
                  }}
                  placeholder="请填写内容"
                  value={content}
                  onChange={setContent} />
              </div>
            </div>
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

const ProvinceCity = () => {

  const [level1, setLevel1] = useState('')

  const [level2, setLevel2] = useState('')

  const [level2List, setLevel2List] = useState([])

  const [level3, setLevel3] = useState('')

  const [level3List, setLevel3List] = useState([])

  const [resume, setResume] = useState({})

  const { id } = useParams()

  const { search } = useLocation()

  const [level, setLevel] = useState([])

  const [address, setAddress] = useState([])

  useEffect(() => {
    fetch(`./api/resume/user/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setResume(res.content)
          fetch(`/lib/address.json`)
            .then(res => res.json())
            .then(res1 => {
              setAddress(res1)
              const _level = Object.getOwnPropertyNames(res1)
                .filter(item => item.slice(2, 7) === '0000')
                .map(code => ({
                  code: code,
                  name: res1[code]
                }))
              setLevel(_level)

              if (res.content.address1) {
                const l1 = _level.find(item => item.name === res.content.address1)
                if (l1) {
                  const _level2 = Object.getOwnPropertyNames(res1)
                    .filter(it => l1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== l1.code)
                    .map(code => ({
                      code: code,
                      name: res1[code]
                    }))
                  setLevel2List(_level2)
                  const l2 = _level2.find(
                    item => item.name === res.content.address2)
                  if (l2) {
                    setLevel3List(
                      Object.getOwnPropertyNames(res1)
                        .filter(it => l2.code.slice(0, 4) === it.slice(0, 4) && it !== l2.code)
                        .map(code => ({
                          code: code,
                          name: res1[code]
                        }))
                    )
                  }
                }
              }
              setLevel1(res.content.address1)
              setLevel2(res.content.address2)
              setLevel3(res.content.address3)
            })
        } else {
          alert(res.message)
        }
      })
  }, [id, search])


  const level1Click = item => {
    setLevel1(item.name)
    setLevel2('')
    setLevel3('')
    setLevel3List([])
    setLevel2List(Object.getOwnPropertyNames(address)
      .filter(it => item.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== item.code)
      .map(code => ({
        code: code,
        name: address[code]
      })))
  }

  const level2Click = item => {
    setLevel2(item.name)
    setLevel3('')
    setLevel3List(Object.getOwnPropertyNames(address)
      .filter(it => item.code.slice(0, 4) === it.slice(0, 4) && it !== item.code)
      .map(code => ({
        code: code,
        name: address[code]
      })))
  }

  const level3Click = item => {
    setLevel3(item.name)
  }

  const _class = (it1, it2) => {
    return it1 === it2.name ? 'text-primary font-weight-bold' : 'text-muted'
  }

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${resume.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...resume,
        address1: level1,
        address2: level2,
        address3: level3
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: resume.id,
            data_uuid: resume.uuid,
            remark: '修改简历个人信息'
          }, re => { })
          window.history.go(-1)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>请选择现居住地</h4>
        </div>
        <hr />
        <div className="row mt-3" style={{ fontSize: 14 }}>
          <div className="col pre-scrollable">
            {level.map(item =>
              <p className={_class(level1, item)}
                onClick={() => { level1Click(item) }} key={item.code}>{item.name}</p>
            )}
          </div>
          <div className="col pre-scrollable">
            {level2List.map(item =>
              <p className={_class(level2, item)}
                onClick={() => { level2Click(item) }} key={item.code}>{item.name}</p>
            )}
          </div>
          <div className="col pre-scrollable">
            {level3List.map(item =>
              <p className={_class(level3, item)}
                onClick={() => { level3Click(item) }} key={item.code}>{item.name}</p>
            )}
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


const Industry = () => {

  const [qiwangzhiwei, setQiwangzhiwei] = useState(0)

  const [qiwanghangye, setQiwanghangye] = useState(0)

  const [industry, setIndustry] = useState([])

  const [level1, setLevel1] = useState([])

  const [level2, setLevel2] = useState([])

  const { id } = useParams()

  const { search } = useLocation()

  const [resume, setResume] = useState({})

  useEffect(() => {
    const industry = JSON.parse(localStorage.getItem('industry'))
    const fun = () => {
      fetch(`./api/common-data/hangye/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            localStorage.setItem('industry', JSON.stringify({
              date: parseInt(moment().add(7, 'days').format('YYYYMMDD')),
              data: res.content
            }))
            setIndustry(res.content)
          }
        })
    }
    if (industry !== null) {
      if (industry.date - moment().format('YYYYMMDD') < 1) {
        fun()
      } else {
        setIndustry(industry.data)
      }
    } else {
      fun()
    }
  }, [id, search])


  useEffect(() => {
    if (industry && industry.length > 0) {
      setLevel1(industry.filter(item => item.master_id === 0))
      fetch(`./api/resume/user/${id}${search}`)
        .then(res => res.json())
        .then(res => {
          if (res.content) {
            setResume(res.content)

            if (res.content.qiwanghangye) {
              const l1 = industry.find(item => item.name === res.content.qiwanghangye)
              if (l1) {
                setLevel2(
                  industry.filter(
                    item => item.master_id === l1.id))
              }
            }
            setQiwangzhiwei(p => res.content.qiwangzhiwei)
            setQiwanghangye(p => res.content.qiwanghangye)
          } else {
            alert(res.message)
          }
        })
    }
  }, [id, search, industry])

  const _class = (it1, it2) => {
    return it1 === it2.name ? 'text-primary font-weight-bold' : 'text-muted'
  }

  const level1Click = item => {
    setQiwanghangye(item.name)
    setQiwangzhiwei(0)
    setLevel2(industry.filter(it => it.master_id === item.id))
  }

  const level2Click = item => {
    setQiwangzhiwei(item.name)
  }

  const handleSave = () => {
    fetch(`./api/resume/${id}?u_id=${resume.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...resume,
        qiwangzhiwei: qiwangzhiwei,
        qiwanghangye: qiwanghangye
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          _EditJournal({
            category2: '简历',
            data_id: resume.id,
            data_uuid: resume.uuid,
            remark: '修改简历求职意向'
          }, re => { })
          window.history.go(-1)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>请选择行业</h4>
        </div>
        <hr />
        <div className="row mt-3" style={{ fontSize: 14 }}>
          <div className="col pre-scrollable">
            {level1.map(item =>
              <p className={_class(qiwanghangye, item)}
                onClick={() => level1Click(item)} key={item.code}>{item.name}</p>
            )}
          </div>
          <div className="col pre-scrollable">
            {level2.map(item =>
              <p className={_class(qiwangzhiwei, item)}
                onClick={() => level2Click(item)} key={item.code}>{item.name}</p>
            )}
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