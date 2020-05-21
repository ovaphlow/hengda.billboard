import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

import ReactQuill from 'react-quill';
import {
  Title, Navbar, BackwardButton, InputRowField,
} from '../../Components';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function Detail(props) {
  const { cat } = props;
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
    if (props.category === '新增') {
      const response = await window.fetch('/api/content/topic/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          tag,
          date: moment().format('YYYY-MM-DD'),
          time: moment().format('HH:mm:ss'),
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/topic/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          tag,
          date: moment().format('YYYY-MM-DD'),
          time: moment().format('HH:mm:ss'),
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="热门话题" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {cat}
              {' '}
              热门话题
            </h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField
                  caption="标题"
                  value={title || ''}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">tag</label>
                  <div className="col-sm-10">
                    <select
                      value={tag || ''}
                      className="form-control input-borderless"
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
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">内容</label>
                  <div className="col-sm-10">
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
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  {cat === '编辑' && (
                    <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
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
        </div>
      </div>
    </>
  );
}
