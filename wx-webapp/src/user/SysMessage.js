import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import ToBack from '../components/ToBack'

const DataRow = props => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <br></br>
        <span className="text-success">
          {props.content}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)

const SysMessage = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))

    if (_auth === null) {
      window.location = '#登录'
      return
    }
    fetch(`./api/message/sys/common/${_auth.id}`)
      .then(res => res.json())
      .then(res => {
        setList(res.content)
      })
  }, [])


  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <ToBack category="平台消息" />
        {list && list.map((item, inx) => <DataRow key={inx} {...item} />)}
      </div>
      <Navbar category="我的"/>
    </>
  )


}

export default SysMessage