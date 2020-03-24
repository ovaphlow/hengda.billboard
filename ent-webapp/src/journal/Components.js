import React from 'react'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#记录/登录"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '登录' && 'text-primary'}`}
    >
      登录记录
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#记录/操作"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '操作' && 'text-primary'}`}
    >
      操作记录
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#记录/举报"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '举报' && 'text-primary'}`}
    >
      举报记录
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#记录/投诉"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '投诉' && 'text-primary'}`}
    >
      (问题反馈/投诉)记录
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
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