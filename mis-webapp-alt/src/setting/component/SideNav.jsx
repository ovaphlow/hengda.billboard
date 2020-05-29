import React from 'react';

export default function SideNav() {
  return (
    <div className="list-group">
      <h6 className="text-light">
        <strong><em>选择功能</em></strong>
      </h6>

      <a href="#/通知公告" className="text-small list-group-item list-group-item-dark list-group-item-action">
        通知/公告
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>

      <a
        href="#/院校"
        className="text-small list-group-item list-group-item-dark list-group-item-action"
      >
        院校
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>

      <a
        href="#/行业"
        className="text-small list-group-item list-group-item-dark list-group-item-action"
      >
        行业
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>
    </div>
  );
}
