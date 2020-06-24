import React from 'react';
import PropTypes from 'prop-types';

import useMessageQty from '../useMessageQty';

export default function Navbar({ category }) {
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });

  return (
    <nav className="navbar navbar-expand navbar-dark fix-top sticky-top bg-dark">
      <a href="home.html" className="navbar-brand">#TITLE#</a>
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="切换导航"
        className="navbar-toggler"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${category === '首页' ? 'active' : ''}`}>
            <a href="home.html#/" className="nav-link">
              <i className="fa fa-fw fa-home" />
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${category === 'BANNER' ? 'active' : ''}`}>
            <a href="banner.html#/" className="nav-link">
              BANNER
            </a>
          </li>

          <li className={`nav-item ${category === '推荐信息' ? 'active' : ''}`}>
            <a href="recommend.html#/" className="nav-link">
              推荐信息
            </a>
          </li>

          <li className={`nav-item ${category === '热门话题' ? 'active' : ''}`}>
            <a href="topic.html#/" className="nav-link">
              热门话题
            </a>
          </li>

          <li className={`nav-item ${category === '校园招聘' ? 'active' : ''}`}>
            <a href="campus.html#/" className="nav-link">
              校园招聘
            </a>
          </li>

          <li className={`nav-item ${category === '用户' ? 'active' : ''}`}>
            <a href="user.html#/平台用户" className="nav-link">
              <i className="fa fa-fw fa-users" />
              用户
            </a>
          </li>

          <li className={`nav-item ${category === '投诉反馈举报' ? 'active' : ''}`}>
            <a href="feedback.html#/投诉" className="nav-link">
              投诉、意见反馈及举报
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${category === '系统设置' ? 'active' : ''}`}>
            <a href="setting.html#/通知公告" className="nav-link">
              <i className="fa fa-fw fa-cogs" />
              系统设置
            </a>
          </li>

          <li className={`nav-item ${category === '当前用户' ? 'active' : ''}`}>
            <a href="current-user.html#/待处理" className="nav-link">
              <i className="fa fa-fw fa-user-o" />
              当前用户
              {message_qty > 0 && (
                <small>
                  &nbsp;
                  <span className="badge badge-pill badge-danger">{message_qty}</span>
                </small>
              )}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  category: PropTypes.string.isRequired,
};
