import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';

import Navbar from '../component/Navbar';
import Toolbar from './ComponentToolbar';

export default function Detail({ cat }) {
  const { id } = useParams();
  const { search } = useLocation();
  const [address_keys, setAddressKeys] = useState([]);
  const [address_values, setAddressValues] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [date1, setDate1] = useState(moment().format('YYYY-MM-DD'));
  const [date2, setDate2] = useState(moment().format('YYYY-MM-DD'));
  const [address_level1, setAddressLevel1] = useState('');
  const [address_level2, setAddressLevel2] = useState('');
  const [publisher, setPublisher] = useState('');
  const [qty, setQty] = useState(1);
  const [baomingfangshi, setBaomingfangshi] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      let response = await window.fetch('/lib/address.json');
      let res = await response.json();
      const keys = Object.keys(res);
      setAddressKeys(keys);
      const values = Object.values(res);
      setAddressValues(values);
      const arr = [];
      keys.forEach((e, index) => {
        if (e.slice(-4) === '0000') {
          arr.push(values[index]);
        }
      });
      setArr1(arr);
      if (cat === '编辑') {
        response = await window.fetch(`/api/content/recommend/${id}${search}`);
        res = await response.json();
        setCategory(res.content.category);
        setTitle(res.content.title);
        setDate1(res.content.date1);
        setDate2(res.content.date2);
        setAddressLevel1(res.content.address_level1);
        setAddressLevel2(res.content.address_level2);
        setPublisher(res.content.publisher);
        setQty(res.content.qty);
        setBaomingfangshi(res.content.baomignfangshi);
        setContent(res.content.content);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, cat]);

  useEffect(() => {
    const arr = [];
    setArr2(arr);
    for (let i = 0; i < address_values.length; i += 1) {
      if (address_values[i] === address_level1) {
        const code = address_keys[i];
        for (let j = 0; j < address_keys.length; j += 1) {
          if (address_keys[j].slice(0, 2) === code.slice(0, 2) && address_keys[j].slice(-2) === '00') {
            if (address_keys[j].slice(-4) !== '0000') arr.push(address_values[j]);
          }
        }
        return;
      }
    }
    setArr2(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level1]);

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/content/recommend/${id}${search}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSave = async () => {
    const data = {
      category,
      title,
      date1,
      date2,
      address_level1,
      address_level2,
      qty,
      publisher,
      baomingfangshi,
      content,
    };

    if (cat === '新增') {
      const response = await window.fetch('/api/content/recommend/', {
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
    } else {
      const response = await window.fetch(`/api/content/recommend/${id}${search}`, {
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
      <Navbar category="推荐信息" />

      <div className="container mt-3 mb-5">
        <h3>
          {cat}
          {' '}
          推荐信息
        </h3>
        <hr />

        <Toolbar />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label>分类</label>
                  <select
                    value={category || ''}
                    className="form-control"
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="">未选择</option>
                    <option>国企</option>
                    <option>公务员</option>
                    <option>事业单位</option>
                    <option>教师</option>
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>标题</label>
                  <input
                    type="text"
                    value={title || ''}
                    className="form-control"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>发布日期</label>
                  <input
                    type="date"
                    value={date1 || ''}
                    className="form-control"
                    onChange={(event) => setDate1(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>截止日期</label>
                  <input
                    type="date"
                    value={date2 || ''}
                    className="form-control"
                    onChange={(event) => setDate2(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label>所属省份</label>
                  <select
                    value={address_level1 || ''}
                    className="form-control"
                    onChange={(event) => setAddressLevel1(event.target.value)}
                  >
                    <option value="">未选择</option>
                    {arr1.map((it) => (
                      <option key={arr1.indexOf(it)} value={it}>{it}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>城市</label>
                  <select
                    value={address_level2 || ''}
                    className="form-control"
                    onChange={(event) => setAddressLevel2(event.target.value)}
                  >
                    <option value="">未选择</option>
                    {arr2.map((it) => (
                      <option key={arr2.indexOf(it)} value={it}>{it}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>招聘单位</label>
                  <input
                    type="text"
                    value={publisher || ''}
                    className="form-control"
                    onChange={(event) => setPublisher(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="form-group">
                  <label>招聘人数</label>
                  <input
                    type="number"
                    value={qty || ''}
                    className="form-control"
                    onChange={(event) => setQty(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="form-group">
                  <label>报名方式</label>
                  <input
                    type="text"
                    value={baomingfangshi || ''}
                    className="form-control"
                    onChange={(event) => setBaomingfangshi(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>栏目内容</label>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }], [{ align: [] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                  ],
                }}
                formats={[
                  'header', 'align', 'bold', 'italic',
                  'underline', 'blockquote',
                ]}
                placeholder="请填写内容"
                value={content || ''}
                onChange={setContent}
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
                <button type="button" className="btn btn-danger" onClick={handleRemove}>
                  <i className="fa fa-fw fa-trash-o" />
                  删除
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
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
