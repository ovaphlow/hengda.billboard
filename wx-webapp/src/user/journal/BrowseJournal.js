import React, { useState, useEffect } from 'react'
import ToBack from '../../components/ToBack'
import { RecruitmentRow } from '../../components/DataRow'
import { JournalTabs, DateTitle } from '../Components'
import moment from 'moment'

const BrowseJournal = () => {

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
            const today = moment().format('YYYY-MM-DD')
            res.content.forEach(item => {
              let date = item.journal_date.split(' ')[0]
              if (today === date) {
                date = '今天'
              }
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

  const dataRow = (item, inx) => {
    if (item.category === '岗位') {
      return (<RecruitmentRow key={inx} {...item} />)
    }
  }

  return (
    <div className="container-fluid" >
      <ToBack category="操作记录" href="#我的" />
      <JournalTabs category="浏览" />
      <div className="tab-content mt-1">
        <div className="tab-pane fade show active">
          {
            Object.getOwnPropertyNames(list).map((key, inx) => (
              <React.Fragment key={inx}>
                <DateTitle text={key}/>
                <div className="mt-2"></div>
                {list[key].map((item, inx) => dataRow(item, inx))}
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </div>
  )

}

export default BrowseJournal