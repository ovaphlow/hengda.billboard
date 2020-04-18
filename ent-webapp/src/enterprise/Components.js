import React from 'react'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#/我的/信息"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '企业信息' && 'text-primary'}`}
    >
      企业信息
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#/我的/投诉"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '投诉' && 'text-primary'}`}
    >
      意见反馈/投诉
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#/我的/修改密码"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '修改密码' && 'text-primary'}`}
    >
      修改密码
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    {/* <a
      href="#/我的/资产"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '我的资产' && 'text-primary'}`}
    >
      我的资产
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a> */}
    <a
      href="#/登录"
      className={`list-group-item list-group-item-action border-0 font-weight-bold text-danger`}
    >
      退出登录
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