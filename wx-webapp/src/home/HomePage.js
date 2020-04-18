import React, { useState, useEffect } from 'react'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import { RecommendRow, TopicCards } from './Components'


const HomePage = () => {

  const [recommendList, setRecommendList] = useState([])

  const [topicList, setTopicList] = useState([])

  const [recommendTypes, setRecommendTypes] = useState({})

  const [auth, setAuth] = useState(0)

  useEffect(() => {
    const _auth = localStorage.getItem('auth')
    if (_auth !== null) {
      setAuth(JSON.parse(_auth))
    }
    fetch('./api/topic/common/')
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setTopicList(res.content)
        }
      })
    fetch('./api/recommend/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setRecommendList(res.content)
        }
      })
  }, [])

  const _onCheckboxChange = ({ value, checked }) => {
    setRecommendTypes(types => ({
      ...types,
      [value]: checked
    }))
    fetch(`./api/recommend/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...recommendTypes,
        [value]: checked
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setRecommendList(res.content)
        } else {
          alert(res.message)
        }
      })
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
            recommendList && recommendList.map(item =>
              <RecommendRow key={item.id} {...item} />
            )
          }
        </div>
      </div>
      <Navbar category="首页" />
    </>
  )
}

export default HomePage