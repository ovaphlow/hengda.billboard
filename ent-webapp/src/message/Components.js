import React from 'react'

const Sidebar = props => (
  <div className="list-group bg-white shadow sidebar" >
    <a
      href="#消息/面试"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${props.category === '面试' && 'text-primary'}`}
    >
      我的会话
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    <a
      href="#岗位/推送"
      className={`list-group-item list-group-item-action border-0 ${props.category === '推送' && 'text-primary'}` }
    >
      平台消息
      <span className="pull-right">
        <i className="fa fa-fw fa-angle-right"></i>
      </span>
    </a>
    {/* <a
      href="#岗位/咨询"
      className={`list-group-item list-group-item-action border-0 ${props.category === '咨询' && 'text-primary'}` }
    >
      咨询我的
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