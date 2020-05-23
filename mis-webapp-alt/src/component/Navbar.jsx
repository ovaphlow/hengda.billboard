import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ category }) {
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
            <a href="#/" className="nav-link">
              <i className="fa fa-fw fa-home" />
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${category === '平台内容' ? 'active' : ''}`}>
            <a href="#平台内容/banner" className="nav-link">
              平台内容
            </a>
          </li>

          <li className={`nav-item ${category === '管理端用户' ? 'active' : ''}`}>
            <a href="#管理端用户" className="nav-link">
              管理端用户
            </a>
          </li>

          <li className={`nav-item ${category === '企业' ? 'active' : ''}`}>
            <a href="#企业" className="nav-link">
              企业
            </a>
          </li>

          <li className={`nav-item ${category === '普通用户' ? 'active' : ''}`}>
            <a href="#普通用户" className="nav-link">
              普通用户
            </a>
          </li>

          <li className={`nav-item ${category === '投诉及反馈' ? 'active' : ''}`}>
            <a href="feedback.html#/投诉" className="nav-link">
              投诉及反馈
            </a>
          </li>

          <li className={`nav-item ${category === '举报' ? 'active' : ''}`}>
            <a href="report.html#/举报" className="nav-link">
              举报
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${category === '系统设置' ? 'active' : ''}`}>
            <a href="setting.html#/院校" className="nav-link">
              <i className="fa fa-fw fa-cogs" />
              系统设置
            </a>
          </li>

          <li className={`nav-item ${category === '当前用户' ? 'active' : ''}`}>
            <a href="current-user.html#/修改密码" className="nav-link">
              <i className="fa fa-fw fa-user-o" />
              当前用户
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
