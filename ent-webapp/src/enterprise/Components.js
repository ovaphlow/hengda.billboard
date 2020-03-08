import React from 'react'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#信息"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '企业信息' && 'text-primary'}`}
    >
      企业信息
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#信息"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '我的资产' && 'text-primary'}`}
    >
      我的资产
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