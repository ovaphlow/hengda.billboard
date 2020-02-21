import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'


import ToBack from '../components/ToBack'

const RecruitmentDetail = props => (
  <>
    <div className="row">
      <div className="col">
        <h6>{props.name}</h6>
      </div>
      <div className="col-5">
        <span className="pull-right text-muted" style={{ fontSize: 12 }}>
          {props.date}
        </span>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <span className="text-muted" style={{ fontSize: 12 }}>
          {props.enterprise_name}<br />
          {props.address2 ? props.address2 : props.address1} |{props.education}|{props.category}
        </span>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col">
        <h5 className="text-success">
          {
            props.salary1 && props.salary2 ?
              `${props.salary1}-${props.salary2}/月` :
              '面议'
          }
        </h5>
      </div>
    </div>
  </>
)

const EnterpriseDetail = props => (
  <div className="row">
    <div className="col">
      <h5>{props.name}</h5>
      <span className="text-muted">
        {props.zhuziguimo} | {props.yuangongshuliang}
      </span><br />
      <span className="text-muted">
        {props.address1}-{props.address2}-{props.address3}
      </span><br />
      <span className="text-muted">
        详细地址: {props.address4}
      </span><br />
    </div>
  </div>
)


const Report = () => {

  const [content, setCntent] = useState('')

  const [auth, setAuth] = useState(0)

  const [data, setData] = useState({})

  const { id, category } = useParams()

  useEffect(() => {
    if (category === '岗位') {
      fetch(`./api/recruitment/${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.content) {
            setData(res.content)
          } else {
            alert(res.message)
          }
        })
    }
    if (category === '企业') {
      fetch(`./api/enterprise/${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setData(res.content)
          }
        })
    }
  }, [id, category])


  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#/登录'
    } else {
      setAuth(_auth)
    }
  }, [])


  const handleChange = e => {
    setCntent(e.target.value)
  }

  const handleSave = () => {
    if (content === '') {
      window.alert('请填写反馈内容')
      return
    }
    fetch(`./api/report/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        data_id: id,
        content: content,
        category: category,
        common_user_id: auth.id,
        datime: moment().format('YYYY-MM-DD HH:mm')
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          alert('感谢你的反馈,我们将尽快处理')
          window.history.go(-1)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>举报内容</h4>
        </div>
        <div className="card">
          <div className="card-body">
            {category === '企业' && <EnterpriseDetail {...data} />}
            {category === '岗位' && <RecruitmentDetail {...data} />}
          </div>
        </div>
        <div className="mt-2">
          <h4>举报原因</h4>
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
            提交
          </button>
        </div>
      </ul>
    </>
  )
}

export default Report