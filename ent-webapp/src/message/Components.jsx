import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#消息/会话"
      className={`list-group-item list-group-item-action border-0 ${
        category === '会话' && 'text-primary'
      }`}
    >
      我的会话
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#消息/邀请"
      className={`list-group-item list-group-item-action border-0 ${
        category === '邀请' && 'text-primary'
      }`}
    >
      面试邀请
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#消息/系统"
      className={`list-group-item list-group-item-action border-0 ${
        category === '系统' && 'text-primary'
      }`}
    >
      平台消息
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
  </div>
);

Sidebar.propTypes = {
  category: PropTypes.string.isRequired,
};

export const View = ({ totalFlg, category, children }) => (
  <>
    <Navbar category="消息" totalFlg={totalFlg} />
    <div className="row px-5 mt-4">
      <div className="col-md-2 ">
        <Sidebar category={category} />
      </div>
      <div className="col-md-10">{children}</div>
    </div>
  </>
);
View.propTypes = {
  category: PropTypes.string.isRequired,
  totalFlg: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

View.defaultProps = {
  totalFlg: undefined,
};
