import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import TopNav from "../component/TopNav";
import LeftNav from "../component/LeftNav";
import BottomNav from "../component/BottomNav";
import useAuth from "../useAuth";

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const [data_list, setDataList] = useState([]);
  const [title, setTitle] = useState("");
  const [datime, setDatime] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (component_option === "编辑") {
      const response = await window.fetch(
        `/api/job-fair/${id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title,
            datime,
            status,
            content
          }),
        }
      );
      if (response.status === 500) {
        window.alert('服务器错误');
        return;
      }
      window.history.go(-1);
    } else {
      const response = await window.fetch(
        `/api/job-fair/`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title,
            datime,
            status,
            content
          }),
        }
      );
      if (response.status === 500) {
        window.alert('服务器错误');
        return;
      }
      window.history.go(-1);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm("确定要删除当前数据？")) return;
    const response = await window.fetch(
      `/api/job-fair/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 500) {
      window.alert('服务器错误');
      return;
    }
    window.history.go(-1);
  };

  useEffect(() => {
    if (component_option === "编辑") {
      (async () => {
        const response = await fetch(
          `/api/job-fair/${id}`
        );
        const res = await response.json();
        setTitle(res.title);
        setDatime(res.datime);
        setStatus(res.status);
        setContent(res.content);
      })();

      (async () => {
        const response = await window.fetch(
          `/api/recruitment?category=job-fair`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              job_fair_id: id
            }),
          }
        );
        const res = await response.json();
        setDataList(res)
      })();

    } else {
      setStatus('停用')
      setDatime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }
  }, []);

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
                <LeftNav component_option="线上招聘会" />
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
                  <span className="h1">线上招聘会</span>
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
                      <li className="breadcrumb-item">
                        <a
                          href="enterprise-user"
                          className="text-reset text-decoration-none"
                        >
                          线上招聘会
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {component_option}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">标题</label>
                      <input
                        type="text"
                        value={title || ""}
                        className="form-control input-underscore"
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">预计召开时间</label>
                      <input
                        type="datetime-local"
                        value={datime || ""}
                        className="form-control input-underscore"
                        onChange={(event) => setDatime(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">状态</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="status"
                          checked={status === "启用"}
                          onChange={(event) =>
                            event.target.checked
                              ? setStatus("启用")
                              : setStatus("停用")
                          }
                        />
                        <label htmlFor="status" className="form-check-label">
                          启用
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">简介</label>
                      <ReactQuill
                        formats={[
                          "header",
                          "align",
                          "bold",
                          "italic",
                          "underline",
                          "blockquote",
                          "link",
                          "image",
                        ]}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [{ align: [] }],
                            ["bold", "italic", "underline", "blockquote"],
                            ["link", "image"],
                          ],
                        }}
                        placeholder="请填写内容"
                        value={content || ""}
                        onChange={setContent}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          window.history.go(-1);
                        }}
                      >
                        返回
                      </button>
                    </div>

                    <div className="btn-group float-right">
                      {component_option === "编辑" && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleRemove}
                        >
                          删除
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>
                {
                  component_option === "编辑" ? (
                    <div className="card bg-dark shadow mt-3">
                      <div className="card-header">
                        <span className="lead">已参会岗位</span>
                      </div>

                      <div className="card-body">
                        <table className="table table-dark table-striped">
                          <caption>已参会岗位</caption>
                          <thead>
                            <tr>
                              <th>序号</th>
                              <th>日期</th>
                              <th>岗位</th>
                              <th>人数</th>
                              <th>学历</th>
                              <th>地址</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data_list.map((it) => (
                              <tr key={it.id}>
                                <td className="text-right">
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
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ):(<></>)
                }
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

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
