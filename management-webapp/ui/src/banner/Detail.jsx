import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import TopNav from "../component/TopNav";
import LeftNav from "../component/LeftNav";
import BottomNav from "../component/BottomNav";
import { BANNER_CATEGORY } from "../constant";
import useAuth from "../useAuth";

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [data_url, setDataUrl] = useState("");

  const convertImg2Data = (event) => {
    if (!event.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setDataUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleRemove = async () => {
    if (!window.confirm("确定要删除当前数据？")) return;
    const response = await window.fetch(
      `/api/content/banner/${id}?uuid=${uuid}`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    if (!title || !comment || !data_url) {
      window.alert("请完整填写所需信息");
      return;
    }

    const data = {
      status,
      category,
      title,
      comment,
      datime: moment().format("YYYY-MM-DD HH:mm:ss"),
      data_url,
    };

    if (component_option === "新增") {
      const response = await window.fetch("/api/content/banner/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (component_option === "编辑") {
      const response = await window.fetch(
        `/api/content/banner/${id}?uuid=${uuid}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  useEffect(() => {
    if (component_option === "编辑") {
      setUUID(new URLSearchParams(location.search).get("uuid"));
    }
  }, []);

  useEffect(() => {
    if (!uuid) return;
    (async () => {
      const response = await window.fetch(
        `/api/content/banner/${id}?uuid=${uuid}`
      );
      const res = await response.json();
      setStatus(res.content.status);
      setCategory(res.content.category);
      setTitle(res.content.title);
      setComment(res.content.comment);
      setDataUrl(res.content.data_url);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

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
                <LeftNav component_option="BANNER" />
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
                  <span className="h1">BANNER</span>
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
                          href="banner.html"
                          className="text-reset text-decoration-none"
                        >
                          BANNER
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {component_option}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="form-file">
                      <input
                        type="file"
                        className="form-file-input input-underscore"
                        id="file"
                        onChange={convertImg2Data}
                      />
                      <label className="form-file-label" htmlFor="file">
                        <span className="form-file-text">选择文件</span>
                        <span className="form-file-button">浏览</span>
                      </label>
                    </div>
                  </div>

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
                      <label className="form-label">内容</label>
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
                        value={comment || ""}
                        onChange={setComment}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">类别</label>
                      <select
                        value={category || ""}
                        className="form-control input-underscore"
                        onChange={(event) => setCategory(event.target.value)}
                      >
                        <option value="">未选择</option>
                        {BANNER_CATEGORY.map((it) => (
                          <option key={BANNER_CATEGORY.indexOf(it)} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
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
                              : setStatus("未启用")
                          }
                        />
                        <label htmlFor="status" className="form-check-label">
                          启用
                        </label>
                      </div>
                    </div>

                    <hr />

                    <p className="text-muted text-center">
                      预览
                      <br />
                      <img src={data_url} alt={title} className="img-fluid" />
                    </p>
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
