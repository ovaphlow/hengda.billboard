import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function DataList({ enterprise_id, enterprise_uuid }) {
  const [data_list, setDataList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/recruitment/?enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`);
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
      {
        data_list.map((it) => (
          <a
            href={`#岗位/${it.id}?uuid=${it.uuid}`}
            className="list-group-item list-group-item-action"
            key={it.id}
          >
            {it.name}
            <span className="float-right text-muted">{it.qty}</span>
          </a>
        ))
      }
    </div>
  );
}

DataList.propTypes = {
  enterprise_id: PropTypes.number.isRequired,
  enterprise_uuid: PropTypes.string.isRequired,
};
