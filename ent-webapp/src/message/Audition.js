import React, { useEffect, useState } from 'react'
import { View } from './Components'



const ChatRow = props => (
  <div className={`row chat-item ${props.active && 'chat-item-active'}`} onClick={props.handleClick}>
    <div className="col p-3">
      <div className="float-left">
        <img className="rounded-circle chat-img" src={require('../components/img/user.jpg')} alt="" />
      </div>
      <div className="chat-text-box">
        {props.name}<br />
        <span className="text-muted">
          {props.text}
        </span>
      </div>
    </div>
  </div>
)

const LetfMessage = props => (
  <div className="row p-2">
    <div className="col">
      <div className="pull-left pr-2" >
        <img className="rounded-circle message-img" src={require('../components/img/user.jpg')} alt="" />
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
        <img className="rounded-circle message-img" src={require('../components/img/user.jpg')} alt="" />
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
    <div className="row p-2  mt-2">
      <div className="col" style={{ maxWidth: 400 }} >
        {props.remark}
      </div>
    </div>
    <div className="row p-2">
      <div className="col">
        <span className="text-muted" style={{ fontSize: 15 }}>
          面试地点: {props.address}<br />
          面试时间: {props.datime}<br />
          面试岗位: {props.recruitment_name}<br />
          联系电话: {props.phone}<br />
        </span>
      </div>
    </div>
  </>
)

const Audition = () => {

  const [text, setText] = useState('')

  const [chatList, setChatList] = useState([])

  const [nowChat, setNowChat] = useState(0)

  const [auth, setAuth] = useState(0)

  const [contentList, setContentList] = useState([])


  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      fetch(`./api/message/企业用户/${_auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            if (res.content.length > 0) {
              setNowChat(0)
              fetch(`./api/message/content/`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  user1_id: _auth.id,
                  user1_category: '企业用户',
                  user2_id: res.content[0].user2,
                  user2_category: res.content[0].user2_category,
                })
              })
                .then(res1 => res1.json())
                .then(res1 => {
                  setContentList(res1.content.filter(item => item.content !== ''))
                })
            }
            setChatList(res.content)
          }
        })
    }
  }, [])

  useEffect(() => {
    let div = document.getElementById('chat-body')
    div.scrollTop = div.scrollHeight
  }, [contentList])

  const handleClick = inx => {
    fetch(`./api/message/content/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user1_id: auth.id,
        user1_category: '企业用户',
        user2_id: chatList[inx].user2,
        user2_category: chatList[inx].user2_category,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setText('')
          setNowChat(inx)
          setContentList(res.content.filter(item => item.content !== ''))
        }
      })
  }

  const handleChange = event => {
    setText(event.target.value.trim())
  }

  const meassageText = item => {
    return item.category === '消息' ? item.content : <Mianshi {...JSON.parse(item.content)} />
  }

  const handlePush = () => {
    if (text === '') {
      return
    }
    const data = {
      category: '消息',
      send_user_id: auth.id,
      send_category: '企业用户',
      receive_user_id: chatList[nowChat].user2,
      receive_category: chatList[nowChat].user2_category,
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

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handlePush()
      return false
    }
  }

  return (
    <View category='面试'>
      <div className="row bg-white shadow " >
        <div className="col-2 border">

          <div className="row  border-bottom">
            <div className="col p-2">
              近期消息
            </div>
          </div>
          <div className="row chat-list" >
            <div className="col">
              {
                chatList && chatList.map((item, inx) =>
                  <ChatRow
                    key={inx}
                    name={item.user2_name}
                    text={item.content}
                    handleClick={() => handleClick(inx)}
                    active={inx === nowChat} />
                )
              }
            </div>
          </div>
        </div>
        <div className="col-10 border">
          <div className="row  border-bottom">
            <div className="col text-center p-2">
              王腾宇
            </div>
          </div>
          <div id="chat-body" className="row border-bottom chat-body" >
            <div className="col mt-3">
              {
                contentList && contentList.map((item, inx) =>
                  item.send_user_id === auth.id ?
                    <RightMessage key={inx} text={meassageText(item)} /> :
                    <LetfMessage key={inx} text={meassageText(item)} />
                )
              }
            </div>
          </div>
          <div className="row textarea-row border-bottom" >
            <div className="col-12 textarea-col">
              <textarea
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="message-textarea"
                placeholder="请填写内容" />
            </div>

            <div className="col-12 ">
              {text === '' ? (
                <button className="btn btn-sm btn-secondary pull-right" disabled>
                  发送
                </button>
              ) : (
                  <button className="btn btn-sm btn-primary pull-right" onClick={handlePush}>
                    发送
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </View>
  )
}

export default Audition