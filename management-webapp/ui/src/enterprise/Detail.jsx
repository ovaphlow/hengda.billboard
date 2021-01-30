import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { YUAN_GONG_SHU_LIANG } from "../constant";
import TopNav from "../component/TopNav";
import LeftNav from "../component/LeftNav";
import BottomNav from "../component/BottomNav";
import IndustryPicker from "../component/IndustryPicker";
import RecruitmentList from "../recruitment/component/List";
import RecruitmentList1 from "../recruitment/component/List1";
import useAuth from "../useAuth";

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState("");
  const [name, setName] = useState("");
  const [yingyezhizhao, setYingyezhizhao] = useState("");
  const [yingyezhizhao_tu, setYingyezhizhaoTu] = useState("");
  const [faren, setFaren] = useState("");
  const [zhuceriqi, setZhuceriqi] = useState("");
  const [zhuziguimo, setZhuziguimo] = useState("");
  const [yuangongshuliang, setYuangongshuliang] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [intro, setIntro] = useState("");
  const [url, setUrl] = useState("");

  const handleRemove = async () => {
    if (!window.confirm("确定删除当前数据？")) return;
    const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    const data = {
      name,
      yingyezhizhao,
      faren,
      zhuceriqi,
      zhuziguimo,
      yuangongshuliang,
      address1,
      address2,
      address3,
      address4,
      industry,
      phone,
      intro,
      url,
    };

    if (component_option === "新增") {
      const response = await window.fetch("/api/enterprise/", {
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
        `/api/enterprise/${id}?uuid=${uuid}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({}),
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
  });

  useEffect(() => {
    if (uuid) {
      (async () => {
        const response = await fetch(`/api/enterprise/${id}?uuid=${uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setYingyezhizhao(res.content.yingyezhizhao);
        setYingyezhizhaoTu(res.content.yingyezhizhao_tu);
        setFaren(res.content.faren);
        setZhuceriqi(res.content.zhuceriqi);
        setZhuziguimo(res.content.zhuziguimo);
        setYuangongshuliang(res.content.yuangongshuliang);
        setAddress1(res.content.address1);
        setAddress2(res.content.address2);
        setAddress3(res.content.address3);
        setAddress4(res.content.address4);
        setIndustry(res.content.industry);
        setPhone(res.content.phone);
        setIntro(res.content.intro);
        setUrl(res.content.url);
      })();
    }
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
                <LeftNav component_option="企业用户" />
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
                  <span className="h1">企业</span>
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
                          href="enterprise-user.html"
                          className="text-reset text-decoration-none"
                        >
                          企业用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">企业</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">名称</label>
                          <input
                            type="text"
                            value={name || ""}
                            className="form-control input-underscore"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">法人</label>
                          <input
                            type="text"
                            value={faren || ""}
                            className="form-control input-underscore"
                            onChange={(event) => setFaren(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">营业执照</label>
                          <input
                            type="text"
                            value={yingyezhizhao || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setYingyezhizhao(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">注册日期</label>
                          <input
                            type="text"
                            value={zhuceriqi || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setZhuceriqi(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">注资规模</label>
                          <input
                            type="text"
                            value={zhuziguimo || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setZhuziguimo(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">员工数量</label>
                          <select
                            value={yuangongshuliang}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setYuangongshuliang(event.target.value)
                            }
                          >
                            <option value="未选择">未选择</option>
                            {YUAN_GONG_SHU_LIANG.map((it) => (
                              <option
                                key={YUAN_GONG_SHU_LIANG.indexOf(it)}
                                value={it}
                              >
                                {it}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">地址</label>
                          <input
                            type="text"
                            value={address1 || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setAddress1(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <input
                            type="text"
                            value={address2 || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setAddress2(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <input
                            type="text"
                            value={address3 || ""}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              setAddress3(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label />
                      <input
                        type="text"
                        value={address4 || ""}
                        className="form-control input-underscore"
                        onChange={(event) => setAddress4(event.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <IndustryPicker
                          caption="所属行业"
                          value={industry || ""}
                          onChange={(event) => setIndustry(event.target.value)}
                        />
                      </div>
                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">电话号码</label>
                          <input
                            type="text"
                            value={phone}
                            className="form-control input-underscore"
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">网址</label>
                          <input
                            type="text"
                            value={url}
                            placeholder="https://"
                            className="form-control input-underscore"
                            onChange={(event) => setUrl(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">简介</label>
                      <textarea
                        rows="5"
                        value={intro}
                        className="form-control input-underscore"
                        onChange={(event) => setIntro(event.target.value)}
                      />
                    </div>

                    <p className="text-muted text-center">
                      营业执照
                      <br />
                      <img
                        src={yingyezhizhao_tu}
                        className="img-fluid"
                        alt={name}
                      />
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
                        style={{ display: "none" }}
                        onClick={handleSubmit}
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">发布的岗位</div>
                  <div className="card-body">
                    <RecruitmentList
                      enterprise_id={id}
                      enterprise_uuid={uuid}
                    />
                  </div>
                </div>
                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">收到的简历</div>
                  <div className="card-body">
                    <RecruitmentList1
                      enterprise_id={id}
                      enterprise_uuid={uuid}
                    />
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
