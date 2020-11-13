import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#/操作手册/注册"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '注册' && 'text-primary'
      }`}
    >
      注册/登录
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/操作手册/企业认证"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '认证' && 'text-primary'
      }`}
    >
      企业认证操作
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
  category: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

