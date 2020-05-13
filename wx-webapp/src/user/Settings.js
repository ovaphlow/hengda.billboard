import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ToBack from '../components/ToBack'
import { EditJournal } from '../commonFetch'

const Setting = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    code: '',
    id: ''
  })

  const [auth, setAuth] = useState(0)

  const { category } = useParams()

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      setData({
        username: _auth.username,
        email: _auth.email,
        code: '',
        id: _auth.id,
        user_category: '个人用户'
      })
    }
  }, [])

  const handleCode = () => {
    fetch(`./api/common-user/checkEmail/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        id: auth.id
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          fetch(`./api/email/`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: data.email,
              user_category: '个人用户'
            })
          })
            .then(res => res.json())
            .then(res => {
              if (res.message) {
                window.alert(res.message)
              } else {
                window.alert('验证码已发送到您的邮箱')
              }
            })
        }
      })
  }

  const checkEmail = () => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(data.email)
  }


  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async e => {
    const response = await fetch(`/api/common-user/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    } else {
      const response2 = await fetch(`/api/common-user/${data.id}`)
      const res2 = await response2.json()
      if (res.message) {
        window.alert(res.message)
        return
      } else {
        localStorage.setItem('auth', JSON.stringify(res2.content))
        if(category === '完善信息')  {
          window.location = '#/我的/简历'
        } else {
          EditJournal({
            category2:'个人信息',
            data_id:auth.id,
            remark:'编辑个人信息'
          },re => {})
          window.alert('操作成功')
        }        
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack herf='#我的' />
        <div className="row mt-3">
          <div className="col">
            <div className="form-group row ">
              <div className="col">
                <input type="text"
                  name="username"
                  value={data.username}
                  className="input-control"
                  placeholder="用户名称"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <input type="text"
                  name="email"
                  value={data.email}
                  className="input-control"
                  placeholder="邮箱地址"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <input type="text" name="code" value={data.code}
                  className="input-control"
                  placeholder="验证码"
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <button className="btn rounded-0 btn-secondary btn-sm" 
                  disabled={!checkEmail()} onClick={handleCode} >
                  发送验证码
                </button>
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

export default Setting