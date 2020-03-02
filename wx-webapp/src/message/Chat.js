import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ToBack from '../components/ToBack'


const LetfMessage = props => (
  <div className="row p-2">
    <div className="col">
      <div className="pull-left pr-2" >
        <img className="rounded-circle message-img" src="lib/img/u868.png" alt="" />
      </div>
      <div className="pull-left message-text shadow border rounded p-2"  >
        {props.text}
      </div>
    </div>
  </div>
)

const RightMessage = props => (
  <div className="row p-2">
    <div className="col">
      <div className="pull-right pl-2" >
        <img className="rounded-circle message-img" src="lib/img/u868.png" alt="" />
      </div>
      <div className="pull-right message-text shadow border rounded p-2" >
        {props.text}
      </div>
    </div>
  </div>
)


const Mianshi = props => (
  <>
    <div className="row p-2 ">
      <div className="col">
        面试邀请
      </div>
    </div>
    <hr className="m-1" />
    <div className="row p-2  mt-2" style={{ fontSize: 12 }}>
      <div className="col" >
        {props.remark}
      </div>
    </div>
    <div className="row p-2">
      <div className="col">
        <span className="text-muted" style={{ fontSize: 10 }}>
          面试地点: {props.address}<br />
          面试时间: {props.datime}<br />
          面试岗位: {props.recruitment_name}<br />
          联系电话: {props.phone}<br />
        </span>
      </div>
    </div>
  </>
)



const Chat = () => {

  const { user_id, user_category, title } = useParams()

  const [contentList, setContentList] = useState([])

  const [text, setText] = useState('')

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      setAuth(_auth)
      fetch(`./api/message/content/`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          user1_id: _auth.id,
          user1_category: '个人用户',
          user2_id: user_id,
          user2_category: user_category,
        })
      })
        .then(res => res.json())
        .then(res => {
          setContentList(res.content.filter(item => item.content !== ''))
        })
    }
  }, [user_id, user_category])

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollHeight
  }, [contentList])

  const meassageText = item => {
    return item.category === '消息' ? item.content : <Mianshi {...JSON.parse(item.content)} />
  }

  const handleChange = event => {
    setText(event.target.value.trim())
  }

  const handlePush = () => {
    if (text === '') {
      return
    }
    const data = {
      category: '消息',
      send_user_id: auth.id,
      send_category: '个人用户',
      receive_user_id: user_id,
      receive_category: user_category,
      content: text
    }
    fetch(`./api/message/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setText('')
          setContentList(p => p.concat([data]))
        }
      })
  }
  return (
    <>
      <div className="fixed-top border-bottom" style={{ fontSize: 14 }}>
        <div className="pl-2">
          <ToBack category={title} />
        </div>
      </div>
      <div className="container-fluid" id="chat-body" style={{ fontSize: 14 }}>
        <div className="row p-4"></div>
        <div className="row " id="chat-body3">
          <div className="col" id="chat-body1">
            {
              contentList && contentList.map((item, inx) =>
                item.send_user_id === auth.id ?
                  <RightMessage key={inx} text={meassageText(item)} /> :
                  <LetfMessage key={inx} text={meassageText(item)} />
              )
            }
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top" >
        <div className="input-group ">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="form-control rounded-0 h-100"
            style={{ outline: 'none' }}
            placeholder="请输入内容" />
          <div className="input-group-append">
            {text === '' ? (
              <button className="btn btn-secondary rounded-0">发送</button>
            ) : (
                <button onClick={handlePush} className="btn btn-primary rounded-0">发送</button>
              )}
          </div>
        </div>
      </ul>
    </>
  )
}


export default Chat