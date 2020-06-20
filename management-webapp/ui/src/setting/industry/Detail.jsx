import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../../component/Navbar';

export default function Detail({ category }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/settings/industry/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setComment(res.content.comment);
      })();
      (async () => {
        const response = await window.fetch(`/api/settings/industry/2nd?id=${id}`);
        const res = await response.json();
        setList(res.content || []);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (category === '新增') {
      const response = await window.fetch('/api/settings/industry/', {
        method: 'POST',
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
    } else if (category === '编辑') {
      const response = await window.fetch(`/api/settings/industry/${id}?uuid=${uuid}`, {
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
    const response = await window.fetch(`/api/settings/industry/${id}?uuid=${uuid}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  return (
    <>
      <Navbar category="系统设置" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="#/行业" className="text-light">行业</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{category}</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/通知公告" className="btn btn-sm btn-info">
              通知/公告
            </a>

            <a href="#/行业" className="btn btn-sm btn-success">
              行业
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
              <label>名称</label>
              <input
                type="text"
                value={name || ''}
                className="form-control"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>备注</label>
              <input
                type="text"
                value={comment || ''}
                className="form-control"
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
              {category === '编辑' && (
              <button type="button" className="btn btn-danger" onClick={handleRemove}>
                <i className="fa fa-fw fa-trash-o" />
                删除
              </button>
              )}
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                <i className="fa fa-fw fa-save" />
                保存
              </button>
            </div>
          </div>
        </div>

        {category === '编辑' && (
          <div className="card bg-dark shadow mt-3">
            <div className="card-header">
              二级分类
              <span className="pull-right">
                <a href={`#/二级行业/新增?master_id=${id}&uuid=${uuid}`}>
                  <i className="fa fa-fw fa-plus" />
                  新增
                </a>
              </span>
            </div>

            <div className="card-body">
              <ul className="list-inline">
                {list.map((it) => (
                  <li className="list-inline-item" key={it.id}>
                    <a href={`#/二级行业/${it.id}?uuid=${it.uuid}&master_id=${it.master_id}`}>
                      <i className="fa fa-fw fa-tag" />
                      {it.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
