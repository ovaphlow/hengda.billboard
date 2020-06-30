import React from 'react';
import PropTypes from 'prop-types';

import useMessageQty from '../useMessageQty';
import IconHome from '../icon/Home';
import IconMail from '../icon/Mail';
import IconProfile from '../icon/Profile';

export default function TopNav({ cat }) {
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
      <a href="home.html" className="navbar-brand">#TITLE#</a>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${cat === '首页' ? 'active' : ''}`}>
            <a href="home.html" className="nav-link">
              <IconHome />
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${cat === '当前用户' ? 'active' : ''}`}>
            <a href="current-user.html#/待处理" className="nav-link">
              <IconMail />
            </a>
          </li>

          <li className={`nav-item ${cat === '当前用户' ? 'active' : ''}`}>
            <a href="current-user.html#/待处理" className="nav-link">
              <IconProfile />
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

TopNav.propTypes = {
  cat: PropTypes.string.isRequired,
};
