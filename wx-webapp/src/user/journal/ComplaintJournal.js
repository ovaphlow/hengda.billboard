import React, { useState, useEffect } from 'react'
import moment from 'moment'

import ToBack from '../../components/ToBack'
import { JournalTabs, DateTitle } from '../Components'

const DataRow = props => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{props.category}</strong>
        </div>
        <div className="pull-right text-muted" style={{ fontSize: 11 }}>
          {props.datime}
        </div>
        <br></br>
        <span className="pull-left text-muted" >
          {props.content}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)


const ComplaintJournal = () => {

  const [list, setList] = useState({})


  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth === null) {
      window.location = '#登录'
    } else {
      fetch(`/api/feedback/个人用户/${auth.id}`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            const data = {}
            const today = moment().format('YYYY-MM-DD')
            res.content.forEach(item => {
              let date = item.datime.split(' ')[0]
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


  return (
    <div className="container-fluid" >
      <ToBack category="操作记录" href="#我的" />
      <JournalTabs category="反馈/投诉" />
      <div className="tab-content mt-1">
        <div className="tab-pane fade show active">
          {
            Object.getOwnPropertyNames(list).map((key, inx) => (
              <React.Fragment key={inx}>
                <DateTitle text={key} />
                <div className="mt-2"></div>
                {list[key].map((item, inx) => <DataRow key={inx} {...item} />)}
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ComplaintJournal