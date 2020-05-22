import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Title from '../../component/Title';
import Navbar from '../../component/Navbar';
import BackwardButton from '../../component/BackwardButton';
import InputRowField from '../../component/InputRowField';
import { BANNER_CATEGORY } from '../../constant';

import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function Detail(props) {
  const { cat } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [data_url, setDataUrl] = useState('');

  useEffect(() => {
    if (cat === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/content/banner/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setStatus(res.content.status);
        setCategory(res.content.category);
        setTitle(res.content.title);
        setComment(res.content.comment);
        setDataUrl(res.content.data_url);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertImg2Data = (event) => {
    if (!event.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setDataUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/content/banner/${id}?uuid=${uuid}`, {
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
    if (!title || !comment || !data_url) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (props.category === '新增') {
      const response = await window.fetch('/api/content/banner/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status,
          category,
          title,
          comment,
          datime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data_url,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/banner/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status,
          category,
          title,
          comment,
          datime: moment().format('YYYY-MM-DD HH:mm:ss'),
          data_url,
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
            <SideNav category="banner" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              BANNER
            </h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={convertImg2Data}
                  />
                  <label className="custom-file-label" htmlFor="customFile" data-browse="选择文件">
                    图片文件
                  </label>
                </div>
              </div>

              <div className="card-body">
                <InputRowField
                  caption="标题"
                  value={title || ''}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    内容
                  </label>
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
                      value={comment || ''}
                      onChange={setComment}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">类别</label>
                  <div className="col-sm-10">
                    <select
                      value={category || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {BANNER_CATEGORY.map((it) => (
                        <option key={BANNER_CATEGORY.indexOf(it)} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-2 text-right">状态</div>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="status"
                        checked={status === '启用'}
                        onChange={(event) => (event.target.checked ? setStatus('启用') : setStatus('未启用'))}
                      />
                      <label htmlFor="status" className="form-check-label">
                        启用
                      </label>
                    </div>
                  </div>
                </div>

                <hr />

                <p className="text-muted text-center">
                  预览
                  <br />
                  <img src={data_url} className="img-fluid" alt={title} />
                </p>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  {cat === '编辑' && (
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
                    onClick={handleSubmit}
                  >
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
