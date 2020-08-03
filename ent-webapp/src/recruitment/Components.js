import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#岗位/列表"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '我的职位' && 'text-primary'}`}
    >
      我的岗位
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    {/* <a
      href="#岗位/投简次数"
      className={`list-group-item list-group-item-action border-0 ${props.category === '投简次数' && 'text-primary'}` }
    >
      投简次数
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a> */}
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