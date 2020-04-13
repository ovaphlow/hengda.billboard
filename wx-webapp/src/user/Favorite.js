import React, { useState, useEffect } from 'react'
import ToBack from '../components/ToBack'
import { RecruitmentRow, RecruitRow, RecommendRow } from '../components/DataRow'

const Favorite = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      fetch(`./api/favorite/个人用户/${_auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setList(res.content)
          }
        })
    }
  }, [])

  const dateRow = (item,inx) => {
    if (item.category2 === '岗位') {
      return (<RecruitmentRow key={inx} {...item} />)
    } else if (item.category2 === '校园招聘') {
      return (<RecruitRow key={inx} {...item}/>)
    } else if (item.category2 === '推荐信息') {
      return (<RecommendRow key={inx} {...item} />)
    }
  }

  return (
    <div className="container-fluid" style={{ fontSize: 12 }}>
      <ToBack category="我的收藏" />
      <div className="mt-1"></div>
      {list && list.map((item,inx) => dateRow(item,inx))}
    </div>
  )

}

export default Favorite