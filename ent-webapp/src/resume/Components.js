import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#简历/列表"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '列表' && 'text-primary'}`}
    >
      已收到的简历
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/简历/检索"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '检索' && 'text-primary'}`}
    >
      简历检索
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>

    {/* <a
      href="#简历/推荐"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '推荐' && 'text-primary'}`}
    >
      平台推荐
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a> */}
    <a
      href="#简历/收藏"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '收藏' && 'text-primary'}`}
    >
      我的收藏
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#简历/推荐"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '推荐' && 'text-primary'}`}
    >
      系统推荐
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
  </div>
)

export const View = props => (
  <div className="row px-5 mt-4">
    <div className="col-md-2 ">
      <Sidebar category={props.category} />
    </div>
    <div className="col-md-10">
      {props.children}
    </div>
  </div>
)


export const ResumeView = props => {

  const [list, setList] = useState([])

  useEffect(() => {
    if (props.common_user_id) {
      fetch(`./api/common-user-file/${props.common_user_id}/简历/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setList(p => res.content)
          }
        })
    }
  }, [props.common_user_id])

  const age = birthday => {
    if (birthday && birthday !== '') {
      return `${parseInt(moment().format('YYYY')) - parseInt(birthday.slice(0, 4))}岁`
    } else {
      return '0岁'
    }
  }

  const phoneHide = phone => {
    if (phone && phone.length === 11) {
      return `${phone[0]}${phone[1]}${phone[2]} **** ${phone[7]}${phone[8]}${phone[9]}${phone[10]}`
    } else {
      return '错误的号码格式'
    }
  }

  const emailHide = email => {
    if (email && email.split('@').length > 1) {
      const strs = email.split('@')
      return `${strs[0].replace(/./g, '*')}@${strs[1]}`
    } else {
      return '错误的邮箱格式'
    }
  }

  return (
    <>
      <div className="row">
        <div className="col item-middle">
          {/* <img
            className="img-fluid pull-left"
            style={{ height: 100 }}
            alt=""
            src={require('../components/img/user.jpg')} /> */}
          <div>
            <h3>{props.name}</h3>
            <span className="text-muted">
              {props.gender}&nbsp;|&nbsp;{age(props.birthday)}&nbsp;|&nbsp;{props.address2}
              <br />
              <FontAwesomeIcon icon={faPhoneAlt} fixedWidth />
              {phoneHide(props.phone)} &nbsp;
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              {emailHide(props.email)}
            </span>
          </div>
        </div>
        <div className="col">
          {props.bar}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>求职意向</h4>
          <span className="text-muted">
            期望行业:&nbsp;{props.qiwanghangye}/{props.qiwangzhiwei}<br />
            期望地点:&nbsp;{props.yixiangchengshi}
          </span>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>毕业院校</h4>
          <span style={{ fontSize: 'larger' }}>
            {props.school}
          </span>
          <span className="text-muted">
            /{props.education}
            <br />
            在校时间: {props.date_begin}&nbsp; - &nbsp;{props.date_end}
          </span>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>自我评价</h4>
          <span className="text-muted" dangerouslySetInnerHTML={{ __html: props.ziwopingjia }} />
        </div>
      </div>
      <hr />
      <div className="row mb-2">
        <div className="col">
          <h4>相关证书</h4>
          {list && list.map((item, inx) =>
            <img key={inx} className="img col-3" alt="" src={item.file} />
          )}
        </div>
      </div>
      <hr />
    </>
  )
}