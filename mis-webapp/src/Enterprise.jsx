import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router, Switch, Route, useParams, useLocation,
} from 'react-router-dom';

import {
  Title, Navbar, InputRowField, BackwardButton, RefreshButton,
} from './Components';
import { YUAN_GONG_SHU_LIANG } from './constant';
import { List as EnterpriseUserList } from './EnterpriseUser';
import { DataList as RecruitmentDataList } from './Recruitment';

export default function EnterpriseRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/企业"><List /></Route>
        <Route exact path="/企业/待认证"><CertificateList /></Route>
        <Route exact path="/企业/新增"><Detail category="新增" /></Route>
        <Route exact path="/企业/:id"><Detail category="编辑" /></Route>
        <Route path="/企业/:id/新增用户"><UserDetail category="新增" /></Route>
        <Route path="/企业/:id/编辑用户/:user_id"><UserDetail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}

export function SideNav(props) {
  const { category } = props;
  const [qty, setQty] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/qty');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setQty(res.content.qty);
    })();
  }, []);

  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#企业"
          className={`text-small list-group-item list-group-item-action ${category === '列表' ? 'active' : ''}`}
        >
          企业列表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#企业/待认证"
          className={`text-small list-group-item list-group-item-action ${category === '待认证' ? 'active' : ''}`}
        >
          待认证企业
          <span className="pull-right">
            {
              qty > 0 && (
                <>
                  <span className="badge badge-pill badge-danger">{qty}</span>
                  &nbsp;
                </>
              )
            }
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}

function List() {
  const [data, setData] = useState([]);
  const [filter_name, setFilterName] = useState('');

  const handleFilter = async () => {
    const response = await window.fetch('/api/enterprise/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
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
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="列表" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>企业列表</h3>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="col row">
                    <div className="input-group col">
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

                  <div className="col-3">
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>状态</th>
                      <th>法人</th>
                      <th>员工数量</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map((it) => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#企业/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>
                            {
                              it.status === '未认证' ? (
                                <span className="text-danger">{it.status}</span>
                              ) : (
                                <>{it.status}</>
                              )
                            }
                          </td>
                          <td>{it.faren}</td>
                          <td>{it.yuangongshuliang}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CertificateList() {
  const [list, setList] = useState([]);
  const [filter_name, setFilterName] = useState('');

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/enterprise/certificate/filter/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
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
    if (!window.confirm('确定对该企业的信息核实完毕，并进行认证吗？')) return;
    const response = await window.fetch('/api/enterprise/certificate/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        uuid: event.target.getAttribute('data-uuid'),
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
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="待认证" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>待认证企业</h3>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <div className="form-row align-items-center">
                  <div className="col-auto">
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
                      <button type="button" className="btn btn-outline-info" onClick={handleFilter}>
                        查询
                      </button>

                      <RefreshButton caption="重置" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>法人</th>
                      <th className="text-right">操作</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      list.map((it) => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#企业/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.faren}</td>
                          <td>
                            <div className="btn-group pull-right">
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm"
                                data-id={it.id}
                                data-uuid={it.uuid}
                                onClick={handleCertificate}
                              >
                                <i className="fa fa-fw fa-check" data-id={it.id} data-uuid={it.uuid} />
                                认证
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Detail(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [yingyezhizhao, setYingyezhizhao] = useState('');
  const [yingyezhizhao_tu, setYingyezhizhaoTu] = useState('');
  const [faren, setFaren] = useState('');
  const [zhuceriqi, setZhuceriqi] = useState('');
  const [zhuziguimo, setZhuziguimo] = useState('');
  const [yuangongshuliang, setYuangongshuliang] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [address4, setAddress4] = useState('');

  useEffect(() => {
    if (props.category === '编辑') {
      (async () => {
        const t_uuid = new URLSearchParams(location.search).get('uuid');
        setUUID(t_uuid);
        const response = await fetch(`/api/enterprise/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
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
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch('/api/enterprise/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
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
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
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
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  return (
    <>
      <Title />
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              企业
            </h3>
            <hr />

            <div className="row">
              <div className="col">
                <div className="card shadow">
                  <div className="card-header">
                    企业信息
                  </div>

                  <div className="card-body">
                    <InputRowField caption="名称" value={name || ''} onChange={(event) => setName(event.target.value)} />

                    <InputRowField
                      caption="营业执照"
                      value={yingyezhizhao || ''}
                      onChange={(event) => setYingyezhizhao(event.target.value)}
                    />

                    <InputRowField
                      caption="法人"
                      value={faren || ''}
                      onChange={(event) => setFaren(event.target.value)}
                    />

                    <InputRowField
                      caption="注册日期"
                      value={zhuceriqi || ''}
                      onChange={(event) => setZhuceriqi(event.target.value)}
                    />

                    <InputRowField
                      caption="注资规模"
                      value={zhuziguimo || ''}
                      onChange={(event) => setZhuziguimo(event.target.value)}
                    />

                    <InputRowField
                      caption="地址"
                      value={address1 || ''}
                      onChange={(event) => setAddress1(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address2 || ''}
                      onChange={(event) => setAddress2(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address3 || ''}
                      onChange={(event) => setAddress3(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address4 || ''}
                      onChange={(event) => setAddress4(event.target.value)}
                    />

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label text-right">员工数量</label>
                      <div className="col-sm-10">
                        <select
                          value={yuangongshuliang}
                          className="form-control input-borderless"
                          onChange={(event) => setYuangongshuliang(event.target.value)}
                        >
                          <option value="未选择">未选择</option>
                          {YUAN_GONG_SHU_LIANG.map((it) => (
                            <option key={YUAN_GONG_SHU_LIANG.indexOf(it)} value={it}>{it}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-muted text-center">
                      营业执照
                      <br />
                      <img src={yingyezhizhao_tu} className="img-fluid" alt={name} />
                    </p>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <BackwardButton />
                    </div>

                    <div className="btn-group pull-right">
                      {category === '编辑' && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={handleRemove}
                        >
                          <i className="fa fa-fw fa-trash-o" />
                          删除
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ display: 'none' }}
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-fw fa-save" />
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {category === '编辑' && (
                <div className="col-4">
                  <div className="card shadow">
                    <div className="card-header">
                      企业用户
                    </div>

                    <div className="card-body">
                      {
                        id && uuid && (
                          <EnterpriseUserList enterprise_id={id} enterprise_uuid={uuid} />
                        )
                      }
                    </div>

                    <div className="card-footer text-center" style={{ display: 'none' }}>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => { window.location = `#企业用户/新增?enterprise_id=${id}&enterprise_uuid=${uuid}`; }}
                        >
                          <i className="fa fa-fw fa-plus" />
                          添加用户
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow mt-3">
                    <div className="card-header">发布的职位</div>
                    <div className="card-body">
                      <RecruitmentDataList enterprise_id={id} enterprise_uuid={uuid} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UserDetail(props) {
  const { category } = props;
  const { id, user_id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setUsername(res.content.username);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/${id}/user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  return (
    <>
      <Title />
      <Navbar />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              企业用户
            </h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField caption="姓名" value={name || ''} onChange={(event) => setName(event.target.value)} />

                <InputRowField caption="用户名" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ display: 'none' }}
                    onClick={handleSubmit}
                  >
                    <i className="fa fa-fw fa-edit" />
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
