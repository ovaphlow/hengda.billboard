import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { v5 as uuidv5 } from "uuid";

import TopNav from "../component/TopNav";
import LeftNav from "../component/LeftNav";
import BottomNav from "../component/BottomNav";
import IndustryPicker from "../component/IndustryPicker";
import EducationPicker from "../component/EducationPicker";
import {
  useAddressKeys,
  useAddressValues,
  useAddressLevel1ValueList,
} from "../useAddress";
import useAuth from "../useAuth";

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const address_keys = useAddressKeys();
  const address_values = useAddressValues();
  const address_level1_values = useAddressLevel1ValueList();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dday, setDday] = useState("");
  const [receiver, setReceiver] = useState("");
  const [address_level1, setAddressLevel1] = useState("");
  const [address_level2, setAddressLevel2] = useState("");
  const [industry, setIndustry] = useState("");
  const [education, setEducation] = useState("");

  const handleSave = async () => {
    if (!title || !content || !dday || !receiver) {
      window.alert("请完整填写所需信息");
      return;
    }

    let doc = {};
    if (receiver === "企业用户") {
      doc = {
        content,
        address_level1,
        address_level2,
        industry,
      };
    } else if (receiver === "个人用户") {
      doc = {
        content,
        address_level1,
        address_level2,
        education,
      };
    } else {
      window.alert("解析数据失败。");
      return;
    }

    const data = {
      uuid: uuidv5(`${title}-${dday}`, uuidv5.DNS),
      title,
      dday,
      receiver,
      doc: JSON.stringify(doc),
    };

    if (component_option === "新增") {
      const response = await window.fetch("/api/bulletin/", {
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
        `/api/bulletin/${id}?uuid=${new URLSearchParams(location.search).get(
          "uuid"
        )}`,
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
    setArr1(address_level1_values);
  }, []);

  useEffect(() => {
    const arr = [];
    setArr2(arr);
    for (let i = 0; i < address_values.length; i += 1) {
      if (address_values[i] === address_level1) {
        const code = address_keys[i];
        for (let j = 0; j < address_keys.length; j += 1) {
          if (
            address_keys[j].slice(0, 2) === code.slice(0, 2) &&
            address_keys[j].slice(-2) === "00"
          ) {
            if (address_keys[j].slice(-4) !== "0000")
              arr.push(address_values[j]);
          }
        }
        return;
      }
    }
    setArr2(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level1]);

  useEffect(() => {
    if (component_option === "编辑") {
      (async () => {
        const response = await window.fetch(
          `/api/bulletin/${id}?uuid=${new URLSearchParams(location.search).get(
            "uuid"
          )}`
        );
        const res = await response.json();
        setTitle(res.content.title);
        setDday(moment(res.content.dday).format("YYYY-MM-DD"));
        setReceiver(res.content.receiver);
        setContent(res.content.doc.content);
        setAddressLevel1(res.content.doc.address_level1);
        setAddressLevel2(res.content.doc.address_level2);
        setIndustry(res.content.doc.industry);
        setEducation(res.content.doc.education);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <LeftNav component_option="通知/公告" />
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
                  <span className="h1">通知 公告</span>
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
                          href="bulletin.html"
                          className="text-reset text-decoration-none"
                        >
                          通知/公告
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {component_option}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">标题</label>
                          <input
                            type="text"
                            value={title}
                            className="form-control input-underscore"
                            onChange={(event) => setTitle(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <label className="form-label">有效期</label>
                        <input
                          type="date"
                          value={dday}
                          className="form-control input-underscore"
                          onChange={(event) => setDday(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">内容</label>
                      <textarea
                        value={content}
                        rows="3"
                        className="form-control input-underscore"
                        onChange={(event) => setContent(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">发送对象</label>
                      <select
                        value={receiver}
                        className="form-control input-underscore"
                        onChange={(event) => setReceiver(event.target.value)}
                      >
                        <option value="">未选择</option>
                        <option value="企业用户">企业用户</option>
                        <option value="个人用户">个人用户</option>
                      </select>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">地址</label>
                          <select
                            value={address_level1}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setAddressLevel1(event.target.value)
                            }
                          >
                            <option value="">不限</option>
                            {arr1.map((it) => (
                              <option key={arr1.indexOf(it)} value={it}>
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">&nbsp;</label>
                            <select
                              value={address_level2}
                              className="form-control input-underscore"
                              onChange={(event) =>
                                setAddressLevel2(event.target.value)
                              }
                            >
                              <option value="">不限</option>
                              {arr2.map((it) => (
                                <option key={arr2.indexOf(it)} value={it}>
                                  {it}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {receiver === "企业用户" && (
                        <div className="col">
                          <IndustryPicker
                            caption="行业"
                            value={industry}
                            onChange={(event) =>
                              setIndustry(event.target.value)
                            }
                          />
                        </div>
                      )}

                      {receiver === "个人用户" && (
                        <EducationPicker
                          caption="学历"
                          value={education}
                          onChange={(event) => setEducation(event.target.value)}
                        />
                      )}
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
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
