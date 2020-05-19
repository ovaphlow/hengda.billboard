import React, { useState, useEffect } from 'react'

import ToBack from '../components/ToBack'
import { useLocation, useParams } from 'react-router-dom'


const TopicDetails = () => {

  const { search } = useLocation()

  const { id } = useParams()

  const [item, setItem] = useState(0)

  useEffect(() => {
    fetch(`./api/banner/detail/${id}${search}`)
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
          <div className="col editor-body" dangerouslySetInnerHTML={{ __html: item.comment }} />
        </div>
      </div>
    )
}

export default TopicDetails