import React from 'react';

export default function SideNav() {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#/院校"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          院校
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>

      <div>
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
    </div>
  );
}
