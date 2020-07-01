import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import { RECOMMEND_CATEGORY } from '../constant';
import { useAddressKeys, useAddressValues, useAddressLevel1ValueList } from '../useAddress';
import useAuth from '../useAuth';

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const { search } = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const address_keys = useAddressKeys();
  const address_values = useAddressValues();
  const address_level1_values = useAddressLevel1ValueList();

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [date1, setDate1] = useState(moment().format('YYYY-MM-DD'));
  const [date2, setDate2] = useState(moment().format('YYYY-MM-DD'));
  const [address_level1, setAddressLevel1] = useState('黑龙江省');
  const [address_level2, setAddressLevel2] = useState('哈尔滨市');
  const [publisher, setPublisher] = useState('');
  const [qty, setQty] = useState(1);
  const [baomingfangshi, setBaomingfangshi] = useState('');
  const [content, setContent] = useState('');

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

    if (component_option === '新增') {
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
    } else if (component_option === '编辑') {
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

  useEffect(() => {
    setArr1(address_level1_values);
  }, []);

  useEffect(() => {
    (async () => {
      if (component_option === '编辑') {
        const response = await window.fetch(`/api/content/recommend/${id}${search}`);
        const res = await response.json();
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
  }, []);

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

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="推荐信息" />
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
                  <span className="h1">推荐信息</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="recommend.html" className="text-reset text-decoration-none">
                          推荐信息
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
                    <div className="row">
                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">分类</label>
                          <select
                            value={category || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setCategory(event.target.value)}
                          >
                            <option value="">未选择</option>
                            { RECOMMEND_CATEGORY.map((it) => (
                              <option key={RECOMMEND_CATEGORY.indexOf(it)} value={it}>{it}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">标题</label>
                          <input
                            type="text"
                            value={title || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setTitle(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">发布日期</label>
                          <input
                            type="date"
                            value={date1 || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setDate1(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">截止日期</label>
                          <input
                            type="date"
                            value={date2 || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setDate2(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">地址</label>
                          <select
                            value={address_level1 || ''}
                            className="form-control input-underscore"
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
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <select
                            value={address_level2 || ''}
                            className="form-control input-underscore"
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
                        <div className="mb-3">
                          <label className="form-label">招聘单位</label>
                          <input
                            type="text"
                            value={publisher || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setPublisher(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">招聘人数</label>
                          <input
                            type="number"
                            value={qty || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setQty(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">报名方式</label>
                          <input
                            type="text"
                            value={baomingfangshi || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setBaomingfangshi(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">栏目内容</label>
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

                    <div className="btn-group float-right">
                      {component_option === '编辑' && (
                        <button type="button" className="btn btn-danger" onClick={handleRemove}>
                          删除
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
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
        <BottomNav />
      </footer>
    </div>
  );
}

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
