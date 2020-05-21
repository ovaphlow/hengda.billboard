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
          href="#平台内容/banner"
          className={`text-small list-group-item list-group-item-action ${category === 'banner' ? 'active' : ''}`}
        >
          BANNER
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#平台内容/推荐信息"
          className={`text-small list-group-item list-group-item-action ${category === '推荐信息' ? 'active' : ''}`}
        >
          推荐信息
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#平台内容/热门话题"
          className={`text-small list-group-item list-group-item-action ${category === '热门话题' ? 'active' : ''}`}
        >
          热门话题
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#平台内容/校园招聘"
          className={`text-small list-group-item list-group-item-action ${category === '校园招聘' ? 'active' : ''}`}
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
