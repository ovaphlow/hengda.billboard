import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Navbar from '../component/Navbar';

export default function Detail({ cat }) {
  const { recruitment_id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [date, setDate] = useState('');
  const [salary1, setSalary1] = useState('');
  const [salary2, setSalary2] = useState('');
  const [education, setEducation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    if (cat === '编辑') {
      const response = await window.fetch(`/api/recruitment/${recruitment_id}?recruitment_uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          qty,
          description,
          requirement,
          address1,
          address2,
          address3,
          date,
          salary1,
          salary2,
          education,
          category,
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
    const response = await window.fetch(`/api/recruitment/${recruitment_id}?recruitment_uuid=${uuid}`, {
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
      (async () => {
        const response = await window.fetch(`/api/recruitment/${recruitment_id}?uuid=${t_uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setQty(res.content.qty);
        setDescription(res.content.description);
        setRequirement(res.content.requirement);
        setAddress1(res.content.address1);
        setAddress2(res.content.address2);
        setAddress3(res.content.address3);
        setDate(res.content.date);
        setSalary1(res.content.salary1);
        setSalary2(res.content.salary2);
        setEducation(res.content.education);
        setCategory(res.content.category);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar category="企业" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="user.html#/企业用户" className="text-light">企业用户</a>
              </li>
              <li className="breadcrumb-item active">岗位</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="user.html#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>
            <a href="user.html#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>
            <a href="user.html#/普通用户" className="btn btn-sm btn-info">
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
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>职位</label>
                  <input
                    type="text"
                    value={name || ''}
                    className="form-control"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="form-group">
                  <label>人数</label>
                  <input
                    type="text"
                    value={qty || ''}
                    className="form-control"
                    onChange={(event) => setQty(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>地址</label>
                  <input
                    type="text"
                    value={address1 || ''}
                    className="form-control"
                    onChange={(event) => setAddress1(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <input
                    type="text"
                    value={address2 || ''}
                    className="form-control"
                    onChange={(event) => setAddress2(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <input
                    type="text"
                    value={address3 || ''}
                    className="form-control"
                    onChange={(event) => setAddress3(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>发布日期</label>
                  <input
                    type="text"
                    value={date || ''}
                    className="form-control"
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>薪资范围</label>
                  <input
                    type="text"
                    value={salary1 || ''}
                    className="form-control"
                    onChange={(event) => setSalary1(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <input
                    type="text"
                    value={salary2 || ''}
                    className="form-control"
                    onChange={(event) => setSalary2(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>学历</label>
                  <input
                    type="text"
                    value={education || ''}
                    className="form-control"
                    onChange={(event) => setEducation(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>类别</label>
                  <input
                    type="text"
                    value={category || ''}
                    className="form-control"
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>工作职责</label>
              <ReactQuill
                formats={[
                  'header', 'align', 'bold', 'italic',
                  'underline', 'blockquote']}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                  ],
                }}
                readOnly
                placeholder="请填写内容"
                value={description}
                onChange={setDescription}
              />
            </div>

            <div className="form-group">
              <label>岗位要求</label>
              <ReactQuill
                formats={[
                  'header', 'align', 'bold', 'italic',
                  'underline', 'blockquote']}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                  ],
                }}
                readOnly
                placeholder="请填写内容"
                value={requirement || ''}
                onChange={setRequirement}
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
                style={{ display: 'none' }}
                onClick={handleSubmit}
              >
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
