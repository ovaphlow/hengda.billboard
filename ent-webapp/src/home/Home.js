import React, { useEffect, useState } from 'react'

import AutoCards from '../components/AutoCards'

const TopicRow = item => {

  const reg = str => str && str.replace(/<[^<>]+>/g, '')

  const getTag = tag => {
    if (tag) {
      switch (tag) {
        case '职业发展':
          return <span className="text-primary">[{item.tag}]</span>
        case '面试问题':
          return <span className="text-success">[{item.tag}]</span>
        case '职业规划':
          return <span className="text-info">[{item.tag}]</span>
        default:
          return <span className="text-dark">[{item.tag}]</span>
      }
    } else {
      return <span className="text-white">[]</span>
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <strong>
            {getTag(item.tag)}
            {item.title}
          </strong>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <span className="text-muted text-hidden">{reg(item.content)}</span>
        </div>
        <div className="col">
          {item.id ? <a className="text-muted">阅读全文>>></a> : <span className="text-white">x</span>}
        </div>
      </div>
      {item.id && <hr />}
    </React.Fragment>
  )

}

const Home = () => {

  const [message, setMessage] = useState([]);


  useEffect(() => {
    fetch(`./api/topic/ent/`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          let len = res.content.length
          if (len < 6) {
            for (let inx = 0; inx < (6 - len); inx++) {
              res.content.push({})
            }
          }
          setMessage(res.content)
        } else {
          window.alert(res.message)
        }
      })
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
      return
    }
  }, [])


  return (
    <div className="px-5 mt-4">
      <div className="row">
        <div className="col card rounded-0 shadow">
          <AutoCards category="企业端-首页" />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="col card rounded-0 shadow">
          <div className="mt-3">
            {
              message && message.map((item, inx) => <TopicRow {...item} key={inx} />)
            }
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col card rounded-0 shadow">
          x
        </div>
      </div>
    </div>
  )
}

export default Home