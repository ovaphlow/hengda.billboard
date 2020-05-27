import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Navbar from '../component/Navbar';
import Toolbar from './ComponentToolbar';

export default function Detail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (cat === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/content/topic/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setTag(res.content.tag);
        setTitle(res.content.title);
        setContent(res.content.content);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/content/topic/${id}?uuid=${uuid}`, {
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
    const data = {
      title,
      content,
      tag,
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    };

    if (cat === '新增') {
      const response = await window.fetch('/api/content/topic/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (cat === '编辑') {
      const response = await window.fetch(`/api/content/topic/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
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
      <Navbar category="热门话题" />

      <div className="container mt-3 mb-5">
        <h3>
          {cat}
          {' '}
          热门话题
        </h3>
        <hr />

        <Toolbar />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label>TAG</label>
                  <select
                    value={tag || ''}
                    className="form-control"
                    onChange={(event) => setTag(event.target.value)}
                  >
                    <option value="">未选择</option>
                    <option value="热门话题">小程序首页</option>
                    <option value="职业发展">职业发展</option>
                    <option value="面试问题">面试问题</option>
                    <option value="职业规划">职业规划</option>
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>标题</label>
                  <input type="text" value={title} className="form-control" onChange={(event) => setTitle(event.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>内容</label>
              <ReactQuill
                formats={[
                  'header', 'align', 'bold', 'italic',
                  'underline', 'blockquote', 'link', 'image']}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                    ['link', 'image'],
                  ],
                }}
                placeholder="请填写内容"
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary" onClick={() => window.history.go(-1)}>
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              {cat === '编辑' && (
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
      </div>
    </>
  );
}

Detail.propTypes = {
  cat: PropTypes.string.isRequired,
};
