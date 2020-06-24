import React, { useState, useEffect } from 'react';

export default function SideNav(props) {
  const { category } = props;
  const [qty, setQty] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/qty');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setQty(res.content.qty);
    })();
  }, []);

  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#企业"
          className={`text-small list-group-item list-group-item-action ${category === '列表' ? 'active' : ''}`}
        >
          企业列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#企业/待认证"
          className={`text-small list-group-item list-group-item-action ${category === '待认证' ? 'active' : ''}`}
        >
          待认证企业
          <span className="pull-right">
            {
              qty > 0 && (
                <>
                  <span className="badge badge-pill badge-danger">{qty}</span>
                  &nbsp;
                </>
              )
            }
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}
