import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import ToBack from '../components/ToBack'

const DataRow = props => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{props.recruitment_name}</strong>
        </div>
        <div className="pull-right">
          <span className="pull-right text-muted" style={{ fontSize: 11 }}>
            {props.datime}
          </span>
        </div>
        <br></br>
        <span className="text-success">
          {props.enterprise_name}
        </span>
        <br />
        <span className="pull-left text-muted" style={{ fontSize: 11 }}>
          {props.remark}
        </span>
        <br />
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试地点: {props.address}
        </span>
        <br />
        <span className="text-muted" style={{ fontSize: 11 }}>
          联系电话: {props.phone}
        </span>
        <br />
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试时间: {props.mianshishijian}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)

const Offer = () => {

  const [list, setList] = useState([])

  const [totalFlg, setTotalFlg] = useState(false)

  useEffect(() => {
    let jobId = -1
    const _auth = JSON.parse(localStorage.getItem('auth'))

    if (_auth === null) {
      window.location = '#登录'
      return
    }
    fetch(`./api/offer/common/${_auth.id}`)
      .then(res => res.json())
      .then(res => {
        setList(res.content)
        setTotalFlg(true)
      })

    jobId = setInterval(() => {
      fetch(`./api/offer/common/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          setList(res.content)
        })
    }, 900000)
    return (() => {
      if (jobId !== -1) {
        window.clearInterval(jobId)
      }
    })
  }, [])


  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <ToBack category="面试邀请" />
        {list && list.map((item, inx) => <DataRow key={inx} {...item} />)}
      </div>
      <Navbar category="消息" totalFlg={totalFlg} />
    </>
  )


}

export default Offer