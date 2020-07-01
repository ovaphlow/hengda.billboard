import React from 'react';
import PropTypes from 'prop-types';

import IconChevronLeft from '../icon/ChevronLeft';
import IconChevronRight from '../icon/ChevronRight';

export default function LeftNav({ component_option }) {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <a href="banner.html" className="nav-link text-reset text-decoration-none">
          {component_option === 'BANNER' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>BANNER</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="recommend.html" className="nav-link text-reset text-decoration-none">
          {component_option === '推荐信息' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>推荐信息</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="topic.html" className="nav-link text-reset text-decoration-none">
          {component_option === '热门话题' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>热门话题</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="campus.html" className="nav-link text-reset text-decoration-none">
          {component_option === '校园招聘' ? (
            <strong>
              <IconChevronRight />
              {cat}
              <IconChevronLeft />
            </strong>
          ) : <span>校园招聘</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="enterprise-user.html" className="nav-link text-reset text-decoration-none">
          {component_option === '企业用户' ? (
            <strong>
              <IconChevronRight />
              {cat}
              <IconChevronLeft />
            </strong>
          ) : <span>企业用户</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="common-user.html" className="nav-link text-reset text-decoration-none">
          {component_option === '个人用户' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>个人用户</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="staff.html" className="nav-link text-reset text-decoration-none">
          {component_option === '平台用户' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>平台用户</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="complaint.html" className="nav-link text-reset text-decoration-none">
          {component_option === '投诉' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>投诉</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="feedback.html" className="nav-link text-reset text-decoration-none">
          {component_option === '意见反馈' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>意见反馈</span>}
        </a>
      </li>
      <li className="nav-item">
        <a href="report.html" className="nav-link text-reset text-decoration-none">
          {component_option === '举报' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>举报</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="bulletin.html" className="nav-link text-reset text-decoration-none">
          {component_option === '通知/公告' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>通知/公告</span>}
        </a>
      </li>
      <hr />
      <li className="nav-item">
        <a href="setting-industry.html" className="nav-link text-reset text-decoration-none">
          {component_option === '系统设定：行业' ? (
            <strong>
              <IconChevronRight />
              {component_option}
              <IconChevronLeft />
            </strong>
          ) : <span>系统设定：行业</span>}
        </a>
      </li>
    </ul>
  );
}

LeftNav.propTypes = {
  component_option: PropTypes.string.isRequired,
};
