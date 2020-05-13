import React, { useState, useEffect } from 'react'
import ToBack from '../components/ToBack'
import moment from 'moment'

import { DateTitle } from './Components'

const RecruitRow = props => (
  <>
    <div className="row" >
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <div className="pull-right">
          <a href={`#/校园招聘/${props.id}?u_id=${props.uuid}`}>
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          举办地点:{`${props.address_level2}-${props.address_level3}`} | 开始时间:{props.time}
        </span>
        <br></br>
        <span>
          {props.school}({props.category})
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)

const Schedule = () => {

  const [list, setList] = useState({})

  // const [auth, setAuth] = useState(0)


  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      fetch(`./api/common-user-schedule/user/${_auth.id}/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            const data = {}
            const today = moment().format('YYYY-MM-DD')
            res.content.forEach(item => {
              let date = item.date
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
    } else {
      window.location='#登录'
    }
  }, [])


  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <ToBack category="我的日程" />
      <div className="tab-content mt-1">
        <div className="tab-pane fade show active">
        {
            Object.getOwnPropertyNames(list).map((key, inx) => (
              <React.Fragment key={inx}>
                <DateTitle text={key} />
                <div className="mt-2"></div>
                {list[key].map((item, inx) => <RecruitRow key={inx} {...item} />)}
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Schedule