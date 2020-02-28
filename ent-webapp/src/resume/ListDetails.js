import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Modal from '../components/Modal'
import { View, ResumeView } from './Components'
import { SearchFavorite } from './ResumeDetalis'


const ListDetails = () => {

  const { id } = useParams()

  const [data, setData] = useState({})

  const [favorite, setFavorite] = useState(false)

  const [auth, setAuth] = useState(0)

  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      setAuth(_auth)
      fetch(`./api/delivery/details/${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.content) {
            setData(p => res.content)
            SearchFavorite({
              user_id: _auth.id,
              data_id: res.content.resume_id,
              category1: '企业用户',
              category2: '简历',
            }).then(res2 => {
              if (res2.content) {
                setFavorite(p => res2.content)
              }
            })
            if (res.content.status === '已投递')
              fetch(`./api/delivery/status/`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  id: id,
                  status: '已查看'
                })
              })
          } else {
            window.alert(res.message)
          }
        })


    }
  }, [id])

  const handleFavorite = () => {
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
          data_id: data.resume_id,
          category1: '企业用户',
          category2: '简历',
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === '') {
            SearchFavorite({
              user_id: auth.id,
              data_id: data.resume_id,
              category1: '企业用户',
              category2: '简历',
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
  }


  const handleInvite = () => {

    const content = JSON.stringify({
      remark: document.getElementById('remark').value,
      address: document.getElementById('address').value,
      datime: document.getElementById('datime').value,
      recruitment_name: data.recruitment_name,
      recruitment_id: data.recruitment_id,
      phone: document.getElementById('phone').value,
    })

    fetch(`./api/message/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        category: '面试邀请',
        send_user_id: auth.id,
        send_category: '企业用户',
        receive_user_id: data.common_user_id,
        receive_category: '个人用户',
        content: content
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          window.alert('已发出面试邀请,请到消息确实')
          fetch(`./api/delivery/status/`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              id: id,
              status: '已邀请'
            })
          })
          setModalShow(false)
        }
      })
  }

  return (
    <View category='列表'>
      <div className="row bg-white shadow" >
        <div className="col card rounded-0">
          <div className="card-body">
            <ResumeView bar={(
              <div className="pull-right">
                <button className="btn btn-light rounded-0 text-muted" onClick={handleFavorite} >
                  {
                    favorite ?
                      (<i className="fa fa-star fa-fw" style={{ color: '#FFFF00' }} aria-hidden="true"></i>) :
                      (<i className="fa fa-star-o" aria-hidden="true"></i>)
                  }
                  收藏
                </button>
                <button className="btn btn-light rounded-0 text-muted" onClick={() => setModalShow(true)} >
                  <i className="fa fa-comment-o fa-fw" aria-hidden="true"></i>
                  邀请面试
                  </button>
                <button className="btn btn-light rounded-0 text-danger" >
                  <i className="fa fa-ban fa-fw" aria-hidden="true"></i>
                  举报
                </button>
              </div>
            )} {...data} />
            <div className="row">
              <div className="col">
                <a href={`#简历/列表/`} className="btn btn-primary">返回</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="发起邀请"
        show={modalShow}
        handleSave={handleInvite}
        close={() => setModalShow(false)} >
        <div className="form-group">
          <label>面试职位</label>
          <input type="text"
            className="form-control"
            defaultValue={data.recruitment_name} readOnly />
        </div>
        <div className="form-group">
          <label>联系电话</label>
          <input id="phone" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>面试时间</label>
          <input
            id="datime"
            type="datetime-local"
            className="form-control" />
        </div>
        <div className="form-group">
          <label>面试地点</label>
          <textarea
            id="address"
            className="form-control" />
        </div>
        <div className="form-group">
          <label>备注</label>
          <textarea
            id="remark"
            className="form-control" />
        </div>
      </Modal>
    </View>
  )

}

export default ListDetails
