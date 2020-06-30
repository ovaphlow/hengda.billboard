import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../../component/Navbar';
import ComponentEnterpriseUserFavoriteList from '../../favorite/ComponentEnterpriseUserFavoriteList';

export default function Detail({ category }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [enterprise_id, setEnterpriseID] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    if (category === '编辑') {
      const response = await window.fetch(`/api/enterprise-user/${id}?uuid=${uuid}&enterprise_id=${enterprise_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
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

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/enterprise-user/${id}?uuid=${uuid}&enterprise_id=${enterprise_id}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  useEffect(() => {
    const t_master_id = new URLSearchParams(location.search).get('enterprise_id');
    setEnterpriseID(t_master_id);
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await fetch(`/api/enterprise-user/${id}?uuid=${t_uuid}&enterprise_id=${t_master_id}`);
        const res = await response.json();
        setName(res.content.name);
        setPhone(res.content.phone);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar category="用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="#/企业用户" className="text-light">企业用户</a>
              </li>
              <li className="breadcrumb-item active">{category}</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>

            <a href="#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>

            <a href="#/普通用户" className="btn btn-sm btn-info">
              普通用户
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
            <div className="card bg-dark shadow">
              <div className="card-body">
                <div className="form-group">
                  <label>姓名</label>
                  <input
                    type="text"
                    value={name || ''}
                    className="form-control"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                {category === '新增' && (
                  <div className="form-group">
                    <label>密码</label>
                    <input
                      type="text"
                      value={password || ''}
                      className="form-control"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>电话</label>
                  <input
                    type="tel"
                    value={phone || ''}
                    className="form-control"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                    返回
                  </button>
                </div>

                <div className="btn-group pull-right">
                  {category === '编辑' && (
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
                    style={{ display: 'none' }}
                    onClick={handleSubmit}
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-dark shadow mt-4">
              <div className="card-header">
                <span className="lead">收藏</span>
              </div>

              <div className="card-body">
                <ComponentEnterpriseUserFavoriteList user_id={id} />
              </div>
            </div>
          </div>
    </>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
