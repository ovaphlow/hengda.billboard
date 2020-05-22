import React from 'react';

export default function Navbar(props) {
  const { category } = props;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top title-color" style={{ marginTop: '-8px' }}>
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            <a href="#投诉及反馈/投诉" className="nav-link">
              投诉及反馈
            </a>
          </li>

          <li className={`nav-item ${category === '举报' ? 'active' : ''}`}>
            <a href="#举报" className="nav-link">
              举报
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${category === '系统设置' ? 'active' : ''}`}>
            <a href="#系统设置/院校" className="nav-link text-dark">
              <i className="fa fa-fw fa-cogs" />
              系统设置
            </a>
          </li>

          <li className={`nav-item ${category === '当前用户' ? 'active' : ''}`}>
            <a href="#当前用户/修改密码" className="nav-link text-dark">
              <i className="fa fa-fw fa-user-o" />
              当前用户
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
