import React, { useState, useEffect } from 'react'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import { MessageRow, TopicCard } from './Components'


const HomePage = () => {

  const [messageList, setMessageList] = useState([])

  const [topicList, setTopicList] = useState([])

  const [messageTypes, setMessageTypes] = useState({})

  const [ auth, setAuth ] = useState(0)

  useEffect(() => {
    const _auth = localStorage.getItem('auth')
    if (_auth !== null) {
      setAuth(JSON.parse(_auth)) 
    }
    
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

  useEffect(() => {
    console.info(messageTypes)
  },[messageTypes])

  const _onCheckboxChange = ({value,checked}) => {
    setMessageTypes(types => ({
      ...types,
      [value]: checked
    }))
  }

  return (
    <>
      <div className="container-fluid">
        <Title category="龙江学子就业平台" />
        <div className="row pb-2">
          {
            auth!==0 || (
              <div className="col text-center">
                <a className="text-muted" href="#登录" >
                  登录完善信息，为您精准推荐职位信息
                  <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
                </a>
              </div>
            )
          }
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
            <p className="pull-right text-primary" style={{ fontSize: 12 }}>
              <TextCheckbox value="国企" onChange={_onCheckboxChange}>
                国企
              </TextCheckbox>
              |
              <TextCheckbox value="公务员" onChange={_onCheckboxChange}>
                公务员
              </TextCheckbox>
              |
              <TextCheckbox value="事业单位" onChange={_onCheckboxChange}>
                事业单位
              </TextCheckbox>
              |
              <TextCheckbox value="教师" onChange={_onCheckboxChange}>
                教师
              </TextCheckbox>
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

export default HomePage