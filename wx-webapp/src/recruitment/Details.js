import React, { useState, useEffect } from 'react'
import moment from 'moment'


import ToBack from '../components/ToBack'
import { useParams } from 'react-router-dom'

const Details = () => {

  const [data, setData] = useState(0)

  const [favorite, setFavorite] = useState(0)

  const [delivery, setDelivery] = useState(0)

  const [auth, setAuth] = useState(0)

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

  useEffect(() => {
    if (data) {
      const _auth = JSON.parse(localStorage.getItem('auth'))
      if (_auth !== null) {
        setAuth(p => _auth)
        fetch(`./api/journal/`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            common_user_id: _auth.id,
            data_id: data.id,
            category: '岗位',
            datime: moment().format('YYYY-MM-DD HH:mm')
          })
        })
          .then(res => res.json())
          .then(res => { })
        fetch(`./api/favorite/${_auth.id}/${data.id}/岗位/`)
          .then(res => res.json())
          .then(res => {
            if (res.content) {
              setFavorite(p => true)
            }
          })
        fetch(`./api/delivery/${_auth.id}/${data.id}/`)
          .then(res => res.json())
          .then(res => {
            if (res.content) {
              setDelivery(p => true)
            }
          })
      }
    }
  }, [data])


  const handleFavorite = () => {
    if (favorite) {
      fetch(`./api/favorite/${auth.id}/${data.id}/岗位/`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === '') {
            setFavorite(false)
          } else {
            alert(res.message)
          }
        })
    } else {
      fetch(`./api/favorite/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          common_user_id: auth.id,
          data_id: data.id,
          category: '岗位',
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === '') {
            setFavorite(true)
          } else {
            alert(res.message)
          }
        })
    }
  }

  const handleResumeDelivery = () => {
    fetch(`./api/delivery/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        common_user_id: auth.id,
        recruitment_id: data.id,
        datime: moment().format('YYYY-MM-DD HH:mm'),
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === '') {
          setDelivery(true)
        } else {
          alert(res.message)
        }
      })
  }


  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <ToBack />
        {data && (
          <>
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
          </>
        )}
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top" >
        <div className="row text-center nav-row">
          <div className="col nav-col" >
          </div>
          <div className="col nav-col" >
          </div>
          <div className="col-3 nav-col" >
            <button className="btn btn-light nav-btn text-muted" onClick={handleFavorite}>
              {
                favorite ?
                  (<i className="fa fa-star" style={{ color: '#FFFF00' }} aria-hidden="true"></i>) :
                  (<i className="fa fa-star-o" aria-hidden="true"></i>)
              }
              收藏
            </button>
          </div>
          {
            delivery ? (
              <div className="col-5 nav-col">
                <button className="btn btn-secondary nav-btn " 
                  onClick={handleResumeDelivery} disabled>
                  {delivery === true? '已投递':delivery.status}
                </button>
              </div>
            ) : (
                <div className="col-5 nav-col">
                  <button className="btn btn-primary nav-btn" 
                    onClick={handleResumeDelivery}>
                    投递简历
                  </button>
                </div>
              )
          }

        </div>
      </ul>
    </>
  )

}

export default Details