import React from 'react';

export default function SideNav(props) {
  const { category } = props;

  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#系统设置/院校"
          className={`text-small list-group-item list-group-item-action ${category === '院校' ? 'active' : ''}`}
        >
          院校
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>

      <div>
        <a
          href="#系统设置/行业"
          className={`text-small list-group-item list-group-item-action ${category === '行业' ? 'active' : ''}`}
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
