import React, { useState, useEffect } from 'react'

import ToBack from '../components/ToBack'

const Setting = () => {

  const [data, setData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      setData({
        name: _auth.name,
        email: _auth.email,
        id: _auth.id
      })
    }
  },[])



  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async e => {
    const response = await fetch(`/api/common-user/`, {
      method: 'POST',
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
        window.location = '#/我的'
      }
    }
  }

  return (
    <>
    <div className="container-fluid">
      <ToBack />
      <div className="row mt-3">
        <div className="col">
          <div className="form-group ">
            <input type="text"
              name="name"
              value={data.name}
              className="input-control"
              placeholder="用户名称"
              onChange={handleChange}
            />
          </div>
          <div className="form-group ">
            <input type="text"
              name="email"
              value={data.email}
              className="input-control"
              placeholder="邮箱地址"
              onChange={handleChange}
            />
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