import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams, useLocation } from 'react-router-dom'

import ToBack from '../components/ToBack'
import { searchFavorite } from '../recruitment/Details'

const RecommendDetails = props => {

  const { id } = useParams()

  const { search } = useLocation()

  const [item, setItem] = useState(0)

  const [auth, setAuth] = useState(0)

  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    fetch(`./api/recommend/${id}${search}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setItem(res.content)
        } else {
          alert(res.message)
        }
      })
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth !== null) {
      setAuth(_auth)
      searchFavorite({
        user_id: _auth.id,
        data_id: id,
        category1: '个人用户',
        category2: '推荐信息',
      }).then(res => {
        if (res.content) {
          setFavorite(p => res.content)
        }
      })
      fetch(`./api/journal/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          common_user_id: _auth.id,
          data_id: id,
          category: '推荐信息',
          datime: moment().format('YYYY-MM-DD HH:mm')
        })
      })
        .then(res => res.json())
        .then(res => { })
    }
  }, [id,search])

  const handleFavorite = () => {
    if (auth) {
      if (favorite) {
        fetch(`./api/favorite/${favorite.id}/`, {
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
            user_id: auth.id,
            data_id: id,
            category1: '个人用户',
            category2: '推荐信息',
          })
        })
          .then(res => res.json())
          .then(res => {
            if (res.message === '') {
              searchFavorite({
                user_id: auth.id,
                data_id: id,
                category1: '个人用户',
                category2: '推荐信息',
              }).then(res1 => {
                if (res1.content) {
                  setFavorite(p => res1.content)
                }
              })
            } else {
              alert(res.message)
            }
          })
      }
    } else {
      window.location = '#登录'
    }
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="row mt-2">
          <div className="col">
            发布时间：{item.date1}
          </div>
        </div>
        <div className="row">
          <div className="col">
            截止日期：{item.date2}
          </div>
        </div>
        <div className="row">
          <div className="col">
            所属省份：{item.address_level1}
          </div>
        </div>
        <div className="row">
          <div className="col">
            工作地点：{item.address_level2}
          </div>
        </div>
        <div className="row">
          <div className="col">
            单位：{item.publisher}
          </div>
        </div>
        <div className="row">
          <div className="col">
            招聘人数：{item.qty}
          </div>
        </div>
        <div className="row">
          <div className="col">
            报名方式：{item.baomignfangshi}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top" >
        <div className="row text-center nav-row">
          <div className="col-2 nav-col"></div>
          <div className="col nav-col"></div>
          <div className="col-2 nav-col"></div>
          <div className="col-5 nav-col">
            <button className="btn btn-success nav-btn" onClick={handleFavorite}>
              {
                favorite ?
                  (<i className="fa fa-star" style={{ color: '#FFFF00' }} aria-hidden="true"></i>) :
                  (<i className="fa fa-star-o" aria-hidden="true"></i>)
              }
              收藏
            </button>
          </div>
        </div>
      </ul>
    </>
  )
}

export default RecommendDetails