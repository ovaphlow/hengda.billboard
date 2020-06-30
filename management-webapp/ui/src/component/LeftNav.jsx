import React from 'react';
import PropTypes from 'prop-types';

export default function LeftNav({ cat }) {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <a href="banner.html" className="nav-link text-reset text-decoration-none">
          BANNER
        </a>
      </li>
      <li className="nav-item">
        <a href="recommend.html" className="nav-link text-reset text-decoration-none">
          推荐信息
        </a>
      </li>
      <li className="nav-item">
        <a href="topic.html" className="nav-link text-reset text-decoration-none">
          热门话题
        </a>
      </li>
      <li className="nav-item">
        <a href="campus.html" className="nav-link text-reset text-decoration-none">
          校园招聘
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="enterprise-user.html" className="nav-link text-reset text-decoration-none">
          企业用户
        </a>
      </li>
      <li className="nav-item">
        <a href="common-user.html" className="nav-link text-reset text-decoration-none">
          个人用户
        </a>
      </li>
      <li className="nav-item">
        <a href="mis-user.html" className="nav-link text-reset text-decoration-none">
          平台用户
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="complaint.html" className="nav-link text-reset text-decoration-none">
          {cat === '投诉' ? (
            <strong>
              <i className="fa fa-fw fa-angle-right" />
              {cat}
              <i className="fa fa-fw fa-angle-left" />
            </strong>
          ) : <span>投诉</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="feedback.html" className="nav-link text-reset text-decoration-none">
          {cat === '意见反馈' ? (
            <strong>
              <i className="fa fa-fw fa-angle-right" />
              {cat}
              <i className="fa fa-fw fa-angle-left" />
            </strong>
          ) : <span>意见反馈</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="report.html" className="nav-link text-reset text-decoration-none">
          {cat === '举报' ? (
            <strong>
              <i className="fa fa-fw fa-angle-right" />
              {cat}
              <i className="fa fa-fw fa-angle-left" />
            </strong>
          ) : <span>举报</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="bulletin.html" className="nav-link text-reset text-decoration-none">
          {cat === '通知/公告' ? (
            <strong>
              <i className="fa fa-fw fa-angle-right" />
              {cat}
              <i className="fa fa-fw fa-angle-left" />
            </strong>
          ) : <span>通知/公告</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="setting-industry.html" className="nav-link text-reset text-decoration-none">
          {cat === '系统设定：行业' ? (
            <strong>
              <i className="fa fa-fw fa-angle-right" />
              {cat}
              <i className="fa fa-fw fa-angle-left" />
            </strong>
          ) : <span>系统设定：行业</span>}
        </a>
      </li>
    </ul>
  );
}

LeftNav.propTypes = {
  cat: PropTypes.string.isRequired,
};
