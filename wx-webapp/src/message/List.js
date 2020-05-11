import React, { useEffect, useState } from 'react'
// import Title from '../components/Title'
import Navbar from '../components/Navbar'



const MessageRow = props => {

  const handleClick = () => {
    window.location = `#消息/${props.name}/${props.ent_user_id}`
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
        {

        } &nbsp;
      </div>
      <div className="col">
        <div className="row ">
          <div className="col">
            <h6 className="pull-left">
              <strong>{props.name}</strong>
              &nbsp;
              {props.total !== 0 ? (<span className="badge badge-danger">{props.total}</span>) : (<></>)}
            </h6>
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

  const [chatTotal, setChatTotal] = useState([])

  const [offerTotal, setOfferTotal] = useState(0)

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    document.title = '消息'
    const _auth = JSON.parse(localStorage.getItem('auth'))
    let jobId1 = -1
    let jobId2 = -1
    if (_auth === null) {
      window.location = '#登录'
      return
    } else {
      setAuth(_auth)
      fetch(`./api/message/个人用户/${_auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            fetch(`./api/message/common/chat/total/${_auth.id}`)
              .then(res => res.json())
              .then(res => {
                setChatTotal(res.content)
              })
            jobId1 = setInterval(() => {
              fetch(`./api/message/common/chat/total/${_auth.id}`)
                .then(res => res.json())
                .then(res => {
                  setChatTotal(res.content)
                })
            }, 900000)
            fetch(`./api/offer/common/total/${_auth.id}`)
              .then(res => res.json())
              .then(res => {
                setOfferTotal(res.content)
              })
            jobId2 = setInterval(() => {
              fetch(`./api/offer/common/total/${_auth.id}`)
                .then(res => res.json())
                .then(res => {
                  setOfferTotal(res.content)
                })
            }, 900000)
            setChatList(res.content)
          }
        })
    }
    return (() => {
      if (jobId1 !== -1) {
        window.clearInterval(jobId1)
      }
      if (jobId2 !== -1) {
        window.clearInterval(jobId2)
      }
    })
  }, [])

  useEffect(() => {
    if (auth) {
      fetch(`./api/message/个人用户/${auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setChatList(res.content)
          }
        })
    }

  }, [chatTotal, auth])

  const handleClick = () => {
    window.location = `#消息/邀请/`
  }


  return (
    <>
      <div className="container-fluid">
        {/* <Title category="消息" /> */}
        <div className="row">
          <div
            style={{
              background: 'url(lib/img/u679.svg)',
              backgroundSize: '100% 100%',
              paddingRight: 0
            }}
            className="col-2">

          </div>
          <div className="col">
            <div className="row " onClick={handleClick}>
              <div className="col">
                <h6 className="pull-left text-primary">
                  <strong>面试邀请</strong>
                  &nbsp;
                  {
                    offerTotal !== 0 ? (<span className="badge badge-pill badge-danger pull-right">{offerTotal}</span>) : (<></>)
                  }
                </h6>
              </div>
            </div>
            <br />
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          </div>
        </div>
        {chatList && chatList.map((item, inx) =>
          <MessageRow key={inx} {...item}
            total={chatTotal.length > 0 && chatTotal.find(it => it.ent_user_id === item.ent_user_id).count} />)}
      </div>
      <Navbar category="消息" />
    </>
  )

}

export default List