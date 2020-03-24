import React, { useState, useEffect } from 'react'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import { MessageRow, TopicCards } from './Components'


const HomePage = () => {

  const [messageList, setMessageList] = useState([])

  const [topicList, setTopicList] = useState([])

  const [messageTypes, setMessageTypes] = useState({})

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    const _auth = localStorage.getItem('auth')
    if (_auth !== null) {
      setAuth(JSON.parse(_auth))
    }

    setMessageList([
      {
        id: 0,
        title: '黑龙江职业学院2019年公开招聘工作人员公告',
        address: '哈尔滨',
        num: '若干',
        org: '黑龙江职业学院',
        type: '教师'
      },
      {
        id: 1,
        title: '国家信息中心2019年公开招聘工作人员公告',
        address: '各地',
        num: '若干',
        org: '国家信息中心',
        type: '公务员'
      },
      {
        id: 2,
        title: '2019年北京市石景山区事业单位公开招聘工作',
        address: '北京',
        num: '2',
        org: '北京市石景山区人力资源和社会保障局',
        type: '事业单位'
      },
      {
        id: 3,
        title: '天津市大数据管理中心公开招聘工作人员公告',
        address: '天津',
        num: '若干',
        org: '天津市人才服务中心',
        type: '国企'
      }
    ])
    fetch('./api/topic')
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setTopicList(res.content)
        }
      })
  }, [])

  useEffect(() => {
  }, [messageTypes])

  const _onCheckboxChange = ({ value, checked }) => {
    setMessageTypes(types => ({
      ...types,
      [value]: checked
    }))
  }

  return (
    <>
      <div className="container-fluid">
        <Title category="龙江学子就业平台" />
        {
          auth !== 0 || (
            <div className="row pb-2">
              <div className="col text-center">
                <a className="text-muted" href="#登录" >
                  登录完善信息，为您精准推荐职位信息
                  <i className="fa fa-chevron-right fa-fw pull-right text-muted" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          )
        }

        <PlayImg category={'小程序-首页'} />
        <div className="mt-2 border-0">
          <div style={{ borderLeft: ".25rem solid#007bff", fontSize: 13 }}>
            <span >&nbsp;&nbsp;热门话题</span>
          </div>
          <TopicCards list={topicList} />
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