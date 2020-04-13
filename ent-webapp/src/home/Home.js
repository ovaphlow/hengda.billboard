import React, { useEffect, useState } from 'react'

const Home = () => {

  const [auth, setAuth] = useState(0)

  const [message, setMessage] = useState([{
    title: '2020 拜年祭——B站除夕贺岁节目正在直播！',
    content: '来和B站的小伙伴一起过年吧！即将开始第一波抽奖！20万现金红包、iphone 11 pro、限定周边等你来拿'
  }]);


  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
      return
    } else {
      setAuth(_auth)
    }
  }, [])

  return (
    <div className="px-5 mt-4">
      <div className="row">
        <div className="col card rounded-0 shadow">
          <h5>{auth.name}</h5>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="col card rounded-0 shadow">
          {
            message && message.map(item=> (
              <div>

              </div>
            ))
          }
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col card rounded-0 shadow">
          x
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="col card rounded-0 shadow">
          x
        </div>
      </div>
    </div>
  )
}

export default Home