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
          href="#投诉及反馈/投诉"
          className={`text-small list-group-item list-group-item-action ${category === '投诉' ? 'active' : ''}`}
        >
          投诉
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#投诉及反馈/意见反馈"
          className={`text-small list-group-item list-group-item-action ${category === '意见反馈' ? 'active' : ''}`}
        >
          意见反馈
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
