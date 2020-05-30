import React from 'react';

import useMessageQty from '../useMessageQty';

export default function SideNav() {
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });

  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="user.html#/平台用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          平台用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="user.html#/企业用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          企业用户
          {message_qty > 0 && (
            <small>
              &nbsp;
              <span className="badge badge-pill badge-danger">{message_qty}</span>
            </small>
          )}
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="user.html#/普通用户"
          className="text-small list-group-item list-group-item-dark list-group-item-action"
        >
          普通用户
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
