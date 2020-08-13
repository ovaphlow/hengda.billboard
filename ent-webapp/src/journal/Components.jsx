import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#记录/登录"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '登录' && 'text-primary'
      }`}
    >
      登录记录
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#记录/操作"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '操作' && 'text-primary'
      }`}
    >
      操作记录
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#记录/举报"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '举报' && 'text-primary'
      }`}
    >
      举报记录
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#记录/投诉"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '投诉' && 'text-primary'
      }`}
    >
      (意见反馈/投诉)记录
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
  children: PropTypes.element.isRequired,
};
