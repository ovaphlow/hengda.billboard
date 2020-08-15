import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faEdit,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ComponentCertificateList() {
  const [list, setList] = useState([]);
  const [filter_name, setFilterName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await window.fetch("/api/enterprise/certificate/");
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch("/api/enterprise/certificate/filter/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: filter_name }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  const handleCertificate = async (event) => {
    if (!window.confirm("确定对该企业的信息核实完毕，并进行认证吗？")) return;
    const response = await window.fetch("/api/enterprise/certificate/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: event.target.getAttribute("data-id"),
        uuid: event.target.getAttribute("data-uuid"),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload(true);
  };

  return (
    <div className="card bg-dark shadow">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">企业名称</span>
              </div>
              <input
                type="text"
                value={filter_name}
                aria-label="企业名称"
                className="form-control"
                onChange={(event) => setFilterName(event.target.value)}
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

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  window.location.reload(true);
                }}
              >
                <FontAwesomeIcon icon={faSyncAlt} fixedWidth size="lg" />
                重置
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th className="text-right">序号</th>
              <th>名称</th>
              <th>法人</th>
              <th className="text-right">操作</th>
            </tr>
          </thead>

          <tbody>
            {list.map((it) => (
              <tr key={it.id}>
                <td>
                  <a href={`enterprise.html#/${it.id}?uuid=${it.uuid}`}>
                    <FontAwesomeIcon icon={faEdit} fixedWidth size="lg" />
                  </a>
                  <span className="float-right">{it.id}</span>
                </td>
                <td>{it.name}</td>
                <td>{it.faren}</td>
                <td>
                  <div className="btn-group float-right">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      data-id={it.id}
                      data-uuid={it.uuid}
                      onClick={handleCertificate}
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        fixedWidth
                        size="lg"
                      />
                      认证
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
