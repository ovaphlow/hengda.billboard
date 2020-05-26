import React from 'react';

export default function SideNav() {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="user.html#/平台用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          平台用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="user.html#/企业用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          企业用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="user.html#/普通用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          普通用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
