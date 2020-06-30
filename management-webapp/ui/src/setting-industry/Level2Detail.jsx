import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import Footer from '../component/Footer';
import IconChevronLeft from '../icon/ChevronLeft';

export default function Detail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [master_id, setMasterID] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (cat === '新增') {
      const t_master_id = new URLSearchParams(location.search).get('master_id');
      const response = await window.fetch(`/api/settings/industry/2nd/?master_id=${t_master_id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          master_id: id,
          name,
          comment,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (cat === '编辑') {
      const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${uuid}&master_id=${master_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          comment,
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
    const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${uuid}&master_id=${master_id}`, {
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
    if (cat === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      const t_master_id = new URLSearchParams(location.search).get('master_id');
      setMasterID(t_master_id);
      (async () => {
        const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${t_uuid}&master_id=${t_master_id}`);
        const res = await response.json();
        setName(res.content.name);
        setComment(res.content.comment);
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
                <LeftNav cat="系统设定：行业" />
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
                      <IconChevronLeft />
                      后退
                    </button>
                  </div>
                  <span className="h1">系统设定：行业</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="setting-industry.html" className="text-reset text-decoration-none">
                          系统设定：行业
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {cat}
                        二级行业
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100">
                  <div className="card-body">
                    <div className="form-group">
                      <label>名称</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>备注</label>
                      <input
                        type="text"
                        value={comment || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setComment(event.target.value)}
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
                      {cat === '编辑' && (
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
        <Footer />
      </footer>
    </div>
  );
}

Detail.propTypes = {
  cat: PropTypes.string.isRequired,
};
