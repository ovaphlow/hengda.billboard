import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import Footer from '../component/Footer';

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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="热门话题" />
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
                  <span className="h1">热门话题</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="topic.html" className="text-reset text-decoration-none">
                          热门话题
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label>TAG</label>
                          <select
                            value={tag || ''}
                            className="form-control input-underscore"
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
                          <input type="text" value={title} className="form-control input-underscore" onChange={(event) => setTitle(event.target.value)} />
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
                          删除
                        </button>
                      )}

                      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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
