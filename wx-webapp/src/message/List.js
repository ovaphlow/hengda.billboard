import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Navbar from '../components/Navbar'



const MessageRow = props => {

  const handleClick = () => {
    window.location = `#消息/${props.user2_name}/${props.user2_category}/${props.user2}`
  }

  return (
    <div className="row" onClick={handleClick}>
      <div
        style={{
          background: 'url(lib/img/u679.svg)',
          backgroundSize: '100% 100%',
          paddingRight: 0
        }}
        className="col-2">
        {/* <span className="badge badge-pill badge-danger pull-right">1</span> */}
      </div>
      <div className="col">
        <div className="row ">
          <div className="col">
            <h6 className="pull-left">
              <strong>{props.user2_name}</strong>
            </h6>

            {/* <span className="pull-right">
              15:34
            </span> */}
          </div>
        </div>
        <span className="text-muted">
          {props.content}
        </span>
        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
      </div>
    </div>
  )
}


const List = () => {

  const [chatList, setChatList] = useState([])

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登陆'
      return
    } else {
      fetch(`./api/message/个人用户/${_auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setChatList(res.content)
          }
        })
    }
  }, [])



  return (
    <>
      <div className="container-fluid">
        <Title category="消息" />
        {chatList && chatList.map((item, inx) =>
          <MessageRow key={inx} {...item} />)}
      </div>
      <Navbar category="消息" />
    </>
  )

}

export default List