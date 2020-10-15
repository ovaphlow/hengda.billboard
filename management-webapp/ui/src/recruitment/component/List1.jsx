import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function List1({ enterprise_id, enterprise_uuid }) {
  const [data_list, setDataList] = useState([]);
  const [min, setMin] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [max, setMax] = useState(moment().endOf("month").format("YYYY-MM-DD"));

  const handleFilter = async () => {
    const response = await window.fetch(
      `/api/enterprise/delivery/?uuid=${enterprise_uuid}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          enterprise_id: enterprise_id,
          min: min + "00:00",
          max: max + "23:59",
        }),
      }
    );
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setDataList(res.content);
  };

  return (
    <div className="card shadow bg-dark h-100 flex-grow-1">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">起始日期</span>
              </div>
              <input
                type="date"
                value={min}
                aria-label="起始日期"
                className="form-control"
                onChange={(event) => setMin(event.target.value)}
              />
            </div>
          </div>

          <div className="col">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">终止日期</span>
              </div>
              <input
                type="date"
                value={max}
                aria-label="终止日期"
                className="form-control"
                onChange={(event) => setMax(event.target.value)}
              />
            </div>
          </div>

          <div className="col-auto">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-info"
                onClick={handleFilter}
              >
                查询
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-dark table-striped">
          <caption>投递的简历</caption>
          <thead>
            <tr>
              <th>简历</th>
              <th>岗位</th>
              <th>日期</th>
              <th>状态</th>
            </tr>
          </thead>

          <tbody>
            {data_list.map((it) => (
              <tr key={it.id}>
                <td>{it.resume_name}</td>
                <td>{it.recruitment_name}</td>
                <td>{it.datime}</td>
                <td>{it.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

List1.propTypes = {
  enterprise_id: PropTypes.string.isRequired,
  enterprise_uuid: PropTypes.string,
};

List1.defaultProps = {
  enterprise_uuid: undefined,
};
