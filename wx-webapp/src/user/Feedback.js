import React, { useEffect, useState } from 'react'
import moment from 'moment'

import ToBack from '../components/ToBack'

const Feedback = () => {

  const [content, setCntent] = useState('')

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location='#/登录'
    } else {
      setAuth(_auth)
    }
  },[])


  const handleChange = e => {
    setCntent(e.target.value)
  }

  const handleSave = () => {
    if (content === '') {
      window.alert('请填写反馈内容')
      return
    }
    fetch(`./api/feedback/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        content: content,
        common_user_id:auth.id,
        datime: moment().format('YYYY-MM-DD HH:mm')
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          alert('感谢你的使用,反馈已提交到后台')
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />

        <div className="mt-2">
          <h4>意见反馈</h4>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <textarea
                className="form-control"
                value={content}
                onChange={handleChange}
                rows="6" />
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

export default Feedback