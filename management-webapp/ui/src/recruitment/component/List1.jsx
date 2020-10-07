import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function List1({ enterprise_id, enterprise_uuid }) {
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
      <caption>投递的简历</caption>
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>简历</th>
          <th>岗位</th>
          <th>日期</th>
          <th className="text-right">状态</th>
        </tr>
      </thead>

      <tbody>
        {data_list.map((it) => (
          <tr key={it.id}>
            <td className="text-right">{it.id}</td>
            <td>
              <a href={`resume.html#/${it.resume_id}?uuid=${it.resume_uuid}`}>
                {it.resume_name}
              </a>
            </td>
            <td>
              <a
                href={`recruitment.html#/${it.recruitment_id}?uuid=${it.recruitment_uuid}`}
              >
                {it.recruitment_name}
              </a>
            </td>
            <td>{it.datime}</td>
            <td className="text-right">{it.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

List1.propTypes = {
  enterprise_id: PropTypes.string.isRequired,
  enterprise_uuid: PropTypes.string,
};

List1.defaultProps = {
  enterprise_uuid: undefined,
};
