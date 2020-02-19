import React, { useState, useEffect } from 'react'
import ToBack from '../components/ToBack'
import { RecruitmentRow } from '../components/DataRow'

const Journal = () => {

  const [list, setList] = useState({})

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      fetch(`./api/journal/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            const data = {}
            res.content.forEach(item => {
              const date = item.journal_date.split(' ')[0]
              if (data[date]) {
                data[date].push(item)
              } else {
                data[date] = [item]
              }
            })
            setList(data)
          }
        })
    }
  }, [])

  const dateRow = (item, inx) => {
    if (item.category === '岗位') {
      return (<RecruitmentRow key={inx} {...item} />)
    }
  }

  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <ToBack category="历史记录" />
      {
        Object.getOwnPropertyNames(list).map(key => (
          <>
            <div style={{ borderLeft: ".25rem solid#007bff", fontSize: 13 }}>
              <span >&nbsp;&nbsp;{key}:</span>
            </div>
            <div className="mt-2"></div>
            {list[key].map((item, inx) => dateRow(item, inx))}
          </>
        )

        )
      }
    </div>
  )

}

export default Journal