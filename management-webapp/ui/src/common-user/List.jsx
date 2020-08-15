import React, { useState } from "react";

import TopNav from "../component/TopNav";
import LeftNav from "../component/LeftNav";
import BottomNav from "../component/BottomNav";
import useAuth from "../useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSyncAlt,
  faEdit,
  faEnvelope,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function List() {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [filter_name, setFilterName] = useState("");

  const handleFilter = async () => {
    setData([]);
    const response = await window.fetch("/api/common-user/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ filter_name }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setData(res.content);
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="个人用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => {
                        window.history.go(-1);
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">个人用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a
                          href="home.html"
                          className="text-reset text-decoration-none"
                        >
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">个人用户</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">姓名/电话</span>
                          </div>

                          <input
                            type="text"
                            value={filter_name}
                            aria-label="企业名称"
                            className="form-control"
                            onChange={(event) =>
                              setFilterName(event.target.value)
                            }
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
                            <FontAwesomeIcon
                              icon={faSearch}
                              fixedWidth
                              size="lg"
                            />
                            查询
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              window.reload(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSyncAlt}
                              fixedWidth
                              size="lg"
                            />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    <table className="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>用户</th>
                          <th>EMAIL</th>
                          <th>电话</th>
                          <th>收藏</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <a
                                href={`#/${it.id}?uuid=${it.uuid}`}
                                className="float-left"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  fixedWidth
                                  size="lg"
                                />
                              </a>
                              <span className="float-right">{it.id}</span>
                            </td>
                            <td>{it.name}</td>
                            <td>
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                fixedWidth
                                size="lg"
                              />
                              {it.email}
                            </td>
                            <td>
                              <FontAwesomeIcon
                                icon={faMobileAlt}
                                fixedWidth
                                size="lg"
                              />
                              {it.phone}
                            </td>
                            <td>{it.qty_favorite}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
