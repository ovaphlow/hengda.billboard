import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { RecruitmentRow } from '../components/DataRow'
import ToBack from '../components/ToBack'


const Enterprise = () => {

  const [data, setData] = useState({})

  const [list, setList] = useState([])

  const { id } = useParams()

  const { search } = useLocation()

  useEffect(() => {
    fetch(`./api/enterprise/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setData(res.content)
        }
      })
    fetch(`./api/recruitment/enterprise/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
        } else {
          setList(res.content)
        }
      })
  }, [id, search])


  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <div className="card border-0 shadow mt-2">
        <br />
        <ToBack report dataType="企业" dataId={id} search={search} />
        <div className="card-body">
          <div className="row mt-2">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h5 className="pull-left">{data.name}</h5>
                  <a className="pull-right text-success"
                    href={`#消息/${data.name}/${data.ent_user_id}`}>
                    <i className="fa fa-fw fa-comments" ></i>
                咨询
              </a>
                </div>
              </div>
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
            list && list.map(item => <RecruitmentRow key={item.id} {...item} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Enterprise