import React, { useState, useEffect } from 'react'
import moment from 'moment'

import ToBack from '../components/ToBack'
import { useLocation, useParams } from 'react-router-dom'


const TopicDetails = () => {

  const { search } = useLocation()

  const { id } = useParams()

  const [item, setItem] = useState(0)

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth === null) {
      fetch(`./api/journal`,{
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          common_user_id: 0,
          data_id: id,
          category: '热门话题',
          datime: moment().format('YYYY-MM-DD HH:mm')
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } 
        })
    } else {
      fetch(`./api/journal`,{
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          common_user_id: _auth.id,
          data_id: id,
          category: '热门话题',
          datime: moment().format('YYYY-MM-DD HH:mm')
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } 
        })
    }
    fetch(`./api/topic/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setItem(res.content)
        }
      })
  }, [id, search])


  return item === 0 ? (
    <div className="container-fluid">
      <ToBack />
    </div>
  ) : (
      <div className="container-fluid">
        <ToBack category={item.title} />
        <div className="row mt-2" style={{fontSize:14}}>
          <div className="col editor-body" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    )
}

export default TopicDetails