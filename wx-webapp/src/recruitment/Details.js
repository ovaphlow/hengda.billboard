import React, { useState, useEffect } from 'react'

import ToBack from '../components/ToBack'
import { useParams } from 'react-router-dom'

const Details = () => {

  const [data, setData] = useState({})

  const { id } = useParams()

  useEffect(() => {
    fetch(`./api/recruitment/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setData(res.content)
        } else {
          alert(res.message)
        }
      })
  }, [id])


  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <ToBack />
        <div className="row mt-3">
          <div className="col">
            <h4>{data.name}</h4>
          </div>
          <div className="col-5">
            <span className="pull-right text-muted" style={{ fontSize: 12 }}>
              {data.date}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="text-muted" style={{ fontSize: 12 }}>
              {data.enterprise_name}<br />
              {data.address2 ? data.address2 : data.address1} |{data.education}|{data.category}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <h5 className="text-success">
              {
                data.salary1 && data.salary2 ?
                  `${data.salary1}-${data.salary2}/月` :
                  '面议'
              }
            </h5>
          </div>
        </div>
        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        <div className="row mt-3">
          <div className="col">
            <h5>职位描述</h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            岗位要求:<br />
            {data.description}
          </div>
        </div>

        <div className="row">
          <div className="col">
            工作内容:<br />
            {data.requirement}
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top" >
        <div className="row text-center nav-row">
          <div className="col nav-col" >
          </div>
          <div className="col nav-col" >
          </div>
          <div className="col-3 nav-col" >
            <button className="btn btn-light nav-btn text-muted">
              <i class="fa fa-star-o" aria-hidden="true"></i>
              收藏
            </button>
          </div>
          <div className="col-5 nav-col">
            <button className="btn btn-primary nav-btn">
              投递简历
            </button>
          </div>
        </div>
      </ul>
    </>
  )

}

export default Details