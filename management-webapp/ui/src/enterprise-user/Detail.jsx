import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import ComponentEnterpriseUserFavoriteList from '../favorite/ComponentEnterpriseUserFavoriteList';

export default function Detail({ component_option }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [enterprise_id, setEnterpriseID] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    if (component_option === '编辑') {
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
    if (component_option === '编辑') {
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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="企业用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">企业用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="enterprise-user" className="text-reset text-decoration-none">
                          企业用户
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
                    <div className="form-group">
                      <label>姓名</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    {component_option === '新增' && (
                    <div className="form-group">
                      <label>密码</label>
                      <input
                        type="text"
                        value={password || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    )}

                    <div className="form-group">
                      <label>电话</label>
                      <input
                        type="tel"
                        value={phone || ''}
                        className="form-control input-underscore"
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

                    <div className="btn-group float-right">
                      {component_option === '编辑' && (
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

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">
                    <span className="lead">收藏</span>
                  </div>

                  <div className="card-body">
                    <ComponentEnterpriseUserFavoriteList user_id={id} />
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
