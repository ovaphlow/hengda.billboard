import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function List({ enterprise_id, enterprise_uuid }) {
  const [data_list, setDataList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch(
        `/api/recruitment/?enterprise_id=${enterprise_id}&enterprise_uuid=${enterprise_uuid}`
      );
      const res = await response.json();
      setDataList(res.content);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className="table table-dark table-striped">
      <caption>岗位</caption>
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>日期</th>
          <th>岗位</th>
          <th>人数</th>
          <th>学历</th>
          <th>地址</th>
          <th className="text-right">状态</th>
        </tr>
      </thead>

      <tbody>
        {data_list.map((it) => (
          <tr key={it.id}>
            <td className="text-right">
              <span className="float-left">
                <a href={`recruitment.html#/${it.id}?uuid=${it.uuid}`}>
                  <FontAwesomeIcon icon={faEdit} fixedWidth size="lg" />
                </a>
              </span>
              {it.id}
            </td>
            <td>{it.date}</td>
            <td>{it.name}</td>
            <td>{it.qty}</td>
            <td>{it.education}</td>
            <td>
              <ul className="list-inline">
                <li className="list-inline-item">{it.address1}</li>
                <li className="list-inline-item">{it.address2}</li>
                <li className="list-inline-item">{it.address3}</li>
              </ul>
            </td>
            <td className="text-right">{it.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

List.propTypes = {
  enterprise_id: PropTypes.string.isRequired,
  enterprise_uuid: PropTypes.string,
};

List.defaultProps = {
  enterprise_uuid: undefined,
};
