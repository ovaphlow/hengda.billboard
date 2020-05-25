import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function List({ enterprise_id, enterprise_uuid }) {
  const [data_list, setDataList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/enterprise-user/?enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`);
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setDataList(res.content);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-group">
      {data_list.map((it) => (
        <a
          key={it.id}
          href={`enterprise-user.html#/${it.id}?uuid=${it.uuid}&enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`}
          className="list-group-item list-group-item-dark list-group-item-action"
        >
          {it.name}
          <span className="pull-right text-muted">{it.username}</span>
        </a>
      ))}
    </div>
  );
}

List.propTypes = {
  enterprise_id: PropTypes.string.isRequired,
  enterprise_uuid: PropTypes.string.isRequired,
};
