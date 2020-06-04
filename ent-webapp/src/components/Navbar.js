import React, { useEffect, useState } from 'react'

const Navbar = props => {

  const [message, setMessage] = useState(0)

  const [totalFlg, setTotalFlg] = useState(false)

  useEffect(() => {
    const jobId = setInterval(() => {
      const _auth = JSON.parse(sessionStorage.getItem('auth'))
      if (_auth !== null) {
        fetch(`./api/message/ent/total/${_auth.id}`)
          .then(res => res.json())
          .then(res => {
            let total = 0
            if (res.content) {
              total = res.content
              setMessage(total)
            }
            fetch(`./api/message/sys/total/企业用户/${_auth.id}`)
              .then(res => res.json())
              .then(res => {
                if (res.content) {
                  total += res.content
                  setMessage(total)
                }
              })
          })
      }
    }, 900000)
    return (() => window.clearInterval(jobId))
  }, [])

  useEffect(() => {
    if (totalFlg === props.totalFlg) {
      return
    }
    setTotalFlg(props.totalFlg)
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth !== null && props.totalFlg) {
      fetch(`./api/message/ent/total/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          let total = 0
          if (res.content) {
            total = res.content
            setMessage(total)
          }
          fetch(`./api/message/sys/total/企业用户/${_auth.id}`)
            .then(res => res.json())
            .then(res => {
              if (res.content) {
                total += res.content
                setMessage(total)
              }
            })
        })
    }
  }, [props, totalFlg])


  return (
    <div className="row shadow-sm  px-5 bg-white text-center font-weight-bold">
      <div className={`col ${props.category === '首页' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/">
          首页
        </a>
      </div>
      <div className={`col ${props.category === '岗位' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/岗位/列表">
          岗位管理
        </a>
      </div>
      <div className={`col ${props.category === '简历' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/简历/列表">
          简历管理
        </a>
      </div>
      <div className={`col ${props.category === '消息' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/消息/会话">
          消息
          &nbsp;
          {
            (message) !== 0 ? (<span className="badge badge-pill badge-danger">{message}</span>) : (<></>)
          }
        </a>
      </div>
      <div className={`col ${props.category === '记录' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/记录/登录/">
          操作记录
        </a>
      </div>
      <div className={`col ${props.category === '我的' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/我的/信息/">
          我的
        </a>
      </div>
    </div>
  )
}

export default Navbar