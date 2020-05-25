import React from 'react';

export default function SideNav() {
  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#/banner"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          BANNER
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#/推荐信息"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          推荐信息
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#/热门话题"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          热门话题
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#/校园招聘"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          校园招聘
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
