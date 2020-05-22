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
          href="#当前用户/修改密码"
          className={`text-small list-group-item list-group-item-action ${category === '修改密码' ? 'active' : ''}`}
        >
          修改密码
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
