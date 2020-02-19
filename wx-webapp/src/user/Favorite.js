import React, { useState, useEffect } from 'react'
import ToBack from '../components/ToBack'
import { RecruitmentRow } from '../components/DataRow'


const Favorite = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      fetch(`./api/favorite/${_auth.id}`)
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
    if (item.category === '岗位') {
      return (<RecruitmentRow key={inx} {...item} />)
    }
  }


  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <ToBack category="我的收藏" />
      <div className="mt-1"></div>
      {
        list && list.map((item,inx) => dateRow(item,inx))
      }
    </div>
  )

}

export default Favorite