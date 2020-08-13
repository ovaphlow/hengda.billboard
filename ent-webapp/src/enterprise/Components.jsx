import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#/我的/信息"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '企业信息' && 'text-primary'
      }`}
    >
      企业信息
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/我的/用户"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '用户信息' && 'text-primary'
      }`}
    >
      用户信息
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/我的/投诉"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '投诉' && 'text-primary'
      }`}
    >
      意见反馈/投诉
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/我的/修改密码"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '修改密码' && 'text-primary'
      }`}
    >
      修改密码
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/登录"
      className="list-group-item list-group-item-action border-0 font-weight-bold text-danger"
    >
      退出登录
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
  </div>
);

Sidebar.propTypes = {
  category: PropTypes.string.isRequired,
};

export const View = ({ category, children }) => (
  <div className="row px-5 mt-4">
    <div className="col-md-2 ">
      <Sidebar category={category} />
    </div>
    <div className="col-md-10">{children}</div>
  </div>
);

View.propTypes = {
  children: PropTypes.element.isRequired,
  category: PropTypes.string.isRequired,
};
