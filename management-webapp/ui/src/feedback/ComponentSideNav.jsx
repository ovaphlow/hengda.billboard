import React from 'react';

export default function SideNav() {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#/投诉"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          投诉
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#/意见反馈"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          意见反馈
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#/举报"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          举报
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
