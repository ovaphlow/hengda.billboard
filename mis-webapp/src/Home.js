import React, { useState, useEffect } from 'react'

import Title from './components/Title'
import Navbar from './components/Navbar'
import PlayImg from './components/PlayImg'

const MessageRow = props => (
  <>
    <div className="row" style={{ fontSize: 11 }} onClick={props.toDetails}>
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <div className="pull-right">
          <a href="#/">
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          工作地点：{props.address} | 招聘人数: {props.num}
        </span>
        <br></br>
        <span>
          {props.org}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}/>
  </>
)


const TopicCard = props => (
  <>
    <div className="col bg-info text-light rounded" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} onClick={props.toDetails}>
      {props.title}
    </div>
    &nbsp;&nbsp;
  </>
)


const Home = () => {

  const [messageList, setMessageList] = useState([])

  const [topicList, setTopicList] = useState([])

  useEffect(() => {
    fetch('./api/recruitment')
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setMessageList(res.content)
        }
      })
    fetch('./api/topic')
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setTopicList(res.content)
        }
      })
  }, [])



  return (
    <>
      <div className="container-fluid">
        <Title category="龙江学子就业平台" />
        <div className="row pb-2">
          <div className="col text-center">
            <a className="text-muted" href="#登录" >
              登录完善信息，为您精准推荐职位信息
              <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <PlayImg />
        <div className="mt-2 border-0">
          <div style={{ borderLeft: ".25rem solid#007bff", fontSize: 13 }}>
            <span >&nbsp;&nbsp;热门话题</span>
          </div>
          <div className="row px-3 mt-2 text-center" style={{ fontSize: 10 }}>
            {topicList && topicList.map(item =>
              <TopicCard key={item.id} {...item} toDetails={(() => { })} />)}
          </div>
        </div>
        <div className="mt-2 border-0">
          <div style={{ width: "100%", borderLeft: ".25rem solid#007bff", fontSize: 13 }}>
            <span>&nbsp;&nbsp;推荐信息</span>
            <p className="pull-right text-primary" style={{ fontSize: 11 }}>
              <span>国企</span>
              |
              <span>公务员</span>
              |
              <span>事业单位</span>
              |
              <span>教师</span>
            </p>
          </div>
          <br></br>
          {
            messageList && messageList.map(item =>
              <MessageRow key={item.id} toDetails={(() => { })} {...item} />
            )
          }
        </div>
      </div>
      <Navbar category="首页" />
    </>
  )
}

export default Home