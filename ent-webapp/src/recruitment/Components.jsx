import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#岗位/列表"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '我的职位' && 'text-primary'
      }`}
    >
      我的岗位
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
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export const View1 = ({ category, children }) => (
  <div className="row px-5 mt-4">
    <div className="col-md-2 ">
      <Sidebar category={category} />
    </div>
    <div className="col-md-10">{children}</div>
  </div>
);

View1.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
