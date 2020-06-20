import React, { useEffect, useState } from 'react';

export default function List(props) {
  const { enterprise_id, enterprise_uuid } = props;
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
      {
        data_list.map((it) => (
          <a href={`#企业用户/${it.id}?uuid=${it.uuid}&enterprise_id=${props.enterprise_id}&enterprise_uuid=${props.enterprise_uuid}`} className="list-group-item list-group-item-action" key={it.id}>
            {it.name}
            <span className="pull-right text-muted">{it.username}</span>
          </a>
        ))
      }
    </div>
  );
}
