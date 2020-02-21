import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { RecruitmentRow } from '../components/DataRow'
import ToBack from '../components/ToBack'


const Enterprise = () => {

  const [data, setData] = useState({})

  const [list, setList] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetch(`./api/enterprise/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setData(res.content)
        }
      })
    fetch(`./api/recruitment/enterprise/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setList(res.content)
        }
      })
  }, [id])


  return (
    <div className="container-fluid" style={{ fontSize: 12 }}>
      <ToBack report dataType="企业" dataId={id} />
      <div className="row mt-2">
        <div className="col">
          <h5>{data.name}</h5>
          <span className="text-muted">
            {data.zhuziguimo} | {data.yuangongshuliang}
          </span><br />
          <span className="text-muted">
            {data.address1}-{data.address2}-{data.address3}
          </span><br />
          <span className="text-muted">
            详细地址: {data.address4}
          </span><br />
        </div>
      </div>
      <hr />
      <div className="row mt-2">
        <div className="col">
          <h6>在招职位</h6>
        </div>
      </div>
      {
        list&& list.map(item=> <RecruitmentRow key={item.id} {...item} />)
      }
    </div>
  )
}

export default Enterprise