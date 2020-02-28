import React from 'react'

const Sidebar = () => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#岗位/列表"
      className={`list-group-item list-group-item-action border-0`}
    >
      已发布的职位
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#岗位/数据统计"
      className={`list-group-item list-group-item-action border-0`}
    >
      数据统计
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#岗位/投简次数"
      className={`list-group-item list-group-item-action border-0`}
    >
      投简次数
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
  </div>
)

export const View = props => (
  <div className="row px-5 mt-4">
    <div className="col-md-2 ">
      <Sidebar />
    </div>
    <div className="col-md-10">
      {props.children}
    </div>
  </div>
)